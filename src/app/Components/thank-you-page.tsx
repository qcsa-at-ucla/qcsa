'use client';

import Link from 'next/link';

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <section className='text-center px-4 sm:px-6 lg:px-8' role="banner">
          <div className='py-8 sm:py-12 md:py-16'>
            <h1 className='text-[#0078d4] font-kantumruy text-3xl sm:text-4xl md:text-6xl lg:text-8xl mb-4'>
              Welcome to QDC 2026!
            </h1>
            <h2 className='text-[#ffc845] font-kantumruy text-2xl sm:text-3xl md:text-4xl lg:text-6xl'>
              Thank you for your interest
            </h2>
          </div>
          <div className='my-8 sm:my-12 md:my-16 flex flex-col items-center space-y-6 max-w-4xl mx-auto'>
            <p className='text-lg sm:text-xl md:text-2xl text-center font-kantumruy text-[#234285] leading-relaxed px-4'>
              Discover the future of quantum computing with the Quantum Computing Student Association at UCLA.
            </p>
            <p className='text-lg sm:text-xl md:text-2xl text-center font-kantumruy text-[#234285] leading-relaxed px-4'>
              Explore our new website for events, resources, and opportunities to join the quantum revolution!
            </p>

            <div className="mt-8">
              <a
                href="https://qdc-qcsa.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#234285] hover:bg-blue-700 text-white font-kantumruy text-xl font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                Visit Our New Website
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        <section className="text-center mb-12">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://qdc-qcsa.org"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#234285] hover:bg-blue-700 text-white font-kantumruy text-lg font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Visit QDC Website
            </a>
            <Link
              href="/join-us"
              className="bg-white border-2 border-[#234285] text-[#234285] hover:bg-[#234285] hover:text-white font-kantumruy text-lg font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Join QCSA
            </Link>
            <Link
              href="/events"
              className="bg-[#ffc845] hover:bg-yellow-500 text-[#234285] font-kantumruy text-lg font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              View Events
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

