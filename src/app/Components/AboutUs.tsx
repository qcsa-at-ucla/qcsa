import Link from 'next/link';

export default function AboutUs() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Main About Us Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F3F8FF] flex-grow">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left side - Text content */}
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold text-[#234285] mb-6">
                About Us
              </h2>
              
              <div className="space-y-4">
                
                <p className="text-lg md:text-xl text-[#234285] leading-relaxed font-[Kantumruy]">
                  The premier quantum science and technology organization at UCLA.
                  Host talks by professors, students, and other institutions. Undergrad 
                  and Grad organization under CQSE for everything under the umbrella 
                  of quantum information science, including quantum computers, 
                  sensors, and algorithms.
                </p>
              </div>
              
              {/* Learn More Button */}
              <div className="pt-6">
                {/* Make learn more button center*/}
                <div className="flex justify-center">
                  <button className="bg-[#234285] text-white px-8 py-4 text-lg font-[Kantumruy] hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform">
                    <Link
                      href="../about/"
                    >
                      Learn More
                    </Link>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Right side - Team photo placeholder */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-xl h-130 bg-gray-200 flex items-center justify-center border-2 border-gray-300">
                <div className="text-center text-gray-500">
                  <p className="text-xl font-medium">team photo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer with navigation to thank you page */}
      <footer className="bg-[#F3F8FF] border-t border-gray-200 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="space-y-4">
            <p className="text-gray-600 text-lg">
              Interested in our Quantum Device Workshop?
            </p>
            <Link 
              href="/thank-you-page"
              className="inline-block bg-[#ffc845] text-gray-900 px-8 py-4 text-lg font-semibold rounded-lg hover:bg-yellow-500 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform"
            >
              View QDW2026 & Registration
              <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
