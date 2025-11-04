"use client";
import MainWebsiteFooter from "../Components/mainWebsiteFooter";
import MainWebsiteHeader from "../Components/mainWebsiteHeader";
import NewsletterCard from "../Components/NewsletterCard";
import { motion } from 'framer-motion';

type Item = {
  edition: number | string;
  title: string;
  excerpt: string;
  href: string;
};

const newsletters: Item[] = [
    { edition: 1, title: "Week 3", excerpt: "Fall General Meeting, Weekly ACM x Quantum, Qiskit Fall Fest QuARC, Quantum Bio", href: "https://open.substack.com/pub/qcsa/p/qcsa-newsletter-week-3?utm_campaign=post&utm_medium=post%20viewer" },
    // { edition: 2, title: "Week 4", excerpt: "Text here. Text here. Text here. Text here. Text here. Text here. Text here. Text…", href: "#" },
    { edition: 2, title: "Week 5", excerpt: "Weekly ACM x Quantum, Qiskit Fall Fest Recap, QuARC, QuBE, Quantum Coalition Learning Resources Project", href: "https://qcsa.substack.com/p/qcsa-newsletter-week-5"},
    // { edition: 4, title: "Week 6", excerpt: "Text here. Text here. Text here. Text here. Text here. Text here. Text here. Text here. Text here. Text here.Text here. Text…", href: "#" },
    // { edition: 5, title: "Week 7", excerpt: "Text here. Text here. Text here. Text here. Text here. Text here. Text here. Text…", href: "#" },
    // { edition: 6, title: "Week 8", excerpt: "Text here. Text here. Text here. Text here. Text here. Text here. Text here. Text…", href: "#" },
    // { edition: 7, title: "Week 9", excerpt: "Text here. Text here. Text here. Text here. Text here. Text here. Text here. Text…", href: "#" },
    // { edition: 8, title: "Week 10", excerpt: "Text here. Text here. Text here. Text here. Text here. Text here. Text here. Text…", href: "#" },

  ];

  

const COLS = 3;
const pad = (COLS - (newsletters.length % COLS)) % COLS;
export default function NewslettersPage() {
  return (
    <>
    <MainWebsiteHeader/>
    <main className="mx-auto px-6 py-12 w-full max-w-xs sm:max-w-xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl pb-44 ">
      <motion.h2 
        className="mb-16 text-4xl text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Past Newsletters
      </motion.h2>

      <ul className="grid gap-6 xl:gap-12 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:px-6 items-stretch auto-rows-fr">
        {newsletters.map((n, index) => (
          <motion.li 
            key={n.edition} 
            className="h-full"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
          >
            <NewsletterCard
              edition={n.edition}
              title={n.title}
              excerpt={n.excerpt}
              href={n.href}
            />
          </motion.li>
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