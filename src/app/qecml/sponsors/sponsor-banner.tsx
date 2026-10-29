import { readdirSync } from "node:fs";
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

export default function SponsorBanner() {
  const sponsors = getSponsors();

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
        <li key={sponsor.src} className="flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={sponsor.src}
            alt={`${sponsor.name} logo`}
            className="h-16 w-auto max-w-full object-contain sm:h-20"
          />
        </li>
      ))}
    </ul>
  );
}
