/* eslint-disable @next/next/no-img-element */
interface TextAndPhotoProps {
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
}

export default function TextAndPhoto({
  title,
  description,
  imageSrc,
  imageAlt = '',
}: TextAndPhotoProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F3F8FF] flex-grow">
        <div className='mx-auto max-w-6xl'>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center xl:gap-32">
            <div className="flex justify-center lg:justify-end">

            {/* LEFT: aura + text */}
            <div className="relative w-full max-w-[515px] aspect-[515/439]">
              {/* Aura */}
              <img
                src="/images/aura.png"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-contain opacity-20 pointer-events-none select-none scale-[1.35] translate-y-6 translate-x-1"
              />
              {/* Text */}
              <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-4 px-4 translate-y-30">
                <h2 className="relative -top-4 text-[36px] font-bold text-[#234285]">{title}</h2>
                <p className="text-base text-[#234285] leading-relaxed font-[Kantumruy] px-12">
                  {description}
                </p>
              </div>
            </div>
            </div>

            {/* RIGHT: image */}
            <div className="flex justify-center lg:justify-start self-center">
              <div className="w-full max-w-[515px] aspect-[515/439]">
                <div className="w-full aspect-[515/439]">
                  <img
                    src={imageSrc}
                    alt={imageAlt}
                    className="w-full h-full object-cover shadow-[0_0_30px_#ADC8EF]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
