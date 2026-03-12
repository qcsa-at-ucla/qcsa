export default function PageHead(){
    return (        
    <section className='text-center px-4 sm:px-6 lg:px-8' role="banner">          
            <div className='py-8 sm:py-12 md:py-16'>
                <h1 className='text-[#0078d4] font-kantumruy text-3xl sm:text-4xl md:text-6xl lg:text-8xl mb-4'>
                    Welcome to QDC 2026!
                </h1>
                <h2 className='text-[#ffc845] font-kantumruy text-2xl sm:text-3xl md:text-4xl lg:text-6xl'>
                    Thank you for your interest
                </h2>
            </div>         
            <div className='my-8 sm:my-12 md:my-16 flex flex-col items-center space-y-6 max-w-4xl mx-auto' >
                <p className='text-lg sm:text-xl md:text-2xl text-center font-kantumruy text-[#234285] leading-relaxed px-4'>
                    Discover the future of quantum computing with the Quantum Computing Student Association at UCLA.
                </p>
                <p className='text-lg sm:text-xl md:text-2xl text-center font-kantumruy text-[#234285] leading-relaxed px-4'>
                    Explore our new website for events, resources, and opportunities to join the quantum revolution!
                </p>
                
                {/* CTA Button to new website */}
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
    );
};