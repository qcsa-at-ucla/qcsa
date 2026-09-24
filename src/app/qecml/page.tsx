import type { Metadata } from "next";
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
        className="relative overflow-hidden bg-[#990000] text-white"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(circle at 15% 20%, rgba(255,204,0,0.28), transparent 28%), radial-gradient(circle at 85% 80%, rgba(255,204,0,0.18), transparent 30%)",
          }}
        />

        <div
          aria-hidden="true"
          className="absolute -left-40 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full border border-[#FFCC00]/30"
        />

        <div
          aria-hidden="true"
          className="absolute -right-24 top-20 h-72 w-72 rounded-full border border-[#FFCC00]/20"
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
        aria-labelledby="venue-heading"
        className="bg-[#720000] px-6 py-12 text-white sm:px-10 sm:py-16 lg:px-16"
      >
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-2xl border border-[#FFCC00]/30 bg-[#850000] shadow-2xl md:grid-cols-[minmax(16rem,0.8fr)_minmax(0,1.4fr]">
          <div className="flex flex-col justify-center p-6 sm:p-7 lg:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#FFCC00]">
              Venue
            </p>
            <h2
              id="venue-heading"
              className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl"
            >
              Ginsburg Hall
            </h2>
            <p className="mt-4 text-lg leading-7 text-white/85">
              University of Southern California
              <br />
              Los Angeles, CA 90089
            </p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Ginsburg+Hall%2C+Los+Angeles%2C+CA+90089"
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-[#FFCC00]/70 px-5 py-3 font-bold text-[#FFCC00] transition hover:bg-[#FFCC00] hover:text-[#720000]"
            >
              Get directions <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="min-h-[12rem] border-t border-[#FFCC00]/20 md:min-h-[16rem] md:border-l md:border-t-0">
            <iframe
              title="Map showing Ginsburg Hall at USC"
              src="https://maps.google.com/maps?q=Ginsburg%20Hall%2C%20Los%20Angeles%2C%20CA%2090089&output=embed"
              className="h-full min-h-[12rem] w-full md:min-h-[16rem]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <footer
        id="footer"
        className="bg-[#990000] px-6 py-6 text-center text-sm font-bold uppercase tracking-[0.18em] text-[#FFCC00]"
      >
        QECML · March 2027 · USC
      </footer>
    </>
  );
}
