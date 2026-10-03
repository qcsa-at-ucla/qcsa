import { google } from "googleapis";
import type { docs_v1 } from "googleapis";

export const runtime = "nodejs";

const documentId =
  process.env.QECML_WHITEPAPER_DOCUMENT_ID ||
  "1w2WMvAz53XCLALmFROcj5AVZRkHnKbz0N1gU1az4sWE";

type FormattedRun = {
  text?: string;
  imageUrl?: string;
  altText?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  url?: string;
};

type WhitepaperBlock =
  | { type: "paragraph"; style: string; isListItem: boolean; runs: FormattedRun[] }
  | { type: "table"; rows: FormattedRun[][][] };

type InlineObjects = NonNullable<docs_v1.Schema$Document["inlineObjects"]>;

function formatRuns(
  elements: docs_v1.Schema$ParagraphElement[] = [],
  inlineObjects: InlineObjects = {},
): FormattedRun[] {
  return elements.flatMap<FormattedRun>((element) => {
    const textRun = element.textRun;
    if (textRun?.content) {
      const style = textRun.textStyle;
      return [
        {
          text: textRun.content,
          bold: style?.bold ?? undefined,
          italic: style?.italic ?? undefined,
          underline: style?.underline ?? undefined,
          url: style?.link?.url ?? undefined,
        },
      ];
    }

    const objectId = element.inlineObjectElement?.inlineObjectId;
    const embeddedObject = objectId
      ? inlineObjects[objectId]?.inlineObjectProperties?.embeddedObject
      : undefined;
    const imageUrl = embeddedObject?.imageProperties?.contentUri;

    return imageUrl
      ? [{ imageUrl, altText: embeddedObject.description || embeddedObject.title || "Whitepaper image" }]
      : [];
  });
}

function formatBlocks(
  elements: docs_v1.Schema$StructuralElement[] = [],
  inlineObjects: InlineObjects = {},
): WhitepaperBlock[] {
  return elements.flatMap((element): WhitepaperBlock[] => {
    if (element.paragraph) {
      return [
        {
          type: "paragraph",
          style: element.paragraph.paragraphStyle?.namedStyleType ?? "NORMAL_TEXT",
          isListItem: Boolean(element.paragraph.bullet),
          runs: formatRuns(element.paragraph.elements ?? [], inlineObjects),
        },
      ];
    }

    if (element.table) {
      return [
        {
          type: "table",
          rows: (element.table.tableRows ?? []).map((row) =>
            (row.tableCells ?? []).map((cell) =>
              (cell.content ?? []).flatMap((cellElement) =>
                formatRuns(cellElement.paragraph?.elements ?? [], inlineObjects),
              ),
            ),
          ),
        },
      ];
    }

    return [];
  });
}

export async function GET() {
  const email = process.env.QECML_GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.QECML_GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!email || !privateKey) {
    return Response.json(
      { error: "The QECML Whitepaper is not configured yet." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: { client_email: email, private_key: privateKey },
      scopes: ["https://www.googleapis.com/auth/documents.readonly"],
    });
    const docs = google.docs({ version: "v1", auth });
    const result = await docs.documents.get({ documentId });

    return Response.json(
      {
        blocks: formatBlocks(result.data.body?.content ?? [], result.data.inlineObjects ?? {}),
        updatedAt: new Date().toISOString(),
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("Failed to fetch QECML Whitepaper from Google Docs.", error);
    return Response.json(
      { error: "The Whitepaper could not be loaded right now." },
      { status: 502, headers: { "Cache-Control": "no-store" } },
    );
  }
}
