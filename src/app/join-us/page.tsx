"use client";

import MainWebsiteFooter from "../Components/mainWebsiteFooter";
import MainWebsiteHeader from "../Components/mainWebsiteHeader";
import MembershipForm from "../Components/MembershipForm";
import TextAndPhoto from "../Components/TextAndPhoto";
import { motion } from "framer-motion";

export default function JoinUs() {
  return (
    <div>
      <MainWebsiteHeader />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <TextAndPhoto
          title="Join Us"
          description="Sign up and become a QCSA Member today! Get invited to our upcoming events, stay posted for career opportunities and keep up to date with the quantum community in and around Los Angeles! There is no membership fee or application process required to join."
          imageSrc="/images/join-us.png"
          imageAlt="join us img"
        />
      </motion.div>

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="py-12 px-4 sm:px-6 lg:px-8 bg-background"
      >
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-xl lg:max-w-4xl xl:max-w-5xl mx-auto">
          <h2 className="text-[36px] font-bold text-[#234285] font-kantumruy text-center mb-4">
            Get Involved
          </h2>

          <p className="text-center text-lg text-[#234285] mb-8">
            Looking to get more involved with QCSA? Apply to join our team or
            participate in our research initiatives.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-2 border-[#234285]/30 rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold text-[#234285] mb-3">
                Join Our Team
              </h3>

              <p className="text-[#234285] mb-6 font-normal">
                Interested in helping build and grow QCSA? Apply to join our
                team.
              </p>

              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfv9lD1gKjB1SZ1e9QkOuDPhVIg2uV4ruWyjmdA44wezIQ29g/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-sm px-8 py-3 text-white font-bold transition hover:opacity-90"
                style={{ backgroundColor: "#234285" }}
              >
                Apply to QCSA
              </a>
            </div>

            <div className="border-2 border-[#234285]/30 rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold text-[#234285] mb-3">
                Research Opportunities
              </h3>

              <p className="text-[#234285] mb-6 font-normal">
                Interested in quantum research? Apply to participate in QCSA
                research projects and initiatives.
              </p>

              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLScewksg4mjjHA8NLuOaBv-u3xQng1iCGpo7Y_rkotIeRBOa-Q/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-sm px-8 py-3 text-white font-bold transition hover:opacity-90"
                style={{ backgroundColor: "#234285" }}
              >
                Apply for Research
              </a>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <MembershipForm />
      </motion.div>

      <MainWebsiteFooter />
    </div>
  );
}