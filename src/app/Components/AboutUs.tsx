import Link from 'next/link';
import Image from 'next/image';

export default function AboutUs() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Main About Us Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F3F8FF] flex-grow">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start w-full gap-8 lg:gap-16">
            {/* Text Content Section */}
            <div className="lg:w-6/12 lg:ml-8 w-full">
              <div className="space-y-8 text-left">
                <h2 className="text-4xl md:text-5xl font-bold font-kantumruy text-[#234285] mb-6">
                  About Us
                </h2>
                
                <div className="space-y-4">
                  <p className="text-lg md:text-xl leading-relaxed font-kantumruy text-[#234285]">
                    The premier quantum science and technology organization at UCLA.
                    Host talks by professors, students, and other institutions. Undergrad 
                    and Grad organization under CQSE for everything under the umbrella 
                    of quantum information science, including quantum computers, 
                    sensors, and algorithms.
                  </p>
                </div>
                
                {/* Learn More Button */}
                <div className="pt-6">
                  <div className="flex justify-center">
                    <button className="bg-[#234285] text-white px-8 py-4 text-lg font-kantumruy hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform">
                      <Link href="../about/">
                        Learn More
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Image Section */}
            <div className="lg:w-6/12 lg:mr-8 w-full">
              <div className="flex justify-center lg:justify-end">
                <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl relative">
                  <Image
                    src="/images/about-me-photo.png"
                    alt="QCSA Team Photo"
                    width={600}
                    height={480}
                    className="w-full h-auto object-cover rounded-lg shadow-lg"
                  />
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
            <p className="text-[#234285] text-lg font-kantumruy">
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
