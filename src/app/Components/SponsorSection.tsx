"use client";

import CurrentSponsors from './CurrentSponsors';
import { motion } from 'framer-motion';

interface Sponsor {
  name: string;
  logo: string;
  url: string;
}

interface SponsorSectionProps {
  title?: string;
  direction?: 'left' | 'right';
  sponsors?: Sponsor[];
}

export default function SponsorSection({ 
  title = "Our Sponsors",
  direction = "left",
  sponsors
}: SponsorSectionProps) {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center p-2 sm:p-4 lg:py-12"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2 
        className="font-kantumruy text-[#234285] text-4xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 md:mb-8 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {title}
      </motion.h2>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <CurrentSponsors direction={direction} sponsors={sponsors} />
      </motion.div>
    </motion.div>
  );
}
