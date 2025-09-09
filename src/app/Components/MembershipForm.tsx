"use client";
import { useRef, useState } from "react";

export default function MembershipForm() {
  const [sent, setSent] = useState(false);
  const submitted = useRef(false);

  function afterSubmit() {
    if (!submitted.current) return;           
    setTimeout(() => setSent(true), 300);     
  }

  return (
    <div className="flex flex-col">
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F3F8FF] flex-grow">
        <h2 className="relative -top-4 text-[36px] font-bold text-main text-center mb-1.5">
          Membership
        </h2>

        <div className="w-full max-w-xs sm:max-w-sm md:max-w-xl lg:max-w-4xl xl:max-w-5xl mx-auto">
          {!sent ? (
            <>
              <form
                className="text-main text-2xl font-bold"
                action="https://docs.google.com/forms/d/e/1FAIpQLSetZT79aEjUG-MP1N-y5nWezv3W7tMDlstj4AUcecNrY3FLVw/formResponse"
                method="POST"
                target="hidden_iframe"
                onSubmit={() => (submitted.current = true)}
              >
                <label htmlFor="first-name" className="block text-main font-bold mb-1">
                  Name
                </label>

                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-20">
                  <div className="mb-8">
                    <label htmlFor="first-name" className="block font-normal mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="first-name"
                      name="entry.692119162"
                      required
                      className="w-full rounded-sm border-3 border-main/40 bg-[#F8FAFF] px-3 py-2 outline-none font-normal focus:border-main/60 focus:shadow-[0_0_8px_rgba(35,66,133,0.7)] transition"
                    />
                  </div>

                  <div className="mb-8">
                    <label htmlFor="last-name" className="block font-normal mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="last-name"
                      name="entry.617648669"
                      required
                      className="w-full rounded-sm border-3 border-main/40 bg-[#F8FAFF] px-3 py-2 outline-none font-normal focus:border-main/60 focus:shadow-[0_0_8px_rgba(35,66,133,0.7)] transition"
                    />
                  </div>
                </div>

                <div className="mb-8">
                  <label htmlFor="email" className="block font-bold mb-2">
                    Email <span className="font-normal">(required)</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="entry.373187324"  
                    required
                    className="w-full rounded-sm border-3 border-main/40 bg-[#F8FAFF] px-3 py-2 outline-none font-normal focus:border-main/60 focus:shadow-[0_0_8px_rgba(35,66,133,0.7)] transition"
                  />
                </div>

                <div className="mb-8">
                  <label htmlFor="education" className="block font-bold mb-2">
                    Educational Background <span className="font-normal">(required)</span>
                  </label>
                  <input
                    type="text"
                    id="education"
                    name="entry.1479962737"
                    required
                    className="w-full rounded-sm border-3 border-main/40 bg-[#F8FAFF] px-3 py-2 outline-none font-normal focus:border-main/60 focus:shadow-[0_0_8px_rgba(35,66,133,0.7)] transition"
                  />
                </div>

                <div className="mb-8">
                  <label htmlFor="rate" className="block font-bold mb-2">
                    Rate your experience in superconducting quick design{" "}
                    <span className="font-normal">(required)</span>
                  </label>
                  <input
                    type="text"
                    id="rate"
                    name="entry.1775678834"
                    required
                    className="w-full rounded-sm border-3 border-main/40 bg-[#F8FAFF] px-3 py-2 outline-none font-normal focus:border-main/60 focus:shadow-[0_0_8px_rgba(35,66,133,0.7)] transition"
                  />
                </div>

                <div className="mb-8">
                  <label htmlFor="institution-name" className="block text-main font-bold mb-1">
                    Institution Name
                  </label>
                  <p className="text-main font-normal mb-2">
                    The most recent institution you attended
                  </p>
                  <input
                    type="text"
                    id="institution-name"
                    name="entry.878372702"
                    className="w-full rounded-sm bg-[#F8FAFF] border-3 border-main/40 px-3 py-2 outline-none font-normal focus:border-main/60 focus:shadow-[0_0_8px_rgba(35,66,133,0.7)] transition"
                  />
                </div>

                <div className="mt-16 flex justify-center">
                  <button type="submit" className="rounded-sm px-12 py-3 bg-main text-white">
                    Register
                  </button>
                </div>
              </form>

              <iframe name="hidden_iframe" style={{ display: "none" }} onLoad={afterSubmit} />
            </>
          ) : (
            <div className="text-center text-main">
              <h3 className="text-3xl font-bold mb-2">Thanks for registering! 🎉</h3>
              <p className="text-lg font-normal">We’ve received your response.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
