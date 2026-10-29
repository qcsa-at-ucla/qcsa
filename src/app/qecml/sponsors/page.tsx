import type { Metadata } from "next";
import Link from "next/link";
import SponsorBanner from "./sponsor-banner";

export const metadata: Metadata = {
  title: "Sponsors | QECML 2027",
};

export default function QECMLSponsorsPage() {
  return (
    <main className="min-h-screen bg-neutral-50 px-5 pb-16 pt-24 text-neutral-900 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-[#990000]">
          QECML 2027 · USC
        </p>
        <h1 className="text-5xl font-bold tracking-tight text-neutral-900 sm:text-7xl">Sponsors</h1>
        <div className="mt-8 h-1 w-20 bg-[#FFCC00]" />

        <section
          aria-label="Our Sponsors"
          className="mt-12 rounded-xl border border-neutral-200 border-l-4 border-l-[#990000] bg-white p-6 shadow-sm sm:p-8"
        >
          <p className="leading-7 text-neutral-700">
            QECML 2027 is made possible by the generous support of our sponsors.
          </p>

          <SponsorBanner />
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
