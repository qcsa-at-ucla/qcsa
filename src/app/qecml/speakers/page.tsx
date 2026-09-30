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
    <main className="min-h-screen bg-neutral-50 px-5 pb-16 pt-24 text-neutral-900 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-[#990000]">
          QECML 2027 · USC
        </p>
        <h1 className="text-5xl font-bold tracking-tight text-neutral-900 sm:text-7xl">Speakers</h1>
        <p className="mt-4 max-w-2xl text-lg leading-7 text-neutral-700">
          Speaker announcements are coming soon.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {speakers.map((speaker) => (
            <article
              key={speaker.id}
              className={`relative min-h-72 rounded-xl border p-6 sm:p-7 ${
                speaker.invited
                  ? "border-[#FFCC00] border-t-4 bg-white shadow-md"
                  : "border-neutral-200 border-t-4 border-t-[#990000] bg-white shadow-sm"
              }`}
            >
              <div
                aria-hidden="true"
                className={`mb-3 flex h-20 w-20 items-center justify-center rounded-full border text-3xl font-bold ${
                  speaker.invited
                    ? "border-[#FFCC00] bg-[#FFCC00] text-[#720000]"
                    : "border-neutral-300 bg-neutral-100 text-neutral-500"
                }`}
              >
                ?
              </div>

              {speaker.invited && (
                <span className="mb-4 inline-flex rounded-full border border-[#FFCC00] bg-[#FFCC00] px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[#720000]">
                  Invited speaker
                </span>
              )}

              <h2 className="text-xl font-bold text-neutral-900">Speaker TBD</h2>
              <p className="mt-2 text-sm text-neutral-600">Affiliation to be announced</p>
              <p className="mt-5 text-sm leading-6 text-neutral-700">Speaker information coming soon.</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
