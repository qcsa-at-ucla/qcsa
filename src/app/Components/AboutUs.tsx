"use client";
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function AboutUs() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Main About Us Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F3F8FF] flex-grow">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start w-full gap-8 lg:gap-16">
            {/* Text Content Section */}
            <motion.div 
              className="lg:w-6/12 lg:ml-8 w-full"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="space-y-8 text-left">
                <motion.h2 
                  className="text-4xl font-bold font-kantumruy text-[#234285] mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  About Us
                </motion.h2>
                
                <div className="space-y-4">
                  <motion.p 
                    className="text-normal leading-relaxed font-kantumruy text-[#234285]"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  >
                    The premier quantum science and technology organization at UCLA.
                    Host talks by professors, students, and other institutions. Undergrad 
                    and Grad organization under CQSE for everything under the umbrella 
                    of quantum information science, including quantum computers, 
                    sensors, and algorithms.
                  </motion.p>
                </div>
                
                {/* Learn More Button */}
                <motion.div 
                  className="pt-6"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <div className="flex justify-center">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link href="../about/" className="bg-[#234285] text-white px-8 py-4 text-2xl font-kantumruy font-bold transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform inline-block text-center rounded-sm">
                        Learn More
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Image Section */}
            <motion.div 
              className="lg:w-6/12 lg:mr-8 w-full"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="flex justify-center lg:justify-end">
                <motion.div 
                  className="w-full max-w-md lg:max-w-lg xl:max-w-xl relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src="/images/about-me-photo.png"
                    alt="QCSA Team Photo"
                    width={600}
                    height={480}
                    className="w-full h-auto object-cover rounded-lg shadow-lg"
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer with navigation to thank you page */}
      <motion.footer 
        className="bg-[#F3F8FF] border-t border-gray-200 py-8 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <div className="space-y-4">
            <motion.p 
              className="text-[#234285] text-2xl font-kantumruy"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Interested in our Quantum Device Workshop?
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="/thank-you-page"
                className="inline-block bg-[#234285] text-gray-100 px-8 py-4 text-2xl font-kantumruy rounded-lg hover:bg-[#234285]-500 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform"
              >
                View QDW 2026 & Registration
                <span className="ml-2">→</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
