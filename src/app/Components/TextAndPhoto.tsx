import Link from 'next/link';

interface TextAndPhotoProps {
  title: string;
  description: string;
  buttonText?: string;
  buttonLink?: string;
  imageSrc?: string;
  imageAlt?: string;
}

export default function TextAndPhoto({
  title,
  description,
  buttonText,
  buttonLink,
  imageSrc,
  imageAlt = '',
}: TextAndPhotoProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F3F8FF] flex-grow">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: Text content*/}
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold text-[#234285] mb-6">
                {title}
              </h2>

              <div className="space-y-4">
                <p className="text-lg md:text-xl text-[#234285] leading-relaxed font-[Kantumruy]">
                  {description}
                </p>
              </div>

              {/* Button — render nothing unless both props exist */}
              {buttonText && buttonLink && (
                <div className="pt-6">
                  <div className="flex justify-center">
                    <Link href={buttonLink}>
                      <button className="bg-[#234285] text-white px-8 py-4 text-lg font-[Kantumruy] hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform">
                        {buttonText}
                      </button>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-xl border-2 border-gray-300 flex items-center justify-center">
                {imageSrc ? (
                  <img
                    src={imageSrc}
                    alt={imageAlt}
                    className="w-full h-auto object-cover"
                  />
                ) : (
                  // Optional placeholder to keep exact layout when no imageSrc
                  <div className="w-full h-[320px] bg-gray-200 flex items-center justify-center text-gray-500">
                    <p className="text-xl font-medium">image</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
