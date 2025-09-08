
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function MainWebsiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-gradient-to-b from-blue-200 to-blue-100 py-4 px-4 sm:px-6 lg:px-8 shadow-sm">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          
          {/* Left side - QCSA Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <div className="w-32 h-20 flex items-center justify-center">
                <Image
                  src= {'/images/Final_QCSA_Logo-15.png'}
                  alt="QCSA Logo"
                  width={128}
                  height={40}
                  className="object-contain"
                  onError={(e) => { e.currentTarget.src = '/images/placeholder-logo.jpg'; }}
                />
              </div>
            </Link>
          </div>

          {/* Center/Right - Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/events" 
              className="text-gray-700 hover:text-[#234285] font-medium text-lg transition-colors duration-200"
            >
              Events
            </Link>
            <Link 
              href="/about" 
              className="text-gray-700 hover:text-[#234285] font-medium text-lg transition-colors duration-200"
            >
              About
            </Link>
            <Link 
              href="/resources" 
              className="text-gray-700 hover:text-[#234285] font-medium text-lg transition-colors duration-200"
            >
              Resources
            </Link>
            <Link 
              href="/join" 
              className="bg-[#234285] text-white px-6 py-2 rounded-md font-semibold text-lg hover:bg-blue-700 transition-colors duration-200 shadow-md"
            >
              Join us
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-[#234285] transition-colors p-2"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                // X icon when menu is open
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // Hamburger icon when menu is closed
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Dropdown */}
        <nav className={`md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen 
            ? 'max-h-96 opacity-100 mt-4 pb-4' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="border-t border-blue-300 pt-4">
            <div className="flex flex-col space-y-3">
              <Link 
                href="/events" 
                className="text-gray-700 hover:text-[#234285] font-medium text-lg transition-colors duration-200 py-2 px-2 hover:bg-blue-50 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Events
              </Link>
              <Link 
                href="/about" 
                className="text-gray-700 hover:text-[#234285] font-medium text-lg transition-colors duration-200 py-2 px-2 hover:bg-blue-50 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/resources" 
                className="text-gray-700 hover:text-[#234285] font-medium text-lg transition-colors duration-200 py-2 px-2 hover:bg-blue-50 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Resources
              </Link>
              <Link 
                href="/join" 
                className="bg-[#234285] text-white px-6 py-3 rounded-md font-semibold text-lg hover:bg-blue-700 transition-colors duration-200 shadow-md inline-block text-center mt-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Join us
              </Link>
            </div>
          </div>
        </nav>

      </div>
    </header>
  );
}