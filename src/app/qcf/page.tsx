"use client";

import { useEffect, useState } from "react";
import MainWebsiteFooter from "../Components/mainWebsiteFooter";
import MainWebsiteHeader from "../Components/mainWebsiteHeader";
import SponsorSection from "../Components/SponsorSection";
import RegistrationSection from "../Components/RegistrationSection";

function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}

const qcfSponsors = [
  { name: "BQP", logo: "/images/qcf-sponsors/bqp.png", url: "https://www.bqp.io/" },
  { name: "JPL", logo: "/images/qcf-sponsors/JPL.png", url: "https://www.jpl.nasa.gov/" },
  { name: "Keysight", logo: "/images/qcf-sponsors/keysight.jpg", url: "https://www.keysight.com" },
  { name: "PsiQuantum", logo: "/images/qcf-sponsors/psiquantum.png", url: "https://www.psiquantum.com/" },
];

export default function QCFPage() {
  const hydrated = useHydrated();

  if (!hydrated) {
    return (
      <div className="min-h-screen bg-[#F3F8FF]">
        <MainWebsiteHeader />
        <main id="main-content" className="py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-blue-100 animate-pulse">
              <div className="h-8 w-2/3 bg-gray-200 rounded mb-4" />
              <div className="h-4 w-full bg-gray-200 rounded mb-2" />
              <div className="h-4 w-5/6 bg-gray-200 rounded mb-6" />
              <div className="h-10 w-full bg-gray-200 rounded mb-3" />
              <div className="h-10 w-full bg-gray-200 rounded mb-3" />
              <div className="h-10 w-full bg-gray-200 rounded" />
            </div>
          </div>
        </main>
        <MainWebsiteFooter />
      </div>
    );
  }

  return (
    <div>
      <MainWebsiteHeader />
      <main id="main-content">
        <RegistrationSection />
        <SponsorSection title="Our Sponsors" direction="left" sponsors={qcfSponsors} />
      </main>
      <MainWebsiteFooter />
    </div>
  );
}
