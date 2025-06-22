"use client";

import React, { useState, useEffect } from 'react';

const InfiniteCarousel = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const sponsors = [
    { name: 'Google', logo: '/images/google-logo.png', url: 'https://about.google/' },
    { name: 'Nvidia', logo: '/images/nvidia-logo.png', url: 'https://nvidia.com' },
    { name: 'Rigetti', logo: '/images/rigetti-logo.png', url: 'https://rigetti.com' },
    { name: 'Keysight', logo: '/images/keysight-logo.png', url: 'https://keysight.com' },
    { name: 'Zurich Instruments', logo: '/images/zurich-logo.png', url: 'https://zhinst.com' },
    { name: 'Unitary Foundation', logo: '/images/unitary-logo.png', url: 'https://unitary.fund' },
    { name: 'Quantum Machines', logo: '/images/quantum-machines-logo.png', url: 'https://quantum-machines.co' },
  ];

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const handleKeyDown = (e: React.KeyboardEvent, sponsor: { name: string; logo: string; url: string }) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      window.open(sponsor.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <>
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        
        .animate-scroll.paused {
          animation-play-state: paused;
        }
        
        /* Respect reduced motion preference */
        @media (prefers-reduced-motion: reduce) {
          .animate-scroll {
            animation: none !important;
          }
        }
        
        /* Screen reader only content */
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
      `}</style>
      
      <section className="w-full py-8 bg-gray-50" aria-label="Sponsor carousel">
        <div className="max-w-7xl mx-auto px-4">
          {/* Control buttons for accessibility */}
          <div className="flex justify-center items-center mb-8">
            <button
              onClick={togglePause}
              className="px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 lg:px-6 lg:py-3 bg-blue-800 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors text-sm sm:text-base flex-shrink-0"
              aria-label={isPaused ? 'Resume sponsor carousel animation' : 'Pause sponsor carousel animation'}
            >
              {isPaused ? 'Resume' : 'Pause'} Animation
            </button>
          </div>
          
          <div 
            className="relative overflow-hidden"
            role="region"
            aria-label="Scrolling sponsor logos"
            aria-live="polite"
          >
            {/* Gradient overlays - hidden from screen readers */}
            <div className="absolute left-0 top-0 w-16 sm:w-24 md:w-32 h-full bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" aria-hidden="true"></div>
            <div className="absolute right-0 top-0 w-16 sm:w-24 md:w-32 h-full bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" aria-hidden="true"></div>
            
            {/* Scrolling container */}
            <div 
              className={`flex ${!reducedMotion ? 'animate-scroll' : ''} ${isPaused ? 'paused' : ''}`}
              onMouseEnter={() => !reducedMotion && setIsPaused(true)}
              onMouseLeave={() => !reducedMotion && setIsPaused(false)}
            >
              {/* First set of logos */}
              {sponsors.map((sponsor, index) => (
                <a
                  key={`first-${index}`}
                  href={sponsor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 mx-4 sm:mx-6 md:mx-8 flex items-center justify-center h-20 w-32 sm:h-24 sm:w-36 md:h-28 md:w-44 lg:h-40 lg:w-60 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  onKeyDown={(e) => handleKeyDown(e, sponsor)}
                  aria-label={`Visit ${sponsor.name} website`}
                  tabIndex={0}
                >
                  <img
                    src={sponsor.logo}
                    alt={`${sponsor.name} logo`}
                    className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 focus:grayscale-0 transition-all duration-300"
                    loading="lazy"
                  />
                </a>
              ))}
              
              {/* Duplicate set for seamless loop - hidden from screen readers and keyboard navigation */}
              {sponsors.map((sponsor, index) => (
                <a
                  key={`second-${index}`}
                  href={sponsor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 mx-4 sm:mx-6 md:mx-8 flex items-center justify-center h-20 w-32 sm:h-24 sm:w-36 md:h-28 md:w-44 lg:h-40 lg:w-60 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer hover:scale-105"
                  aria-hidden="true"
                  tabIndex={-1}
                >
                  <img
                    src={sponsor.logo}
                    alt=""
                    className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
                    loading="lazy"
                  />
                </a>
              ))}
            </div>
          </div>
          
          {/* Screen reader friendly list */}
          <div className="sr-only">
            <h3>Complete list of sponsors:</h3>
            <ul>
              {sponsors.map((sponsor, index) => (
                <li key={index}>
                  <a href={sponsor.url} target="_blank" rel="noopener noreferrer">
                    {sponsor.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default InfiniteCarousel;