import MainWebsiteFooter from "../Components/MainWebsiteFooter";
import NewsletterCard from "../Components/NewsletterCard";

type Item = {
  edition: number | string;
  title: string;
  excerpt: string;
  href: string;
};

const newsletters: Item[] = [
    { edition: 9, title: "Title of Newsletter", excerpt: "Text here. Text here. Text here. Text here. Text here. Text here. Text here. Text…", href: "#" },
    { edition: 8, title: "Title of Newsletter", excerpt: "Text here. Text here. Text here. Text here. Text here. Text here. Text here. Text…", href: "#" },
    { edition: 7, title: "Title of Newsletter", excerpt: "Text here. Text here. Text here. Text here. Text here. Text here. Text here. Text…", href: "#" },
    { edition: 6, title: "Title of Newsletter", excerpt: "Text here. Text here. Text here. Text here. Text here. Text here. Text here. Text here. Text here. Text here.Text here. Text…", href: "#" },
    { edition: 5, title: "Title of Newsletter", excerpt: "Text here. Text here. Text here. Text here. Text here. Text here. Text here. Text…", href: "#" },
    { edition: 4, title: "Title of Newsletter", excerpt: "Text here. Text here. Text here. Text here. Text here. Text here. Text here. Text…", href: "#" },
    { edition: 3, title: "Title of Newsletter", excerpt: "Text here. Text here. Text here. Text here. Text here. Text here. Text here. Text…", href: "#" },
    { edition: 2, title: "Title of Newsletter", excerpt: "Text here. Text here. Text here. Text here. Text here. Text here. Text here. Text…", href: "#" },
    { edition: 1, title: "Title of Newsletter", excerpt: "Text here. Text here. Text here. Text here. Text here. Text here. Text here. Text…", href: "#" },

];
  

const COLS = 3;
const pad = (COLS - (newsletters.length % COLS)) % COLS;
export default function NewslettersPage() {
  return (
    <>
    <main className="mx-auto px-6 py-12 w-full max-w-xs sm:max-w-xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl pb-44">
      <h2 className="mb-16 text-4xl text-center">Past Newsletters</h2>

      <ul className="grid gap-6 xl:gap-12 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:px-6 items-stretch auto-rows-fr">
        {newsletters.map((n) => (
          <li key={n.edition} className="h-full">
            <NewsletterCard
              edition={n.edition}
              title={n.title}
              excerpt={n.excerpt}
              href={n.href}
            />
          </li>
        ))}

        {Array.from({ length: pad }).map((_, i) => (
          <li
            key={`pad-${i}`}
            aria-hidden
            className="invisible md:block"
          >
            <div className="rounded-2xl px-8 py-10" />
          </li>
        ))}
      </ul>
    </main>
    <MainWebsiteFooter/>
    </>
  );
}