import type { Metadata } from "next";
import Link from "next/link";
import {
  organizingCommittee,
  scientificCommittee,
  type CommitteeMember,
} from "./committee-members";

export const metadata: Metadata = {
  title: "Team | QECML 2027",
};

const committees = [
  {
    title: "Organizing Committee",
    description: "The people organizing QECML 2027.",
    members: organizingCommittee,
    imageFolder: "organizing-committee",
  },
  {
    title: "Scientific Committee",
    description: "The researchers advising the QECML 2027 scientific programme.",
    members: scientificCommittee,
    imageFolder: "scientific-committee",
  },
];

function MemberCard({ member }: { member: CommitteeMember }) {
  return (
    <article className="overflow-hidden rounded-xl border border-white/15 bg-[#990000]/60">
      {member.headshot ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={member.headshot}
          alt={`Portrait of ${member.name}`}
          className="aspect-[4/3] w-full object-cover"
        />
      ) : (
        <div
          aria-hidden="true"
          className="flex aspect-[4/3] items-center justify-center bg-white/5 text-5xl font-bold text-white/55"
        >
          {member.name.slice(0, 1)}
        </div>
      )}
      <div className="p-5">
        <h3 className="text-xl font-bold text-white">{member.name}</h3>
        {(member.role || member.affiliation) && (
          <p className="mt-1 text-sm text-white/70">
            {[member.role, member.affiliation].filter(Boolean).join(" · ")}
          </p>
        )}
        <p className="mt-4 leading-7 text-white/85">{member.bio}</p>
      </div>
    </article>
  );
}

export default function QECMLTeamPage() {
  return (
    <main className="min-h-screen bg-[#990000] px-5 pb-16 pt-24 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-[#FFCC00]">
          QECML 2027 · USC
        </p>
        <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl">Team</h1>

        <div className="mt-12 space-y-10">
          {committees.map((committee) => (
            <section
              key={committee.title}
              aria-labelledby={committee.title.toLowerCase().replaceAll(" ", "-")}
              className="rounded-xl border border-white/15 bg-[#700000]/60 p-6 sm:p-8"
            >
              <h2
                id={committee.title.toLowerCase().replaceAll(" ", "-")}
                className="text-2xl font-bold text-[#FFCC00] sm:text-3xl"
              >
                {committee.title}
              </h2>
              <p className="mt-4 leading-7 text-white/75">{committee.description}</p>
              {committee.members.length === 0 ? (
                <p className="mt-8 text-sm font-semibold uppercase tracking-[0.12em] text-white/55">
                  Members to be announced
                </p>
              ) : (
                <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {committee.members.map((member) => (
                    <MemberCard key={member.id} member={member} />
                  ))}
                </div>
              )}
              <p className="mt-6 text-xs text-white/50">
                Headshots go in <code>public/images/qecml/{committee.imageFolder}/</code>.
              </p>
            </section>
          ))}
        </div>

        <Link
          href="/qecml"
          className="mt-10 inline-block text-sm font-bold uppercase tracking-[0.18em] text-white/80 transition hover:text-[#FFCC00]"
        >
          ← QECML Overview
        </Link>
      </div>
    </main>
  );
}
