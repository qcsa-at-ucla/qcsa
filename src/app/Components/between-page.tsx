import InfiniteCarousel from './InfiniteCarousel'

export default function BetweenPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h2 className="text-blue-600 text-4xl font-bold mb-8">Our Sponsors</h2>
      <InfiniteCarousel />
    </div>
  );
}
