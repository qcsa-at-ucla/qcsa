import { google } from "googleapis";

export const runtime = "nodejs";

const spreadsheetId = process.env.QECML_SCHEDULE_SPREADSHEET_ID;
const range = process.env.QECML_SCHEDULE_RANGE || "v1!A:D";

export async function GET() {
  const email = process.env.QECML_GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.QECML_GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!spreadsheetId || !email || !privateKey) {
    return Response.json(
      { error: "The QECML schedule is not configured yet." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: { client_email: email, private_key: privateKey },
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });
    const sheets = google.sheets({ version: "v4", auth });
    const result = await sheets.spreadsheets.get({
      spreadsheetId,
      ranges: [range],
      includeGridData: true,
      fields:
        "sheets(properties(title),merges,data(startRow,startColumn,rowData(values(formattedValue))))",
    });

    const requestedSheetName = range
      .split("!")[0]
      ?.replace(/^'|'$/g, "")
      .replace(/''/g, "'");
    const sheet =
      result.data.sheets?.find((item) => item.properties?.title === requestedSheetName) ??
      result.data.sheets?.[0];
    const grid = sheet?.data?.[0];
    const startRow = grid?.startRow ?? 0;
    const rows = (grid?.rowData ?? []).map((row) =>
      (row.values ?? []).map((cell) => cell.formattedValue ?? ""),
    );
    const merges = (sheet?.merges ?? []).map((merge) => ({
      startRow: merge.startRowIndex ?? 0,
      endRow: merge.endRowIndex ?? 0,
      startColumn: merge.startColumnIndex ?? 0,
      endColumn: merge.endColumnIndex ?? 0,
    }));

    // Keep internal blank rows because they determine the height of merged event blocks,
    // while dropping unused rows at the bottom of the sheet.
    const lastRowExclusive = Math.max(
      rows.reduce(
        (last, row, index) =>
          row.some((cell) => cell.trim()) ? Math.max(last, startRow + index + 1) : last,
        startRow,
      ),
      merges
        .filter((merge) => merge.startColumn < 4 && merge.endColumn > 1)
        .reduce((last, merge) => Math.max(last, merge.endRow), startRow),
    );

    return Response.json(
      {
        rows: rows.slice(0, Math.max(0, lastRowExclusive - startRow)),
        startRow,
        merges,
        updatedAt: new Date().toISOString(),
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("Failed to fetch QECML schedule from Google Sheets.", error);
    return Response.json(
      { error: "The schedule could not be loaded right now." },
      { status: 502, headers: { "Cache-Control": "no-store" } },
    );
  }
}
