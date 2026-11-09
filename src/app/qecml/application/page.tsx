import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Application | QECML 2027",
  description:
    "Apply for QECML 2027 at USC through a Google Form with a Stripe payment link.",
};

// const FORM_URL = "https://forms.gle/REPLACE_ME";

const steps = [
  {
    title: "Application",
    body: "Fill out the application form with your info by the application deadline.  Submitting an abstract for either a talk or a poster is encouraged but not required to apply.",
    date: "TBD",
    dateLabel: "Deadline",
  },
  {
    title: "Acceptance",
    body: "Accepted applicants will receive a registration link after the application deadline has passed.  We will do our best to admit all applicants, but due to space limits we may not be able to invite all applicants to ultimately register.",
    date: "TBD",
    dateLabel: "Date",
  },
  {
    title: "Registration",
    body: "Accepted applicants must pay the registration fee by the registration deadline or their spot may be given to another applicant.",
    date: "TBD",
    dateLabel: "Deadline",
  },
];

export default function ApplicationPage() {
  return (
    <main className="flex min-h-screen flex-col bg-neutral-100 text-neutral-900">
      <header className="flex items-center justify-between bg-[#990000] py-6 pl-20 pr-6 text-white sm:pl-24 sm:pr-10 lg:pl-28 lg:pr-16">
        <Link
          href="/qecml"
          className="text-sm font-bold uppercase tracking-[0.18em] text-white/85 transition hover:text-[#FFCC00]"
        >
          ← Overview
        </Link>
        <span className="text-sm font-bold uppercase tracking-[0.18em] text-[#FFCC00]">
          USC · 2027
        </span>
      </header>

      <section
        aria-labelledby="application-heading"
        className="flex-1 px-6 py-12 sm:px-10 sm:py-16 lg:px-16"
      >
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#990000]">
            QECML 2027 · USC
          </p>
          <h1
            id="application-heading"
            className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl"
          >
            Application
          </h1>
          <div className="my-6 h-1 w-20 bg-[#FFCC00]" />

          <ol className="mt-10 grid gap-4 sm:grid-cols-3">
            {steps.map((step, index) => (
              <li
                key={step.title}
                className="flex flex-col rounded-2xl border border-neutral-200 border-t-4 border-t-[#990000] bg-white p-5 shadow-sm sm:p-6"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFCC00] text-sm font-bold text-[#720000]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-5 text-lg font-bold leading-6">
                  {step.title}
                </h2>
                <p className="mt-2 leading-6 text-neutral-700">{step.body}</p>
                <p className="mt-auto pt-5 text-sm font-semibold uppercase tracking-[0.12em] text-neutral-600">
                  {step.dateLabel}: {step.date}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            {/* Application form link hidden until applications open.
            <a href={FORM_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#990000] px-6 py-3 font-bold text-white transition hover:bg-[#790000]">
              Open application form <span aria-hidden="true">↗</span>
            </a>
            */}
          </div>
        </div>
      </section>

      <footer className="bg-neutral-900 px-6 py-6 text-center text-sm font-bold uppercase tracking-[0.18em] text-white">
        QECML · March 2027 · USC
      </footer>
    </main>
  );
}
