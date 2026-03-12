

const testimonials = [
    `Excellent guidance and materials. 
    I will use this for self-paced learning going forward. 
    Thank you for making this possible!`,

    `I enjoyed every presenter. 
    The conference overall was very useful and informative.`, 

    `I really like QEC talks about the BB code by MIT, Chiplet Technology with Rigetti, 
    and how to teach quantum device/design.
    In general, the presentation guided us through the topic 
    and left us wondering with research questions.`

];

const stats = [
    { value: '37', label: 'Countries Represented'},
    { value: '103', label: 'In-Person Participants'},
    { value: '~300', label: 'Online Participants'}
];

export default function TestimonialsAndStats(){
    return (
        <section className='flex flex-col items-center text-center w-full py-8 sm:py-12 px-4 sm:px-6 lg:px-8'>
            <header>
                <h2 className='text-2xl sm:text-3xl md:text-4xl font-semibold my-8 sm:my-12 md:my-16 text-[#0078d4] max-w-4xl mx-auto leading-tight'>
                    What Our Participants Tell Us 
                </h2>
            </header>

            {/* Statistics Section */}
            <div className='grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-3 justify-items-center w-full max-w-6xl my-6 sm:my-8' role="region" aria-labelledby="statistics-heading">
                <h3 id="statistics-heading" className="sr-only">Workshop Statistics</h3>
                {stats.map((stat, ind) => (
                    <div key={ind} className='max-w-xl w-full p-4 bg-white rounded-lg shadow-sm border border-gray-100'>
                       <div className='text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[#0078d4] mb-2' aria-label={`${stat.value} ${stat.label}`}>
                           {stat.value}
                       </div>
                       <div className='text-lg sm:text-xl md:text-2xl text-[#234285] leading-relaxed'>
                           {stat.label}
                       </div>
                    </div>
                ))}
            </div>
            
            {/* Testimonials Section */}
            <div className='grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-center justify-items-center w-full max-w-7xl my-6 sm:my-8' role="region" aria-labelledby="testimonials-heading">
                <h3 id="testimonials-heading" className="sr-only">Participant Testimonials</h3>
                {testimonials.map((quote, ind) => (
                    <blockquote 
                        key={ind} 
                        className='max-w-xl w-full text-base sm:text-lg md:text-xl lg:text-2xl p-4 sm:p-6 bg-gray-50 rounded-lg border-l-4 border-[#0078d4] shadow-sm'
                        cite="Participant feedback"
                    >
                        <p className="text-[#234285] leading-relaxed italic">
                            &ldquo;{quote}&rdquo;
                        </p>
                        <footer className="mt-4">
                            <cite className="text-sm text-gray-600 not-italic">
                                Workshop Participant
                            </cite>
                        </footer>
                    </blockquote>
                ))}
            </div>

            <footer className="mt-12 sm:mt-16 md:mt-24">
                <h2 className='text-2xl sm:text-3xl md:text-4xl font-semibold text-[#0078d4] max-w-4xl mx-auto leading-tight'>
                    Join us at our next event!
                </h2>
                <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <a
                        href="https://qdc-qcsa.org"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#234285] hover:bg-blue-700 text-white font-kantumruy text-lg font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                    >
                        Visit QDC Website →
                    </a>
                </div>
            </footer>
        </section>
    );
}