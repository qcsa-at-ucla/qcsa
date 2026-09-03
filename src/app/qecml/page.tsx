import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "QEC-ML 2027 | USC",
  description:
    "QEC-ML 2027 — A 3 day workshop on Machine Learning in Quantum Error Correction at USC in March 2027",
};

export default function QECMLPage() {
  return (
    <>
      <main
        id="main-content"
        className="relative min-h-screen overflow-hidden bg-[#990000] text-white"
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

        {}
        <nav className="relative z-10 flex items-center justify-between px-6 py-6 sm:px-10 lg:px-16">
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

        <section className="relative z-10 flex min-h-[calc(100vh-96px)] items-center justify-center px-6 pb-20 text-center">
          <div className="mx-auto max-w-6xl">
            <p className="mb-7 text-sm font-bold uppercase tracking-[0.3em] text-[#FFCC00] sm:text-base">
              Quantum Error Correction × Machine Learning
            </p>

            <h1 className="text-[clamp(5rem,18vw,13rem)] font-bold leading-[0.82] tracking-[-0.07em] text-white">
              QEC-ML
            </h1>

            <div className="mx-auto my-9 h-1 w-24 bg-[#FFCC00]" />

            <p className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
              March 2027
            </p>

            <p className="mt-3 text-xl font-bold uppercase tracking-[0.24em] text-[#FFCC00] sm:text-2xl">
              USC
            </p>

            <p className="mx-auto mt-10 max-w-xl text-base leading-7 text-white/75 sm:text-lg">
              Programme, speakers, registration, and venue details to be announced soon.
            </p>
          </div>
        </section>
      </main>

      <footer
        id="footer"
        className="bg-[#990000] px-6 py-6 text-center text-sm font-bold uppercase tracking-[0.18em] text-[#FFCC00]"
      >
        QEC-ML · March 2027 · USC
      </footer>
    </>
  );
}