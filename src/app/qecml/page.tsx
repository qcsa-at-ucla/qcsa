import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "QECML 2027 | USC",
  description:
    "QECML 2027 — A 3 day workshop on Machine Learning in Quantum Error Correction at USC in March 2027",
};

export default function QECMLPage() {
  return (
    <>
      <main
        id="main-content"
        className="relative overflow-hidden text-white"
      >
        <Image
          src="/images/qecml/misc/landscape.jpeg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "center 15%" }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-neutral-950/45"
        />

        <nav className="relative z-10 flex items-center justify-between py-4 pl-20 pr-6 sm:pl-24 sm:pr-10 lg:pl-28 lg:pr-16">
          <Link
            href="/events"
            className="text-sm font-bold uppercase tracking-[0.18em] text-white/85 transition hover:text-[#FFCC00]"
          >
            ← QCSA Events
          </Link>

          <span className="text-sm font-bold uppercase tracking-[0.18em] text-[#FFCC00]">
            USC · 2027
          </span>
        </nav>

        <section className="relative z-10 flex min-h-[360px] items-center justify-center px-6 py-7 text-center sm:min-h-[390px] sm:py-8">
          <div className="mx-auto max-w-6xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-[#FFCC00] sm:mb-5 sm:text-base">
              Quantum Error Correction × Machine Learning
            </p>

            <h1 className="text-[clamp(4rem,15vw,9rem)] font-bold leading-[0.84] tracking-[-0.07em] text-white">
              QECML 2027
            </h1>

            <div className="mx-auto my-5 h-1 w-20 bg-[#FFCC00] sm:my-6" />

            <p className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
              March 10-12
            </p>

            <p className="mt-3 text-xl font-bold uppercase tracking-[0.24em] text-[#FFCC00] sm:text-2xl">
              USC
            </p>

            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-white/75 sm:mt-6 sm:text-lg">
              Programme, speakers, and registration details to be announced soon.
            </p>
          </div>
        </section>
      </main>

      <section
        aria-labelledby="timeline-heading"
        className="bg-neutral-100 px-6 py-12 text-neutral-900 sm:px-10 sm:py-16 lg:px-16"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 sm:mb-10">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#990000]">
              Timeline
            </p>
            <h2
              id="timeline-heading"
              className="mt-2 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl"
            >
              Important dates
            </h2>
          </div>

          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Abstract submission deadline", date: "January 9, 2027" },
              { label: "Accepted submissions notification", date: "January 27, 2027" },
              { label: "Registration deadline", date: "February 10, 2027" },
              { label: "Late registration deadline", date: "February 17, 2027" },
            ].map((milestone, index) => (
              <li
                key={milestone.label}
                className="relative rounded-2xl border border-neutral-200 border-t-4 border-t-[#990000] bg-white p-5 shadow-sm sm:p-6"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFCC00] text-sm font-bold text-[#720000]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 min-h-14 text-lg font-bold leading-6 text-neutral-900">
                  {milestone.label}
                </h3>
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.12em] text-neutral-600">
                  {milestone.date}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        aria-labelledby="venue-heading"
        className="bg-white px-6 py-12 text-neutral-900 sm:px-10 sm:py-16 lg:px-16"
      >
        <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl">
          <div className="grid md:grid-cols-2">
          <div className="flex flex-col justify-center p-6 sm:p-7 lg:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#990000]">
              Venue
            </p>
            <h2
              id="venue-heading"
              className="mt-4 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl"
            >
              Ginsburg Hall
            </h2>
            <p className="mt-4 text-lg leading-7 text-neutral-700">
              University of Southern California
              <br />
              Los Angeles, CA 90089
            </p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Ginsburg+Hall%2C+Los+Angeles%2C+CA+90089"
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-[#990000] px-5 py-3 font-bold text-white transition hover:bg-[#790000] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#990000]"
            >
              Get directions <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="min-h-[16rem] border-t border-neutral-200 md:border-l md:border-t-0">
            <Image
              src="/images/qecml/misc/ginsburg.jpg"
              alt="Ginsburg Hall"
              width={1200}
              height={800}
              className="h-full min-h-[16rem] w-full object-cover"
            />
          </div>
          </div>

          <div className="h-64 border-t border-neutral-200 sm:h-80 md:h-96">
            <iframe
              title="Map showing Ginsburg Hall at USC"
              src="https://maps.google.com/maps?q=Ginsburg%20Hall%2C%20Los%20Angeles%2C%20CA%2090089&output=embed"
              className="h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <footer
        id="footer"
        className="bg-neutral-900 px-6 py-6 text-center text-sm font-bold uppercase tracking-[0.18em] text-white"
      >
        QECML · March 2027 · USC
      </footer>
    </>
  );
}
