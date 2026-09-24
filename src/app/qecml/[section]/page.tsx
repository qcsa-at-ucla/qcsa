import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { qecmlNavigation } from "../qecml-navigation";

type SectionPageProps = {
  params: Promise<{ section: string }>;
};

export async function generateMetadata({ params }: SectionPageProps): Promise<Metadata> {
  const { section } = await params;
  const page = qecmlNavigation.find((item) => item.slug === section);

  return { title: page ? `${page.label} | QECML 2027` : "QECML 2027 | USC" };
}

export default async function QECMLSectionPage({ params }: SectionPageProps) {
  const { section } = await params;
  const page = qecmlNavigation.find((item) => item.slug === section);

  if (!page || page.slug === "overview") notFound();

  return (
    <main className="flex min-h-screen flex-col bg-[#990000] text-white">
      <header className="flex items-center justify-between py-6 pl-20 pr-6 sm:pl-24 sm:pr-10 lg:pl-28 lg:pr-16">
        <Link
          href="/qecml"
          className="text-sm font-bold uppercase tracking-[0.18em] text-white/85 transition hover:text-[#FFCC00]"
        >
          ← QECML Overview
        </Link>
        <span className="text-sm font-bold uppercase tracking-[0.18em] text-[#FFCC00]">
          USC · 2027
        </span>
      </header>

      <section className="flex flex-1 flex-col items-center justify-center px-6 pb-20 text-center">
        <p className="mb-5 text-sm font-bold uppercase tracking-[0.3em] text-[#FFCC00]">
          Quantum Error Correction × Machine Learning
        </p>
        <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl">{page.label}</h1>
        <div className="my-8 h-1 w-20 bg-[#FFCC00]" />
        <p className="max-w-xl text-lg leading-7 text-white/75">
          Details for {page.label.toLowerCase()} will be announced soon.
        </p>
      </section>

      <footer className="px-6 py-6 text-center text-sm font-bold uppercase tracking-[0.18em] text-[#FFCC00]">
        QECML · March 2027 · USC
      </footer>
    </main>
  );
}
