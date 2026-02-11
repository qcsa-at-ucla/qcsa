"use client";

import MainWebsiteFooter from "../Components/mainWebsiteFooter";
import MainWebsiteHeader from "../Components/mainWebsiteHeader";
import SponsorSection from "../Components/SponsorSection";

const qcfSponsors = [
  { name: "BQP", logo: "/images/qcf-sponsors/bqp.png", url: "https://www.bqpsim.com/" },
  { name: "JPL", logo: "/images/qcf-sponsors/JPL.png", url: "https://www.jpl.nasa.gov/" },
  { name: "Keysight", logo: "/images/qcf-sponsors/keysight.jpg", url: "https://www.keysight.com" },
  { name: "Microsoft", logo: "/images/qcf-sponsors/Microsoft.png", url: "https://www.microsoft.com" },
  { name: "PsiQuantum", logo: "/images/qcf-sponsors/psiquantum.png", url: "https://www.psiquantum.com/" },
];

export default function QCF() {
  async function goToCheckout(tier: "silver" | "gold") {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tier }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data?.error ?? "Payment error");
      return;
    }

    window.location.href = data.url;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <MainWebsiteHeader />

      <main id="main-content" className="flex-1">

        <section className="py-16 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-blue-900 mb-10">
              Quantum Career Fair
            </h2>

            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSex5EiOsnk4ZjP1nlZ8PyTZXm8qywiuZfG4M0zJNfn7H4L9Kg/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block hover:opacity-90 transition"
            >
              <img
                src="/images/qcf-flyer-final.png"
                alt="Quantum Career Fair Flyer"
                className="w-full max-w-3xl mx-auto rounded-xl shadow-xl"
              />
            </a>
          </div>
        </section>

        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-5xl mx-auto text-center">

            <h3 className="text-3xl font-bold text-blue-900 mb-4">
              Become a Sponsor
            </h3>

            <p className="text-gray-700 mb-12">
              Support the Quantum Career Fair by sponsoring our event.
            </p>

            <div className="grid md:grid-cols-2 gap-8">

              <div className="bg-white rounded-xl shadow-lg p-10 flex flex-col items-center">
                <h4 className="text-2xl font-semibold mb-2">
                  Silver Sponsor
                </h4>

                <p className="text-3xl font-bold mb-6">$500</p>

                <button
                  onClick={() => goToCheckout("silver")}
                  className="border-2 border-gray-400 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
                >
                  Sponsor as Silver
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-10 flex flex-col items-center">
                <h4 className="text-2xl font-semibold mb-2">
                  Gold Sponsor
                </h4>

                <p className="text-3xl font-bold mb-6">$750</p>

                <button
                  onClick={() => goToCheckout("gold")}
                  className="border-2 border-yellow-500 text-yellow-600 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-50 transition"
                >
                  Sponsor as Gold
                </button>
              </div>

            </div>

          </div>
        </section>

        <SponsorSection
          title="Our Sponsors"
          sponsors={qcfSponsors}
        />

      </main>

      <MainWebsiteFooter />
    </div>
  );
}