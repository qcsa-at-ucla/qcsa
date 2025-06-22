import InfiniteCarousel from './InfiniteCarousel'

export default function BetweenPage() {
  return (
    <div className="flex flex-col items-center justify-center p-4 sm:p-6 lg:py-24">
      <h2 className="text-[#0078d4] text-4xl sm:text-3xl md:text-4xl font-semibold mb-4 sm:mb-6 md:mb-8 text-center">Our Sponsors</h2>
      <InfiniteCarousel />
    </div>
  );
}
