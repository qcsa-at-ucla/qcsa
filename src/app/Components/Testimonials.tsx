const testimonials = [
  `wow i love qcsa this is a great club i want to get more involved`,
  `wow i love qcsa this is a great club i want to get more involved`,
  `wow i love qcsa this is a great club i want to get more involved`,
];

export default function Testimonials() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F3F8FF] flex-grow">
      <h2 className="text-4xl md:text-5xl font-bold text-[#234285] mb-12">
        Testimonials
      </h2>

      <div className="grid md:grid-cols-3 justify-items-center">
        {testimonials.map((quote, ind) => (
          <div key={ind} className="relative lg:w-full flex items-center justify-center text-center">
              {/* Aura Ring */}
              <img
                  src="/images/testimonials-aura.png"
                  alt="testimonials background"
                  className="w-full h-full object-contain z-0"
              />

              {/* Testimonial Box */}
              <div className="absolute">
                <blockquote className="text-black px-44 lg:px-28" >
                  <p className="mb-6 font-semibold ">
                    <strong>“</strong>{quote}<strong>”</strong>
                  </p>
                  {/*<p className="not-italic text-sm text-right pr-4">– Jane Doe</p>*/}
                </blockquote>
              </div>
            </div>
        ))}
      </div>
    </section>
  );
}
