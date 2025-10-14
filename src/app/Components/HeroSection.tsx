"use client";
import React from 'react';
import Orb from './Orb';

const HeroSection = () => {
  return (
    <div className="relative min-h-screen overflow-hidden" style={{backgroundColor: '#F3F8FF'}}>
      {/* Event Announcement Banner */}
      <div className="relative z-20 w-full py-6 px-6" style={{backgroundColor: 'rgba(35, 66, 133, 0.95)'}}>
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex flex-col items-center gap-3">
            <div className="text-sm font-kantumruy font-semibold tracking-wider uppercase" style={{color: '#ADC8EF'}}>
              This Weekend • October 18-19
            </div>
            <h2 className="text-2xl md:text-3xl font-kantumruy font-bold" style={{color: '#FFFFFF'}}>
              Join us for Qiskit Fall Fest 2025
            </h2>
            <p className="text-base md:text-lg font-kantumruy max-w-2xl" style={{color: '#F3F8FF'}}>
              Two days of quantum computing workshops, hackathon challenges, and networking with an IBM speaker. 
              Build your quantum project and connect with the community!
            </p>
            <a 
              href="https://qiskit-fall-fest-ucla.vercel.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-2 px-8 py-3 font-kantumruy font-semibold text-base rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{
                backgroundColor: '#F3F8FF',
                color: '#234285',
              }}
            >
              Learn More & Register →
            </a>
          </div>
        </div>
      </div>

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
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <div className="text-center max-w-5xl mx-auto translate-y-5">
          {/* Main heading */}
          <h1 className=" text-4xl font-kantumruy mb-8 font-bold leading-tight uppercase" style={{color: '#234285'}}>
            The Future is Quantum. Start building it at QCSA.
          </h1>
          
          {/* Description */}
          <p className=" mb-12 max-w-2xl text-4xl mx-auto leading-tight font-kantumruy" style={{color: '#234285'}}>
            UCLA&apos;s hub for students, by students
          </p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default HeroSection;