const testimonials = [
  {
    quote: `QCSA has taught me so much about the quantum field!`,
    author: `Harshita Kukreja`,
  },
  {
    quote: `QCSA has a lot of great career and networking opportunities.`,
    author: `Kimberly Wu`,
  },
  {
    quote: `QCSA has helped me make connections beyond UCLA.`,
    author: `Gina Namkung`,
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F3F8FF] flex-grow">
      <div className='w-full max-w-xs sm:max-w-sm md:max-w-4xl lg:max-w-5xl xl:max-w-7xl mx-auto'>
      <h2 className="text-4xl md:text-5xl font-bold text-[#234285] mb-12 text-center">
        Testimonials
      </h2>

      <div className="grid md:grid-cols-3 justify-items-center">
        {testimonials.map((item, ind) => (
          <div key={ind} className="relative w-full flex items-center justify-center text-center">
              {/* Aura Ring */}
              <img
                  src="/images/testimonials-aura.png"
                  alt="testimonials background"
                  className="sm:w-100 sm:h-100 md:w-full md:h-full object-contain z-0"
              />

              {/* Testimonial Box */}
              <div className="absolute">
                <blockquote className="text-black translate-y-4 px-24 lg:px-26 md:px-16" >
                  <p className="mb-6 font-semibold ">
                    <strong>“</strong>{item.quote}<strong>”</strong>
                  </p>
                  {/*<p className="not-italic text-sm text-right pr-4">– Jane Doe</p>*/}
                </blockquote>
              </div>
            </div>
        ))}
      </div>
      </div>
    </section>
  );
}
