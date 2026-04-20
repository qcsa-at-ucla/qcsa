"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import MainWebsiteHeader from "@/app/Components/mainWebsiteHeader";
import MainWebsiteFooter from "@/app/Components/mainWebsiteFooter";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [cleared, setCleared] = useState(false);

  useEffect(() => {
    // Clear the cart after successful purchase
    localStorage.removeItem("qcsa_merch_cart");
    setCleared(true);
  }, []);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 pb-16">
      <div className="text-center max-w-lg">
        {/* Animated check */}
        <div className="relative mx-auto w-28 h-28 mb-8">
          <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-30" />
          <div className="relative w-28 h-28 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-14 h-14 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        <h1 className="font-kantumruy font-bold text-[#234285] text-4xl mb-4">
          Order Confirmed!
        </h1>
        <p className="font-kantumruy text-gray-600 text-lg mb-4">
          Thank you for supporting QCSA! Your order has been placed and is being prepared for fulfillment.
        </p>
        {sessionId && (
          <p className="font-kantumruy text-gray-400 text-sm mb-8">
            Order ID: <span className="font-bold">{sessionId.slice(-12).toUpperCase()}</span>
          </p>
        )}

        <div className="bg-[#F3F8FF] rounded-2xl p-6 mb-8 text-left space-y-3">
          <h3 className="font-kantumruy font-bold text-[#234285] text-lg mb-3">What happens next?</h3>
          {[
            { step: "1", text: "Your order is sent to our print provider for fulfillment." },
            { step: "2", text: "You&apos;ll receive a shipping confirmation email once dispatched." },
            { step: "3", text: "Track your package with the tracking number provided." },
          ].map((s) => (
            <div key={s.step} className="flex gap-3 items-start">
              <div className="w-7 h-7 rounded-full bg-[#234285] text-white flex items-center justify-center flex-shrink-0 mt-0.5 font-kantumruy font-bold text-sm">
                {s.step}
              </div>
              <p
                className="font-kantumruy text-gray-600 text-sm"
                dangerouslySetInnerHTML={{ __html: s.text }}
              />
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/merch"
            className="bg-[#234285] text-white font-kantumruy font-bold px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </Link>
          <Link
            href="/"
            className="border-2 border-[#234285] text-[#234285] font-kantumruy font-bold px-8 py-3 rounded-xl hover:bg-blue-50 transition-colors"
          >
            Back to Home
          </Link>
        </div>
        {cleared && null}
      </div>
    </div>
  );
}

export default function MerchSuccessPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F3F8FF" }}>
      <MainWebsiteHeader />
      <Suspense fallback={<div className="min-h-[70vh]" />}>
        <SuccessContent />
      </Suspense>
      <MainWebsiteFooter />
    </div>
  );
}
