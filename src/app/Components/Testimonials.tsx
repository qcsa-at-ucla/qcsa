"use client";
import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: `QCSA has a lot of great career and networking opportunities.`,
    author: `Kimberly Wu`,
  },
  {
    quote: `QCSA has helped me make connections beyond UCLA.`,
    author: `Gina Namkung`,
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F3F8FF] flex-grow">
      <div className='w-full max-w-xs sm:max-w-sm md:max-w-4xl lg:max-w-5xl xl:max-w-7xl mx-auto'>
      <motion.h2 
        className="text-4xl font-bold font-kantumruy text-[#234285] mb-12 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        Testimonials
      </motion.h2>

      <div className="grid md:grid-cols-3 justify-items-center">
        {testimonials.map((item, ind) => (
          <motion.div 
            key={ind} 
            className="relative w-full flex items-center justify-center text-center"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
              delay: ind * 0.2, 
              duration: 0.6,
              type: "spring",
              stiffness: 100
            }}
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.3 }
            }}
          >
              {/* Aura Ring */}
              <motion.img
                  src="/images/ring.png"
                  alt="testimonials background"
                  className="sm:w-100 sm:h-100 md:w-full md:h-full object-contain z-0"
                  initial={{ rotate: 0 }}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />

              {/* Testimonial Box */}
              <motion.div 
                className="absolute"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: ind * 0.2 + 0.3, duration: 0.6 }}
              >
                <blockquote className="text-black translate-y-4 px-24 lg:px-26 md:px-16" >
                  <p className="mb-6 font-semibold text-base">
                    <strong>“</strong>{item.quote}<strong>”</strong>
                  </p>
                  {/*<p className="not-italic text-sm text-right pr-4">– Jane Doe</p>*/}
                </blockquote>
              </motion.div>
            </motion.div>
        ))}
      </div>
      </div>
    </section>
  );
}
