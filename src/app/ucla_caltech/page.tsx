"use client";

import { useRef } from 'react';
import { motion } from 'framer-motion';
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
    {
        name: "Dolev Bluvstein",
        affiliation: 'Caltech',
    img: '/images/Dolev_Bluvstein.jpg',
    alt: 'Dolev Bluvstein',
    url: 'https://scholar.google.com/citations?user=zBweh4UAAAAJ&hl=en',
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
        <div className="min-h-screen flex flex-col bg-[#F3F8FF]">
            <MainWebsiteHeader/>
            <main className="py-20 px-6 sm:px-8 lg:px-16 flex-grow">
            <div className="max-w-6xl mx-auto px-4 md:px-6" >
                <section className="flex flex-col md:flex-row items-center md:gap-12" style={{width: 'auto', maxWidth: '1551px', height: 'auto', minHeight: '816px'}}>
                    {/* Left: Image card */}
                    <motion.div 
                        className="flex-shrink-0 w-full md:w-auto"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="w-full max-w-[320px] mx-auto md:w-[420px] h-auto md:max-w-none" style={{width: '491px', height: '334px'}}>
                            <Image
                                src="/images/ucla_caltech.png"
                                alt="UCLA Caltech"
                                width={491}
                                height={454}
                                className="object-contain w-full h-auto"
                            />
                        </div>
                    </motion.div>

                    {/* Right: Text */}
                    <motion.div 
                        className="prose prose-lg max-w-2xl lg:prose-xl text-gray-700 text-center md:text-left px-4 md:px-0"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#113d7a] leading-tight">
                            EntangleTalks LA
                            <span className="block mt-1 text-3xl sm:text-4xl md:text-5xl">
                                <span className="text-[#2B6BF5] mr-2">UCLA</span>
                                meets
                                <span className="text-[#ff7a18]"> Caltech!</span>
                            </span>
                        </h1>

                        <p className="mt-4 md:mt-6 text-sm md:text-base lg:text-lg leading-relaxed font-kantumruy text-[#234285]">
                            EntangleTalks LA is the new collaboration between the QCSA and Caltech! As Los Angeles evolves into a
                            global quantum hub, it is important to keep the quantum community well connected - and well nourished.
                            We are creating a space for you to learn about cutting edge research, discuss & present your own, and
                            bond over pizza with your peers. This event series hosts short spotlight research talks followed by a
                            casual get-together for networking, sharing ideas, building collaborations and digging into the pizzas.
                            We alternate locations every month and provide you with a shuttle bus across town. Join us for a slice of
                            LA&apos;s quantum future!
                        </p>
                    </motion.div>
                </section>

                

                {/* Stay tuned section */}
                {/* <motion.section 
                    className="mt-16 md:mt-32 relative px-4 md:px-0"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex justify-center items-center">
                        <div className="relative w-full max-w-[900px] h-[400px] md:h-[600px]">
                            <Image
                                src="/images/aura.png"
                                alt="button background"
                                layout="fill"
                                objectFit="contain"
                                    className="z-0 opacity-30"
                            />

                            {/* Centered stacked headline inside the aura */}
                            {/* <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-10 z-30">
                                <h2 className="text-lg md:text-2xl font-kantumruy leading-tight">
                                    Stay tuned for the next edition of EntangleTalks LA hosted
                                </h2>
                                <h2 className="mt-4 md:mt-8 text-lg md:text-2xl font-kantumruy text-[#234285] leading-tight">
                                    at Caltech in October 2025!
                                </h2>
                            </div>
                        </div>
                    </div> */}
                {/* </motion.section> */} */


                {/* Past Speakers section */}
                <motion.section 
                    className="mt-16 pb-16 md:pb-24"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="max-w-6xl mx-auto px-4 md:px-40">
                        <h2 className="text-2xl md:text-3xl font-bold text-center font-kantumruy text-[#234285] pb-6 md:pb-8">Past Speakers</h2>

                        <div className="relative mt-8">
                            {/* left arrow (styled like events page) */}
                            <button
                                aria-label="previous speakers"
                                type="button"
                                onClick={() => speakersScrollBy(-1)}
                                className="absolute top-1/2 -translate-y-1/2 -left-6 md:-left-12 lg:-left-28 z-20 flex items-center justify-center h-12 w-12 text-[#234285] hover:text-[#1f4978] focus:outline-none hidden md:flex"
                            >
                                <span className="text-4xl md:text-6xl">‹</span>
                            </button>

                            <div ref={speakersRef} className="flex gap-4 md:gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth mx-auto w-full py-6 px-2">
                                {PAST_SPEAKERS.map((s) => (
                                    <article key={s.name} className="snap-start flex-shrink-0 w-[280px] md:w-[46%] bg-white p-6 md:p-8 rounded-xl shadow-md text-center">
                                        <h3 className="font-bold text-base md:text-lg text-[#113d7a]">{s.name}</h3>
                                        <p className="mt-1 text-sm md:text-base text-[#234285] font-kantumruy">{s.affiliation}</p>

                                        <div className="my-4 md:my-6 w-24 h-24 md:w-36 md:h-36 mx-auto rounded-full overflow-hidden border-4 border-white shadow-inner">
                                            <Image src={s.img} alt={s.alt} width={144} height={144} className="object-cover w-full h-full" />
                                        </div>

                                        <a
                                            className="inline-block bg-[#234285] text-white px-4 md:px-6 py-2 rounded-md shadow hover:opacity-95 text-sm md:text-base"
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
                                className="absolute top-1/2 -translate-y-1/2 -right-6 md:-right-12 lg:-right-28 z-20 flex items-center justify-center h-12 w-12 text-[#234285] hover:text-[#1f4978] focus:outline-none hidden md:flex"
                            >
                                <span className="text-4xl md:text-6xl">›</span>
                            </button>
                        </div>
                    </div>
                </motion.section>
            </div>
</main>
            <MainWebsiteFooter />
        </div>
    );
}

