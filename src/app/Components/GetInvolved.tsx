
import Image from 'next/image';

export default function GetInvolved() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F3F8FF] flex-grow">
        <h2 className="text-4xl font-bold text-[#234285] text-center mb-12">
            JOIN THE MOVEMENT
        </h2>
        <h2 className="text-2xl lg:text-4xl text-[#234285] text-center mb-4">
            UCLA&apos;s quantum future begins
        </h2>
        <h2 className="text-2xl lg:text-4xl text-[#234285] text-center">
            with you---one qubit at a time.
        </h2>
        <div className="flex justify-center items-center">
            <div className="relative w-[600px] h-[600px]">
                <Image
                    src="/images/button-aura.png"
                    alt="button background"
                    layout="fill"
                    objectFit="contain"
                    className="z-0"
                />
                <button className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-[#234285] -translate-y-6 z-30">
                    GET INVOLVED
                </button>
            </div>
        </div>
    </section>
  )
}
