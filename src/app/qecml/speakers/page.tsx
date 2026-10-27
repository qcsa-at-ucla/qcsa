import type { Metadata } from "next";
import Link from "next/link";
import MemberCard from "../team/member-card";
import { speakers } from "./speakers";

export const metadata: Metadata = {
  title: "Speakers | QECML 2027",
};

export default function QECMLSpeakersPage() {
  return (
    <main className="flex min-h-screen flex-col bg-neutral-50 text-neutral-900">
      <header className="flex items-center justify-between bg-[#990000] py-6 pl-20 pr-6 text-white sm:pl-24 sm:pr-10 lg:pl-28 lg:pr-16">
        <Link
          href="/qecml"
          className="text-sm font-bold uppercase tracking-[0.18em] text-white/85 transition hover:text-[#FFCC00]"
        >
          ← Overview
        </Link>
        <span className="text-sm font-bold uppercase tracking-[0.18em] text-[#FFCC00]">
          USC · 2027
        </span>
      </header>

      <section className="flex-1 px-5 pb-16 pt-10 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-[#990000]">
            QECML 2027 · USC
          </p>
          <h1 className="text-5xl font-bold tracking-tight text-neutral-900 sm:text-7xl">Speakers</h1>
          <div className="my-8 h-1 w-20 bg-[#FFCC00]" />
          {speakers.length === 0 ? (
            <p className="text-lg leading-7 text-neutral-700">
              Details for speakers will be announced soon.
            </p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {speakers.map((speaker) => (
                <MemberCard key={speaker.id} member={speaker} />
              ))}
            </div>
          )}
        </div>
      </section>

      <footer className="bg-neutral-900 px-6 py-6 text-center text-sm font-bold uppercase tracking-[0.18em] text-white">
        QECML · March 2027 · USC
      </footer>
    </main>
  );
}
