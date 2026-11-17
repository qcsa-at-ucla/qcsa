import { readdirSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";

const SPONSORS_DIR = path.join(process.cwd(), "public", "images", "qecml", "sponsors");
const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".svg", ".gif", ".avif"]);

type Sponsor = { name: string; src: string };

// Every image dropped into public/images/qecml/sponsors is shown in the banner.
// The filename (minus extension) is used as the sponsor name, e.g. oratomic.jpg -> "Oratomic".
function getSponsors(): Sponsor[] {
  let files: string[] = [];
  try {
    files = readdirSync(SPONSORS_DIR);
  } catch {
    return [];
  }

  return files
    .filter((file) => IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()))
    .sort((a, b) => a.localeCompare(b))
    .map((file) => {
      const base = path.parse(file).name;
      const name = base
        .split(/[-_\s]+/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      return { name, src: `/images/qecml/sponsors/${encodeURIComponent(file)}` };
    });
}

// Crops transparent/white padding off a logo so every logo's artwork fills its box equally.
// Falls back to the original file if sharp is unavailable or the image can't be processed (e.g. SVG).
async function trimmedSrc(sponsor: Sponsor): Promise<string> {
  try {
    const { default: sharp } = await import("sharp");
    const file = path.join(SPONSORS_DIR, decodeURIComponent(path.basename(sponsor.src)));
    const buf = await sharp(await readFile(file)).trim({ threshold: 20 }).png().toBuffer();
    return `data:image/png;base64,${buf.toString("base64")}`;
  } catch {
    return sponsor.src;
  }
}

export default async function SponsorBanner() {
  const sponsors = await Promise.all(
    getSponsors().map(async (s) => ({ ...s, display: await trimmedSrc(s) })),
  );

  if (sponsors.length === 0) {
    return (
      <p className="mt-8 text-sm font-semibold uppercase tracking-[0.12em] text-neutral-600">
        Sponsors to be announced
      </p>
    );
  }

  return (
    <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-8 rounded-lg border border-neutral-200 bg-white px-6 py-8 sm:px-10">
      {sponsors.map((sponsor) => (
        <li key={sponsor.src} className="flex h-16 w-40 items-center justify-center sm:h-20 sm:w-52">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={sponsor.display}
            alt={`${sponsor.name} logo`}
            className="max-h-full max-w-full object-contain"
          />
        </li>
      ))}
    </ul>
  );
}
