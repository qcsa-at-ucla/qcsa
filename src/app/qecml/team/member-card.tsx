import type { CommitteeMember } from "./committee-members";

export default function MemberCard({ member }: { member: CommitteeMember }) {
  const headshot = member.headshot ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={member.headshot}
      alt={`Portrait of ${member.name}`}
      className="h-full w-full object-cover"
      style={{ objectPosition: `center ${member.headshotPositionY ?? 0}%` }}
    />
  ) : null;

  return (
    <article className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
      {member.headshot ? (
        <div className="group/photo relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
          {headshot}
          <div className="committee-bio-scroll pointer-events-none absolute inset-0 overflow-y-auto overscroll-contain bg-neutral-950/95 p-5 opacity-0 transition-opacity duration-200 group-hover/photo:pointer-events-auto group-hover/photo:opacity-100 motion-reduce:transition-none">
            <p className="leading-7 text-white">{member.bio}</p>
          </div>
        </div>
      ) : (
        <div
          aria-hidden="true"
          className="group/photo relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-neutral-100 text-5xl font-bold text-neutral-500"
        >
          {member.name.slice(0, 1)}
          <div className="committee-bio-scroll pointer-events-none absolute inset-0 overflow-y-auto overscroll-contain bg-neutral-950/95 p-5 text-base font-normal opacity-0 transition-opacity duration-200 group-hover/photo:pointer-events-auto group-hover/photo:opacity-100 motion-reduce:transition-none">
            <p className="leading-7 text-white">{member.bio}</p>
          </div>
        </div>
      )}
      <div className="p-5">
        {member.hyperlink ? (
          <a
            href={member.hyperlink}
            target="_blank"
            rel="noreferrer"
            className="block rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#990000]"
          >
            <h3 className="text-xl font-bold text-neutral-900 hover:underline">{member.name}</h3>
            {(member.role || member.affiliation) && (
              <p className="mt-1 text-sm text-neutral-600">
                {[member.role, member.affiliation].filter(Boolean).join(" · ")}
              </p>
            )}
          </a>
        ) : (
          <>
            <h3 className="text-xl font-bold text-neutral-900">{member.name}</h3>
            {(member.role || member.affiliation) && (
              <p className="mt-1 text-sm text-neutral-600">
                {[member.role, member.affiliation].filter(Boolean).join(" · ")}
              </p>
            )}
          </>
        )}
      </div>
    </article>
  );
}
