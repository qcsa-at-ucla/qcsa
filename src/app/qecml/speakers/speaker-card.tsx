import type { Speaker } from "./speakers";

export default function SpeakerCard({ speaker }: { speaker: Speaker }) {
  const hasBio = Boolean(speaker.bio?.trim());

  const bioOverlay = hasBio && (
    <div className="committee-bio-scroll pointer-events-none absolute inset-0 overflow-y-auto overscroll-contain bg-neutral-950/95 p-5 text-base font-normal opacity-0 transition-opacity duration-200 group-hover/photo:pointer-events-auto group-hover/photo:opacity-100 motion-reduce:transition-none">
      <p className="leading-7 text-white">{speaker.bio}</p>
    </div>
  );

  const details = (
    <>
      <h3 className={`text-xl font-bold text-neutral-900 ${speaker.hyperlink ? "hover:underline" : ""}`}>
        {speaker.name}
      </h3>
      {(speaker.role || speaker.affiliation) && (
        <p className="mt-1 text-sm text-neutral-600">
          {[speaker.role, speaker.affiliation].filter(Boolean).join(" · ")}
        </p>
      )}
    </>
  );

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
      {speaker.headshot ? (
        <div className="group/photo relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={speaker.headshot}
            alt={`Portrait of ${speaker.name}`}
            className="h-full w-full object-cover"
            style={{ objectPosition: `center ${speaker.headshotPositionY ?? 0}%` }}
          />
          {bioOverlay}
        </div>
      ) : (
        <div
          aria-hidden="true"
          className="group/photo relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-neutral-100 text-5xl font-bold text-neutral-500"
        >
          {speaker.name.slice(0, 1)}
          {bioOverlay}
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        {speaker.hyperlink ? (
          <a
            href={speaker.hyperlink}
            target="_blank"
            rel="noreferrer"
            className="block rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#990000]"
          >
            {details}
          </a>
        ) : (
          details
        )}
      </div>
      {speaker.invited && (
        <p className="bg-[#FFCC00] py-1.5 text-center text-xs font-bold uppercase tracking-wide text-black">
          Invited speaker
        </p>
      )}
    </article>
  );
}
