
type HackathonCardProps = {
    imageSrc: string;
    title: string;
    subtitle?: string; 
    description: string;
    href: string;
    cta?: string; 
};
  
export default function HackathonCard({imageSrc, title, subtitle, description, href, cta = "Application Link",}: HackathonCardProps) {
    return (
        <div className="md:max-w-sm lg:max-w-md p-8 group flex flex-col flex-1 h-full bg-lighter shadow-[0_0_16px_var(--color-shadow)] ring-1 ring-slate-200 transition
                            hover:-translate-y-0.5 hover:shadow-[0_10px_24px_var(--color-shadow)]">
            <div className="w-full aspect-[16/9] bg-white">
                <img
                src={imageSrc}
                alt={title}
                className="w-full object-contain"
                />
            </div>

            <div className="flex flex-1 flex-col gap-3 py-5">
                <h2 className="text-2xl font-bold text-main">{title}</h2>
                {subtitle && (
                <p className="text-sm font-bold text-main">{subtitle}</p>
                )}
                <p className="text-sm leading-6 text-main">
                {description}
                </p>

                <div className="mt-auto pt-2 flex justify-center">
                <a
                    href={href}
                    className="inline-flex items-center justify-center  bg-main px-4 py-2 text-2xl text-lighter
                                shadow-sm transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2E4A86]/60"
                >
                    {cta}
                </a>
                </div>
            </div>
        </div>
    );
}
  

