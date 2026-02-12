"use client";

import React from 'react';

interface Sponsor {
  name: string;
  logo: string;
  url: string;
}

interface CurrentSponsorsProps {
  sponsors?: Sponsor[];
  title?: string;
}

const CurrentSponsors = ({ 
  sponsors: customSponsors,
  title = "Our Sponsors"
}: CurrentSponsorsProps) => {
  // Default sponsors - can be overridden via props
  const defaultSponsors: Sponsor[] = [
    // Add your current sponsors here
    // Example:
    // { name: 'Company Name', logo: '/images/company-logo.png', url: 'https://company.com' },
  ];

  const sponsors = customSponsors || defaultSponsors;

  const handleKeyDown = (e: React.KeyboardEvent, sponsor: Sponsor) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      window.open(sponsor.url, '_blank', 'noopener,noreferrer');
    }
  };

  // Don't render if no sponsors
  if (sponsors.length === 0) {
    return null;
  }

  return (
    <section className="w-full max-w-full py-8" style={{ backgroundColor: '#F3F8FF' }} aria-label="Sponsor logos" >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center justify-items-center"
          role="region"
          aria-label="Sponsor logos"
        >
          {sponsors.map((sponsor, index) => (
            <a
              key={index}
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full min-h-[120px] sm:min-h-[140px] md:min-h-[160px] lg:min-h-[180px] bg-white rounded-lg transition-all duration-300 cursor-pointer hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 p-3 sm:p-4 md:p-6"
              style={{
                boxShadow: '0 10px 15px -3px rgba(51, 102, 255, 0.1), 0 4px 6px -2px rgba(51, 102, 255, 0.05)',
                maxWidth: '100%',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(51, 102, 255, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(51, 102, 255, 0.1), 0 4px 6px -2px rgba(51, 102, 255, 0.05)';
              }}
              onKeyDown={(e) => handleKeyDown(e, sponsor)}
              aria-label={`Visit ${sponsor.name} website`}
              tabIndex={0}
            >
              <img
                src={sponsor.logo}
                alt={`${sponsor.name} logo`}
                className="w-full h-full object-contain transition-all duration-300"
                loading="lazy"
              />
            </a>
          ))}
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
  );
};

export default CurrentSponsors;
