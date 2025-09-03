    "use client";

import Image from 'next/image';
import MainWebsiteFooter from "../Components/mainWebsiteFooter";

export default function GalleryPage() {
  const images = [
    '/images/gallery1.png',
    '/images/gallery2.png',
    '/images/gallery3.png',
    '/images/gallery4.png',
    '/images/gallery5.png',
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="text-center text-3xl sm:text-4xl font-semibold text-blue-900 mb-8 font-kantumruy text-[#234285]">Gallery</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Top row: three small images */}
          {images.slice(0, 3).map((src, i) => (
            <div key={i} className="overflow-hidden rounded-lg bg-white shadow-sm">
              <Image src={src} alt={`Gallery ${i + 1}`} width={800} height={600} className="w-full h-48 sm:h-44 md:h-56 object-cover" />
            </div>
          ))}

          {/* Bottom row: two larger images — gallery4 spans two columns on small+ screens */}
          <div className="overflow-hidden rounded-lg bg-white shadow-sm sm:col-span-2">
            <Image src={images[3]} alt="Gallery 4" width={1600} height={900} className="w-full h-64 md:h-80 object-cover" />
          </div>

          <div className="overflow-hidden rounded-lg bg-white shadow-sm">
            <Image src={images[4]} alt="Gallery 5" width={800} height={600} className="w-full h-64 md:h-80 object-cover" />
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button className="bg-blue-800 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-900 font-kantumruy text-lg">Show All</button>
        </div>
      </main>

      <MainWebsiteFooter />
    </div>
  );
}
