"use client";

import { useRef } from 'react';
import MainWebsiteFooter from "../Components/mainWebsiteFooter";
import Image from 'next/image';
import MainWebsiteHeader from '../Components/mainWebsiteHeader';

const PAST_SPEAKERS = [
    {
        name: 'John Preskill',
        affiliation: 'Caltech',
    img: '/images/JohnP.jpg',
    alt: 'John Preskill',
    url: 'https://www.preskill.caltech.edu/',
    },
    {
        name: 'William Munizzi',
        affiliation: 'UCLA',
    img: '/images/WilliamM.jpg',
    alt: 'William Munizzi',
    url: 'https://naranglab.ucla.edu/people/dr-william-munizzi/',
    },
];

export default function Page() {
    const speakersRef = useRef<HTMLDivElement | null>(null);

    const speakersScrollBy = (direction: number) => {
        const el = speakersRef.current;
        if (!el) return;
        const scrollAmount = Math.max(el.clientWidth * 0.9, 300) * direction;
        el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    };
    return (
        <main className="py-20 bg-[var(--background)]">
            <MainWebsiteHeader/>
            <div className="max-w-6xl mx-auto px-6">
                <section className="flex flex-col md:flex-row items-center gap-12">
                    {/* Left: Image card */}
                    <div className="flex-shrink-0 bg-[#F1E6D8] rounded-xl p-6 md:p-8 shadow-sm">
                        <div className="w-[320px] md:w-[420px] h-auto">
                            <Image
                                src="/images/ucla_caltech.png"
                                alt="UCLA Caltech"
                                width={420}
                                height={420}
                                className="object-contain rounded-md"
                            />
                        </div>
                    </div>

                    {/* Right: Text */}
                    <div className="prose prose-lg max-w-2xl lg:prose-xl text-gray-700">
                        <h1 className="text-3xl md:text-4xl font-extrabold text-[#113d7a] leading-tight">
                            EntangleTalks LA
                            <span className="block mt-1 text-4xl md:text-5xl">
                                <span className="text-[#2b6cb0] mr-2">UCLA</span>
                                meets
                                <span className="text-[#ff7a18]">Caltech!</span>
                            </span>
                        </h1>

                        <p className="mt-6 text-base md:text-lg leading-relaxed font-kantumruy text-[#234285]">
                            EntangleTalks LA is the new collaboration between the QCSA and Caltech! As Los Angeles evolves into a
                            global quantum hub, it is important to keep the quantum community well connected - and well nourished.
                            We are creating a space for you to learn about cutting edge research, discuss & present your own, and
                            bond over pizza with your peers. This event series hosts short spotlight research talks followed by a
                            casual get-together for networking, sharing ideas, building collaborations and digging into the pizzas.
                            We alternate locations every month and provide you with a shuttle bus across town. Join us for a slice of
                            LA’s quantum future!
                        </p>
                    </div>
                </section>

                

                {/* Stay tuned section */}
                <section className="mt-32 relative">
                    <div className="flex justify-center items-center">
                        <div className="relative w-[900px] h-[600px]">
                            <Image
                                src="/images/aura.png"
                                alt="button background"
                                layout="fill"
                                objectFit="contain"
                                    className="z-0 opacity-30"
                            />

                            {/* Centered stacked headline inside the aura */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-10 z-30">
                                <h2 className="text-2xl md:text-1xl font-bold text-[#234285] leading-tight">
                                    Stay tuned for the next edition of EntangleTalks LA hosted
                                </h2>
                                <h2 className="mt-2 text-2xl md:text-3xl font-bold text-[#234285] leading-tight mt-8">
                                    at Caltech in October 2025!
                                </h2>
                            </div>
                        </div>
                    </div>
                </section>


                {/* Past Speakers section */}
                <section className="mt-16 pb-16 md:pb-24">
                    <div className="max-w-6xl mx-auto px-40 ">
                        <h2 className="text-3xl font-bold text-center font-kantumruy text-[#234285] pb-8">Past Speakers</h2>

                        <div className="relative mt-8">
                            {/* left arrow (styled like events page) */}
                            <button
                                aria-label="previous speakers"
                                type="button"
                                onClick={() => speakersScrollBy(-1)}
                                className="absolute top-1/2 -translate-y-1/2 -left-12 md:-left-28 z-20 flex items-center justify-center h-12 w-12 text-[#234285] hover:text-[#1f4978] focus:outline-none hidden md:flex"
                            >
                                <span className="text-6xl">‹</span>
                            </button>

                            <div ref={speakersRef} className="flex gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth mx-auto w-full py-6 px-2">
                                {PAST_SPEAKERS.map((s) => (
                                    <article key={s.name} className="snap-start flex-shrink-0 w-full md:w-[46%] bg-white p-8 rounded-xl shadow-md text-center">
                                        <h3 className="font-bold text-lg text-[#113d7a]">{s.name}</h3>
                                        <p className="mt-1 text-[#234285]  font-kantumruy ">{s.affiliation}</p>

                                        <div className="my-6 w-36 h-36 mx-auto rounded-full overflow-hidden border-4 border-white shadow-inner">
                                            <Image src={s.img} alt={s.alt} width={144} height={144} className="object-cover w-full h-full" />
                                        </div>

                                        <a
                                            className="inline-block bg-[#234285] text-white px-6 py-2 rounded-md shadow hover:opacity-95"
                                            href={s.url}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            Learn More
                                        </a>
                                    </article>
                                ))}
                            </div>

                            {/* right arrow (styled like events page) */}
                            <button
                                aria-label="next speakers"
                                type="button"
                                onClick={() => speakersScrollBy(1)}
                                className="absolute top-1/2 -translate-y-1/2 -right-12 md:-right-28 z-20 flex items-center justify-center h-12 w-12 text-[#234285] hover:text-[#1f4978] focus:outline-none hidden md:flex"
                            >
                                <span className="text-6xl">›</span>
                            </button>
                        </div>
                    </div>
                </section>
            </div>

            <MainWebsiteFooter />
        </main>
    );
}

