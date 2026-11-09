import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Registration | QECML 2027",
  description:
    "Register for QECML 2027 at USC through a Google Form with a Stripe payment link.",
};

const FORM_URL = "https://forms.gle/REPLACE_ME";

const steps = [
  {
    title: "Fill out the Google Form",
    body: "Share your name, affiliation, contact details, and any dietary needs.",
  },
  {
    title: "Pay through Stripe",
    body: "The form includes a secure Stripe link to pay the registration fee.",
  },
  {
    title: "Get your confirmation",
    body: "We will email you once your registration and payment are received.",
  },
];

export default function RegistrationPage() {
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
        aria-labelledby="registration-heading"
        className="flex-1 px-6 py-12 sm:px-10 sm:py-16 lg:px-16"
      >
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#990000]">
            Registration
          </p>
          <h1
            id="registration-heading"
            className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl"
          >
            Register for QECML 2027
          </h1>
          <div className="my-6 h-1 w-20 bg-[#FFCC00]" />
          <p className="max-w-2xl text-lg leading-7 text-neutral-700">
            Registration is one short Google Form. Payment is a Stripe link
            inside the form, so everything happens in one place.
          </p>

          <ol className="mt-10 grid gap-4 sm:grid-cols-3">
            {steps.map((step, index) => (
              <li
                key={step.title}
                className="rounded-2xl border border-neutral-200 border-t-4 border-t-[#990000] bg-white p-5 shadow-sm sm:p-6"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFCC00] text-sm font-bold text-[#720000]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-5 text-lg font-bold leading-6">
                  {step.title}
                </h2>
                <p className="mt-2 leading-6 text-neutral-700">{step.body}</p>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={FORM_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#990000] px-6 py-3 font-bold text-white transition hover:bg-[#790000] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#990000]"
            >
              Open registration form <span aria-hidden="true">↗</span>
            </a>
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-neutral-600">
              Registration deadline: TBD
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
