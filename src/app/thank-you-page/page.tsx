"use client";

import { motion } from "framer-motion";
import TestimonialsAndStats from "../Components/TestimonialsAndStats";
import PageHead from "../Components/PageHead";
import ThankYouPage from "../Components/thank-you-page";
import Footer from "../Components/mainWebsiteFooter";
import Header from "../Components/mainWebsiteHeader";

export default function ThankYouPageRoute() {
  return (
    <div>
      <Header />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <PageHead />
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <ThankYouPage />
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <TestimonialsAndStats />
      </motion.div>
      <Footer />
    </div>
  );
}
