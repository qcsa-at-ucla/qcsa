import type { Metadata } from "next";
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
    <main className="flex min-h-screen flex-col bg-neutral-50 text-neutral-900">
      <section className="flex flex-1 flex-col items-center justify-center px-6 pb-20 pt-24 text-center">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-[#990000]">
          QECML 2027 · USC
        </p>
        <h1 className="text-5xl font-bold tracking-tight text-neutral-900 sm:text-7xl">{page.label}</h1>
        <div className="my-8 h-1 w-20 bg-[#FFCC00]" />
        <p className="max-w-xl text-lg leading-7 text-neutral-700">
          Details for {page.label.toLowerCase()} will be announced soon.
        </p>
      </section>

      <footer className="bg-neutral-900 px-6 py-6 text-center text-sm font-bold uppercase tracking-[0.18em] text-white">
        QECML · March 2027 · USC
      </footer>
    </main>
  );
}
