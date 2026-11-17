import type { Metadata } from "next";
import ContactForm from "./contact-form";

export const metadata: Metadata = {
  title: "Contact | QECML 2027",
};

export default function QECMLContactPage() {
  return (
    <main className="flex min-h-screen flex-col bg-neutral-50 text-neutral-900">
      <section className="flex-1 px-5 pb-16 pt-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-[#990000]">
            QECML 2027 · USC
          </p>
          <h1 className="text-5xl font-bold tracking-tight text-neutral-900 sm:text-7xl">Contact</h1>
          <div className="my-8 h-1 w-20 bg-[#FFCC00]" />
          <p className="max-w-3xl leading-7 text-neutral-700">
            Questions about QECML 2027? Send us a message and we&apos;ll get back to you.
          </p>
          <div className="mt-8 max-w-3xl rounded-xl border border-neutral-200 border-l-4 border-l-[#990000] bg-white p-6 shadow-sm sm:p-8">
            <ContactForm />
          </div>
        </div>
      </section>

      <footer className="bg-neutral-900 px-6 py-6 text-center text-sm font-bold uppercase tracking-[0.18em] text-white">
        QECML · March 2027 · USC
      </footer>
    </main>
  );
}
