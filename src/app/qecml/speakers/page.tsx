import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Speakers | QECML 2027",
};

const speakers = [
  { id: "speaker-1", invited: true },
  { id: "speaker-2", invited: false },
  { id: "speaker-3", invited: false },
  { id: "speaker-4", invited: false },
  { id: "speaker-5", invited: false },
  { id: "speaker-6", invited: false },
];

export default function QECMLSpeakersPage() {
  return (
    <main className="min-h-screen bg-[#990000] px-5 pb-16 pt-24 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-[#FFCC00]">
          QECML 2027 · USC
        </p>
        <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl">Speakers</h1>
        <p className="mt-4 max-w-2xl text-lg leading-7 text-white/75">
          Speaker announcements are coming soon.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {speakers.map((speaker) => (
            <article
              key={speaker.id}
              className={`relative min-h-72 rounded-xl border p-6 sm:p-7 ${
                speaker.invited
                  ? "border-[#FFCC00]/70 bg-[#700000] shadow-lg shadow-black/15"
                  : "border-white/15 bg-[#700000]/55"
              }`}
            >
              <div
                aria-hidden="true"
                className={`mb-3 flex h-20 w-20 items-center justify-center rounded-full border text-3xl font-bold ${
                  speaker.invited
                    ? "border-[#FFCC00]/60 bg-[#FFCC00]/10 text-[#FFCC00]"
                    : "border-white/20 bg-white/5 text-white/60"
                }`}
              >
                ?
              </div>

              {speaker.invited && (
                <span className="mb-4 inline-flex rounded-full border border-[#FFCC00]/60 bg-[#FFCC00]/10 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[#FFCC00]">
                  Invited speaker
                </span>
              )}

              <h2 className="text-xl font-bold text-white">Speaker TBD</h2>
              <p className="mt-2 text-sm text-white/65">Affiliation to be announced</p>
              <p className="mt-5 text-sm leading-6 text-white/75">Speaker information coming soon.</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
