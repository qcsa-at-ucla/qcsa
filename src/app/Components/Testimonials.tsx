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

      <div className="grid gap-12 sm:grid-cols-3 justify-items-center">
        {testimonials.map((quote, ind) => (
          <div key={ind} className="relative max-w-xs w-full flex items-center justify-center text-center">
            {/* Aura Ring */}
            <div
              className="absolute inset-0 z-0 rounded-full pointer-events-none"
              style={{
                
                background: `
                  radial-gradient(
                    circle,
                    transparent 50%, 
                    rgba(173, 200, 239, .8) 55%,
                    transparent 70% 
                  )

                `,
                filter: "blur(15px)", 
              }}

            ></div>

            {/* Testimonial Box */}
            <div className="relative z-10 p-20">
              <blockquote className="text-black">
                <p className="mb-6 font-bold">
                  <strong>“</strong>{quote}<strong>”</strong>
                </p>
                <p className="not-italic text-sm text-right pr-4">– Jane Doe</p>
              </blockquote>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
