import type { Metadata } from "next";
import Link from "next/link";
import { readdirSync } from "node:fs";
import path from "node:path";

export const metadata: Metadata = {
  title: "Sponsors | QECML 2027",
};

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

export default function QECMLSponsorsPage() {
  const sponsors = getSponsors();

  return (
    <main className="min-h-screen bg-neutral-50 px-5 pb-16 pt-24 text-neutral-900 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-[#990000]">
          QECML 2027 · USC
        </p>
        <h1 className="text-5xl font-bold tracking-tight text-neutral-900 sm:text-7xl">Sponsors</h1>
        <div className="mt-8 h-1 w-20 bg-[#FFCC00]" />

        <section
          aria-labelledby="our-sponsors"
          className="mt-12 rounded-xl border border-neutral-200 border-l-4 border-l-[#990000] bg-white p-6 shadow-sm sm:p-8"
        >
          <h2 id="our-sponsors" className="text-2xl font-bold text-[#990000] sm:text-3xl">
            Our Sponsors
          </h2>
          <p className="mt-4 leading-7 text-neutral-700">
            QECML 2027 is made possible by the generous support of our sponsors.
          </p>

          {sponsors.length === 0 ? (
            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.12em] text-neutral-600">
              Sponsors to be announced
            </p>
          ) : (
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
          )}
        </section>

        <Link
          href="/qecml"
          className="mt-10 inline-block text-sm font-bold uppercase tracking-[0.18em] text-[#990000] transition hover:text-[#790000]"
        >
          ← Overview
        </Link>
      </div>
    </main>
  );
}
