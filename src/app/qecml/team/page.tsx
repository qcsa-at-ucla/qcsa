import type { Metadata } from "next";
import Link from "next/link";
import {
  organizingCommittee,
  scientificCommittee,
} from "./committee-members";
import MemberCard from "./member-card";

export const metadata: Metadata = {
  title: "Team | QECML 2027",
};

const committees = [
  {
    title: "Scientific Committee",
    description: "The researchers advising the QECML 2027 scientific programme.",
    members: scientificCommittee,
    imageFolder: "scientific-committee",
  },
  {
    title: "Organizing Committee",
    description: "The people organizing QECML 2027.",
    members: organizingCommittee,
    imageFolder: "organizing-committee",
  },
];

export default function QECMLTeamPage() {
  return (
    <main className="min-h-screen bg-neutral-50 px-5 pb-16 pt-24 text-neutral-900 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-[#990000]">
          QECML 2027 · USC
        </p>
        <h1 className="text-5xl font-bold tracking-tight text-neutral-900 sm:text-7xl">Team</h1>

        <div className="mt-12 space-y-10">
          {committees.map((committee) => (
            <section
              key={committee.title}
              aria-labelledby={committee.title.toLowerCase().replaceAll(" ", "-")}
              className="rounded-xl border border-neutral-200 border-l-4 border-l-[#990000] bg-white p-6 shadow-sm sm:p-8"
            >
              <h2
                id={committee.title.toLowerCase().replaceAll(" ", "-")}
                className="text-2xl font-bold text-[#990000] sm:text-3xl"
              >
                {committee.title}
              </h2>
              <p className="mt-4 leading-7 text-neutral-700">{committee.description}</p>
              {committee.members.length === 0 ? (
                <p className="mt-8 text-sm font-semibold uppercase tracking-[0.12em] text-neutral-600">
                  Members to be announced
                </p>
              ) : (
                <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {committee.members.map((member) => (
                    <MemberCard key={member.id} member={member} />
                  ))}
                </div>
              )}
              <p className="mt-6 text-xs text-neutral-500">
                Headshots go in <code>public/images/qecml/{committee.imageFolder}/</code>.
              </p>
            </section>
          ))}
        </div>

        <Link
          href="/qecml"
          className="mt-10 inline-block text-sm font-bold uppercase tracking-[0.18em] text-[#990000] transition hover:text-[#790000]"
        >
          ← QECML Overview
        </Link>
      </div>
    </main>
  );
}
