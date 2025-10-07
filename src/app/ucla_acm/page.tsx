"use client";

import { useRef } from 'react';
import MainWebsiteFooter from "../Components/mainWebsiteFooter";
import Image from 'next/image';
import Link from 'next/link';
import MainWebsiteHeader from '../Components/mainWebsiteHeader';

const FALL_QUARTER_2025 = [
    { title: 'Week 1: Fall GM', href: 'https://youtu.be/fP2_yKoHhww' },
];

const PAST_SEMINARS = [
    { title: 'Week 1: Introduction and Motivation', href: 'https://drive.google.com/file/d/14X4zg8485xQI8Yjs3QbWn2NqbVCjmfGL/view' },
    { title: 'Week 2: Mathematical Foundations', href: 'https://drive.google.com/file/d/14X4zg8485xQI8Yjs3QbWn2NqbVCjmfGL/view' },
    { title: 'Week 4: Entanglement & Teleportation', href: 'https://youtu.be/6PcuyKaVyho?feature=shared' },
];

export default function Page() {
    const containerRef = useRef<HTMLDivElement | null>(null);

    const scrollBy = (direction: number) => {
        const el = containerRef.current;
        if (!el) return;
        const scrollAmount = Math.max(el.clientWidth * 0.9, 300) * direction;
        el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#F3F8FF]">
            <MainWebsiteHeader/>
            <main className="py-20 px-6 sm:px-8 lg:px-16 flex-grow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <section className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 items-center py-6 md:py-12">
                    <div className="rounded-md overflow-hidden bg-white">
                        <Image src="/images/workshop_template__1_.png" alt="QCSA ACM Workshop" width={820} height={360} className="w-full h-[220px] md:h-[360px] object-cover" />
                    </div>

                    <div className="prose max-w-xl text-[#234285] text-center md:text-left px-4 md:px-0">
                        <h2 className="text-4xl font-kantumruy ">QCSA x ACM Introductory Workshop</h2>
                        <p className="text-1/2xl mt-4 gap-25">New to quantum? Join our seminar series in collaboration with ACM (Association for Computer Machinery)!
The series focuses on quantum information science, including quantum computers, sensors, and algorithms. This collaboration brings you an accessible introduction to this revolutionary field. No prior experience needed—our approach emphasizes intuitive understanding with hands-on projects throughout the series.What you’ll explore:</p>
                        <ul className="mt-4 list-disc pl-6 text-sm md:text-base">
                            <li>The fundamentals and capabilities of quantum computing</li>
                            <li>Essential mathematical foundations</li>
                            <li>Understanding the quantum circuit model</li>
                            <li>Practical quantum algorithms with Qiskit implementation</li>
                            <li>Current landscape of cutting-edge quantum technologies</li>
                        </ul>
                    </div>
                </section>

                {/* Fall Quarter 2025 */}
                <section className="py-6 md:py-12">
                    <h2 className="text-center text-2xl md:text-3xl font-bold text-[#234285] mb-6 md:mb-8 font-kantumruy">Fall Quarter 2025</h2>

                    <div className="relative">
                        <button
                            aria-label="previous"
                            onClick={() => scrollBy(-1)}
                            className="absolute top-1/2 -translate-y-1/2 -left-6 md:-left-8 lg:-left-12 z-20 flex items-center justify-center h-12 w-12 text-blue-800 hover:text-blue-900 focus:outline-none hidden md:flex"
                        >
                            <span className="text-4xl md:text-6xl">‹</span>
                        </button>

                        <div ref={containerRef} className="flex gap-4 md:gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth py-6 px-4 md:px-6 sm:px-0">
                            {FALL_QUARTER_2025.map((s, i) => (
                                <div key={i} className="snap-start flex-shrink-0 w-[280px] sm:w-[46%] lg:w-[31%]">
                                    <div className="relative">
                                        <div aria-hidden className="absolute inset-0 rounded-md" style={{ boxShadow: '0 10px 30px rgba(49,100,180,0.12)' }} />
                                        <article className="relative bg-white rounded-md p-6 md:p-8" style={{ boxShadow: '0 10px 24px rgba(14,57,106,0.06)', borderTop: '1px solid rgba(14,57,106,0.02)' }}>
                                            <h3 className="text-2xl font-kantamruy text-[#234285] font-bold mb-4 md:mb-6">{s.title}</h3>
                                            <div className="flex justify-center">
                                                <Link href={s.href} className="bg-blue-900 text-white px-4 md:px-6 py-2 md:py-3 rounded shadow-sm hover:bg-blue-800 font-kantumruy text-2xl">Learn More</Link>
                                            </div>
                                        </article>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button
                            aria-label="next"
                            onClick={() => scrollBy(1)}
                            className="absolute top-1/2 -translate-y-1/2 -right-6 md:-right-8 lg:-right-12 z-20 flex items-center justify-center h-12 w-12 text-blue-800 hover:text-blue-900 focus:outline-none hidden md:flex"
                        >
                            <span className="text-4xl md:text-6xl">›</span>
                        </button>
                    </div>
                </section>

                {/* Past Seminars */}
                <section className="py-6 md:py-12">
                    <h2 className="text-center text-2xl md:text-3xl font-bold text-[#234285] mb-6 md:mb-8 font-kantumruy">Past Seminars</h2>

                    <div className="relative">
                        <button
                            aria-label="previous"
                            onClick={() => scrollBy(-1)}
                            className="absolute top-1/2 -translate-y-1/2 -left-6 md:-left-8 lg:-left-12 z-20 flex items-center justify-center h-12 w-12 text-blue-800 hover:text-blue-900 focus:outline-none hidden md:flex"
                        >
                            <span className="text-4xl md:text-6xl">‹</span>
                        </button>

                        <div ref={containerRef} className="flex gap-4 md:gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth py-6 px-4 md:px-6 sm:px-0">
                            {PAST_SEMINARS.map((s, i) => (
                                <div key={i} className="snap-start flex-shrink-0 w-[280px] sm:w-[46%] lg:w-[31%]">
                                    <div className="relative">
                                        <div aria-hidden className="absolute inset-0 rounded-md" style={{ boxShadow: '0 10px 30px rgba(49,100,180,0.12)' }} />
                                        <article className="relative bg-white rounded-md p-6 md:p-8" style={{ boxShadow: '0 10px 24px rgba(14,57,106,0.06)', borderTop: '1px solid rgba(14,57,106,0.02)' }}>
                                            <h3 className="text-2xl font-kantamruy text-[#234285] font-bold mb-4 md:mb-6">{s.title}</h3>
                                            <div className="flex justify-center">
                                                <Link href={s.href} className="bg-blue-900 text-white px-4 md:px-6 py-2 md:py-3 rounded shadow-sm hover:bg-blue-800 font-kantumruy text-2xl">Learn More</Link>
                                            </div>
                                        </article>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button
                            aria-label="next"
                            onClick={() => scrollBy(1)}
                            className="absolute top-1/2 -translate-y-1/2 -right-6 md:-right-8 lg:-right-12 z-20 flex items-center justify-center h-12 w-12 text-blue-800 hover:text-blue-900 focus:outline-none hidden md:flex"
                        >
                            <span className="text-4xl md:text-6xl">›</span>
                        </button>
                    </div>
                </section>

                {/* RSVP Section */}
                <section className="py-8 md:py-16">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-8 md:mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-[#234285] mb-4 font-kantumruy">
                                Ready to Join Us?
                            </h2>
                            <p className="text-lg md:text-xl text-[#234285] opacity-80 max-w-2xl mx-auto">
                                Reserve your spot for upcoming workshops and stay updated with our quantum journey!
                            </p>
                        </div>
                        
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-blue-100">
                            <div className="bg-gradient-to-r from-blue-900 to-blue-800 px-6 py-4">
                                <h3 className="text-xl md:text-2xl font-bold text-white text-center font-kantumruy">
                                    ACM Quantum Workshop RSVP
                                </h3>
                            </div>
                            
                            <div className="p-4 md:p-6">
                                <div className="aspect-video w-full min-h-[500px] md:min-h-[600px]">
                                    <iframe 
                                        src="https://docs.google.com/forms/d/e/1FAIpQLScf_RNKIr7M5WHYhe7wKBu8oypT0i8BD5qu2CpRL1y3_WW1WA/viewform?embedded=true"
                                        className="w-full h-full border-0 rounded-lg"
                                        frameBorder="0"
                                        marginHeight={0}
                                        marginWidth={0}
                                        title="Workshop RSVP Form"
                                    >
                                        Loading…
                                    </iframe>
                                </div>
                                
                                <div className="mt-6 text-center">
                                    <p className="text-sm text-gray-600 mb-4">
                                        Having trouble with the form above?
                                    </p>
                                    <Link 
                                        href="https://docs.google.com/forms/d/e/1FAIpQLScf_RNKIr7M5WHYhe7wKBu8oypT0i8BD5qu2CpRL1y3_WW1WA/viewform"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 bg-blue-900 text-white px-6 py-3 rounded-lg shadow-sm hover:bg-blue-800 transition-colors font-kantumruy text-lg font-medium"
                                    >
                                        Open Form in New Tab
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 text-center">
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm text-[#234285] opacity-70">
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Free to attend</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>No experience required</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Materials provided</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
            </div>
</main>
            <MainWebsiteFooter />
        </div>
    );
}
