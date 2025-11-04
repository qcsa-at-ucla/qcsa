"use client";
import React from 'react';
import Orb from './Orb';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <div className="relative min-h-screen overflow-hidden" style={{backgroundColor: '#F3F8FF'}}>
      {/* Event Announcement Banner */}
      <motion.div 
        className="relative z-20 w-full py-6 px-6" 
        style={{backgroundColor: 'rgba(35, 66, 133, 0.95)'}}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex flex-col items-center gap-3">
            <motion.div 
              className="text-sm font-kantumruy font-semibold tracking-wider uppercase" 
              style={{color: '#ADC8EF'}}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              November 10-12 (James West Alumni Center)
            </motion.div>
            <motion.h2 
              className="text-2xl md:text-3xl font-kantumruy font-bold" 
              style={{color: '#FFFFFF'}}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              QuARC - Quantum Architecture Conference
            </motion.h2>
            <motion.p 
              className="text-base md:text-lg font-kantumruy max-w-2xl" 
              style={{color: '#F3F8FF'}}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Explore a hands-on workshop on quantum compilation & transpilation in quantum computing architecture and connect with leading researchers, industry professionals, and UCLA Professors!
            </motion.p>
            <motion.a 
              href="https://quarc.squarespace.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-2 px-8 py-3 font-kantumruy font-semibold text-base rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{
                backgroundColor: '#F3F8FF',
                color: '#234285',
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More →
            </motion.a>
          </div>
        </div>
      </motion.div>

      {/* Orb Background */}
      <div className="absolute inset-0 z-0" style={{ width: '100%', height: '100%', position: 'relative' }}>
        <Orb
          hoverIntensity={0.5}
          rotateOnHover={true}
          hue={220}
          forceHoverState={false}
          // Make it dimmer
          
        />
      
      
      {/* Content */}
      <motion.div 
        className="relative z-10 flex items-center justify-center min-h-screen px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
      >
        <div className="text-center max-w-5xl mx-auto translate-y-5">
          {/* Main heading */}
          <motion.h1 
            className=" text-4xl font-kantumruy mb-8 font-bold leading-tight uppercase" 
            style={{color: '#234285'}}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
          >
            The Future is Quantum. Start building it at QCSA.
          </motion.h1>
          
          {/* Description */}
          <motion.p 
            className=" mb-12 max-w-2xl text-4xl mx-auto leading-tight font-kantumruy" 
            style={{color: '#234285'}}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
          >
            UCLA&apos;s hub for students, by students
          </motion.p>
        </div>
      </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;