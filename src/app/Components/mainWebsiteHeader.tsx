"use client";

import Link from 'next/link';
import Image from 'next/image';

export default function MainWebsiteHeader() {
  return (
    <header className="bg-gradient-to-b from-blue-200 to-blue-100 py-4 px-4 sm:px-6 lg:px-8 shadow-sm">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          
          {/* Left side - QCSA Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <div className="w-32 h-20">
                <Image
                  src= {'/images/Final_QCSA_Logo-13.png'}
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
              className="text-gray-700 hover:text-[#234285] transition-colors"
              aria-label="Open menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

        </div>

        {/* Mobile Navigation (you can add state management to show/hide this) */}
        <nav className="md:hidden mt-4 pb-4 border-t border-blue-300 pt-4 hidden">
          <div className="flex flex-col space-y-3">
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
              className="bg-[#234285] text-white px-6 py-2 rounded-md font-semibold text-lg hover:bg-blue-700 transition-colors duration-200 shadow-md inline-block text-center"
            >
              Join us
            </Link>
          </div>
        </nav>

      </div>
    </header>
  );
}