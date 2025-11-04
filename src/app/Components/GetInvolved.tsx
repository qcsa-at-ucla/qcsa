"use client";
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function GetInvolved() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F3F8FF] flex-grow">
      <motion.h2 
        className="text-4xl font-bold text-[#234285] text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        JOIN THE MOVEMENT.
      </motion.h2>
      <motion.h2 
        className="text-2xl lg:text-4xl text-[#234285] font-normal text-center mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        UCLA&apos;s quantum future begins
      </motion.h2>
      <motion.h2 
        className="text-2xl lg:text-4xl text-[#234285] font-normal text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        with you---one qubit at a time.
      </motion.h2>
      <div className="flex justify-center items-center">
        <motion.div 
          className="relative w-[600px] h-[600px] group"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8, type: "spring", stiffness: 100 }}
        >
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src="/images/button-aura.png"
              alt=""
              fill
              className="z-0 object-contain transition-transform duration-300 group-hover:scale-105"
              role="presentation"
            />
          </motion.div>
          {/* <motion.div */}
            {/* whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }} */}
          {/* > */}
            <Link
              href="/join-us"
              className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-[#234285] -translate-y-6 z-30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg transition-transform duration-300 group-hover:scale-110"
            >
              GET INVOLVED
            </Link>
          {/* </motion.div> */}
        </motion.div>
      </div>
    </section>
  );
}
