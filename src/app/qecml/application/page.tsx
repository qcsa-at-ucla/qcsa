import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Application | QECML 2027",
  description:
    "Apply for QECML 2027 at USC through a Google Form with a Stripe payment link.",
};

const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfve37oO6OVm2bpsXOMiU8FsDmfHP3qZ_FtL7hcxI3tU6nGXQ/viewform";

const steps = [
  {
    title: "Application",
    body: "Fill out the application form with your info by the application deadline.  Submitting an abstract for either a talk or a poster is encouraged but not required to apply.",
    date: "January 9, 2027",
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
    <main className="flex min-h-screen flex-col bg-neutral-50 text-neutral-900">
      <section
        aria-labelledby="application-heading"
        className="flex-1 px-5 pb-16 pt-24 sm:px-8 lg:px-12"
      >
        <div className="mx-auto max-w-5xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-[#990000]">
            QECML 2027 · USC
          </p>
          <h1
            id="application-heading"
            className="text-5xl font-bold tracking-tight text-neutral-900 sm:text-7xl"
          >
            Application
          </h1>
          <div className="my-8 h-1 w-20 bg-[#FFCC00]" />
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
            <a
              href={FORM_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#990000] px-6 py-3 font-bold text-white transition hover:bg-[#790000]"
            >
              Apply now <span aria-hidden="true">↗</span>
            </a>
            <p className="text-sm text-neutral-600">
              The form requires signing in with a Google account.
            </p>
          </div>
        </div>
      </section>

      <footer className="bg-neutral-900 px-6 py-6 text-center text-sm font-bold uppercase tracking-[0.18em] text-white">
        QECML · March 2027 · USC
      </footer>
    </main>
  );
}
