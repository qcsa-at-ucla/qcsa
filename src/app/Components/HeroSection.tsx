"use client";
import React from 'react';
import dynamic from 'next/dynamic';

const Orb = dynamic(() => import('./Orb'), { ssr: false });

const HeroSection = () => {
  const [showOrb, setShowOrb] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia(
      '(min-width: 768px) and (hover: hover) and (prefers-reduced-motion: no-preference)'
    );
    const updateOrbVisibility = () => setShowOrb(mediaQuery.matches);

    updateOrbVisibility();
    mediaQuery.addEventListener('change', updateOrbVisibility);
    return () => mediaQuery.removeEventListener('change', updateOrbVisibility);
  }, []);

  return (
    <div className="relative min-h-screen" style={{backgroundColor: '#F3F8FF'}}>
      {/* Event Announcement Banner */}
      {/* <Link href="/qcf" className="block">
        <motion.div 
          className="relative z-20 w-full py-6 px-6 cursor-pointer" 
          style={{backgroundColor: 'rgba(35, 66, 133, 0.95)'}}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          whileHover={{ backgroundColor: 'rgba(35, 66, 133, 1)', scale: 1.01 }}
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
                February 20th, 1-5 PM
              </motion.div>
              <motion.h2 
                className="text-2xl md:text-3xl font-kantumruy font-bold" 
                style={{color: '#FFFFFF'}}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Quantum Career Fair
              </motion.h2>
              <motion.p 
                className="text-base md:text-lg font-kantumruy max-w-2xl" 
                style={{color: '#F3F8FF'}}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                Multiple quantum companies will be there so stay tuned!!!
              </motion.p>
            </div>
          </div>
        </motion.div>
      </Link> */}

      {/* Orb Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {showOrb && (
          <Orb
            hoverIntensity={0.5}
            rotateOnHover={true}
            hue={220}
            forceHoverState={false}
          />
        )}
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <div className="text-center max-w-5xl mx-auto translate-y-5">
          {/* Main heading */}
          <h1
            className=" text-4xl font-kantumruy mb-8 font-bold leading-tight uppercase" 
            style={{color: '#234285'}}
          >
            The Future is Quantum. Start building it at QCSA.
          </h1>
          
          {/* Description */}
          <p
            className=" mb-12 max-w-2xl text-4xl mx-auto leading-tight font-kantumruy" 
            style={{color: '#234285'}}
          >
            UCLA&apos;s hub for students, by students
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;