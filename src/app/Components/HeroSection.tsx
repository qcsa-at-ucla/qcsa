"use client";
import React from 'react';
import Orb from './Orb';

const HeroSection = () => {
  return (
    <div className="relative min-h-screen overflow-hidden" style={{backgroundColor: '#F3F8FF'}}>
      {/* Orb Background */}
      <div className="absolute inset-0 z-0" style={{ width: '100%', height: '100%', position: 'relative' }}>
        <Orb
          hoverIntensity={0.5}
          rotateOnHover={true}
          hue={220}
          forceHoverState={false}
        />
      
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight" style={{color: '#234285'}}>
            The Future is Quantum. Start building it at QCSA.
          </h1>
          
          {/* Description */}
          <p className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed" style={{color: '#234285'}}>
            UCLA&apos;s hub for students, by students
          </p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default HeroSection;