import InfiniteCarousel from './InfiniteCarousel'

export default function BetweenPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 lg:p-8">
      <h2 className="text-blue-600 text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 md:mb-8 text-center">Our Sponsors</h2>
      <InfiniteCarousel />
    </div>
  );
}
