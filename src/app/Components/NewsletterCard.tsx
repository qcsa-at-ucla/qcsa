type Props = {
    edition: number | string;
    title: string;
    excerpt: string;
    href: string;
};

  export default function NewsletterCard({ edition, title, excerpt, href }: Props) {
    return (
      <article className="group flex h-full flex-col rounded-md bg-white shadow-[4px_4px_3px_rgba(37,99,235,0.25)] transition hover:-translate-y-0.5">
        {/* Header */}
        <div className="rounded-t-md bg-[#405C80] px-8 py-10">
          <h3 className=" text-center text-[30px] lg:text-[35px] xl:text-[40px] font-bold tracking-wide text-white ">
            EDITION #{edition}
          </h3>
        </div>
  
        {/* Body */}
        <div className="flex flex-1 flex-col px-8 py-6">
            <h4 className="mb-3 text-lg text-slate-900">{title}</h4>
            <p className="flex-1 text-sm leading-6 text-slate-600 line-clamp-4">
                {excerpt}
            </p>
            <div className = 'flex justify-center'>
                <a
                href={href}
                className="mt-6 inline-flex items-center justify-center rounded-sm bg-main px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-main/60"
                >
                Read More
                </a>
            </div>

        </div>
      </article>
    );
  }