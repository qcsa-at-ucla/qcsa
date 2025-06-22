import React from 'react';

const Footer = () => {  return (
    <footer className="bg-white text-black py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent flex-1 max-w-xs"></div>
            <div className="px-4">
              <svg className="w-6 h-6" fill="#E91E63" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>           
             <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent flex-1 max-w-xs"></div>
          </div>
          
          <p className="text-lg md:text-xl font-medium text-gray-800 leading-relaxed">
            Made with{' '}
            <span className="font-semibold" style={{ color: '#E91E63' }}>love</span>{' '}
            by{' '}
            <span className="text-gray-800 font-semibold">Clyde Villacrusis</span>,{' '}
            <span className="text-gray-800 font-semibold">Harshita Kukreja</span>, and{' '}
            <span className="text-gray-800 font-semibold">Emma Zhang</span>;
            <br className="hidden sm:block" />
            <span className="sm:inline block mt-1">
              along with the{' '}
              <span className="text-gray-800 font-bold">QCSA Team</span>
            </span>
          </p>
            <div className="mt-6 pt-4 border-t border-gray-300">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} QCSA. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
