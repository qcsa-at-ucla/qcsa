"use client";

import { useState } from "react";
import MainWebsiteFooter from "../Components/mainWebsiteFooter";
import MainWebsiteHeader from "../Components/mainWebsiteHeader";
import SponsorSection from "../Components/SponsorSection";

const qcfSponsors = [
  { name: "BQP", logo: "/images/qcf-sponsors/bqp.png", url: "https://www.bqpsim.com/" },
  { name: "JPL", logo: "/images/qcf-sponsors/JPL.png", url: "https://www.jpl.nasa.gov/" },
  { name: "Keysight", logo: "/images/qcf-sponsors/keysight.jpg", url: "https://www.keysight.com" },
  { name: "Microsoft", logo: "/images/qcf-sponsors/Microsoft.png", url: "https://www.microsoft.com" },
  { name: "PsiQuantum", logo: "/images/qcf-sponsors/psiquantum.png", url: "https://www.psiquantum.com/" },
  { name: "IonQ", logo: "/images/qcf-sponsors/ionq.png", url: "https://www.ionq.com/" },
  { name: "Q-CTRL", logo: "/images/qcf-sponsors/q-ctrl.png", url: "https://www.q-ctrl.com/" },
];

export default function QCF() {
  const [showModal, setShowModal] = useState(false);
  const [selectedTier, setSelectedTier] = useState<"silver" | "gold" | null>(null);
  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function openSponsorModal(tier: "silver" | "gold") {
    setSelectedTier(tier);
    setShowModal(true);
  }

  async function handleCheckout() {
    if (!selectedTier || !companyName.trim()) return;

    setIsLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tier: selectedTier,
          company_name: companyName.trim(),
          contact_name: contactName.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data?.error ?? "Payment error");
        return;
      }

      window.location.href = data.url;
    } catch {
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  function closeModal() {
    setShowModal(false);
    setSelectedTier(null);
    setCompanyName("");
    setContactName("");
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

        { <section className="py-16 px-4 bg-gray-50">
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
                  onClick={() => openSponsorModal("silver")}
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
                  onClick={() => openSponsorModal("gold")}
                  className="border-2 border-yellow-500 text-yellow-600 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-50 transition"
                >
                  Sponsor as Gold
                </button>
              </div>

            </div>

          </div>
        </section> }

        <SponsorSection
          title="Our Sponsors"
          sponsors={qcfSponsors}
        />

      </main>

      <MainWebsiteFooter />

      {/* Sponsor Info Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8">
            <h3 className="text-2xl font-bold text-blue-900 mb-6">
              {selectedTier === "gold" ? "Gold" : "Silver"} Sponsorship
            </h3>

            <div className="space-y-4">
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="companyName"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter company name"
                  required
                />
              </div>

              <div>
                <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Name
                </label>
                <input
                  type="text"
                  id="contactName"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter contact person's name"
                />
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <button
                onClick={closeModal}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleCheckout}
                disabled={isLoading || !companyName.trim()}
                className={`flex-1 px-4 py-2 rounded-lg font-semibold text-white transition ${
                  selectedTier === "gold"
                    ? "bg-yellow-500 hover:bg-yellow-600"
                    : "bg-gray-600 hover:bg-gray-700"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isLoading ? "Processing..." : "Continue to Payment"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}