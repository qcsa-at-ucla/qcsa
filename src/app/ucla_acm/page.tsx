"use client";

import { useRef } from 'react';
import MainWebsiteFooter from "../Components/mainWebsiteFooter";
import Image from 'next/image';
import Link from 'next/link';
import MainWebsiteHeader from '../Components/mainWebsiteHeader';

const PAST_SEMINARS = [
    { title: 'Week 1: Introduction and Motivation', href: '#' },
    { title: 'Week 2: Mathematical Foundations', href: '#' },
    { title: 'Week 4: Entanglement & Teleportation', href: '#' },
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
        <main className="py-12 bg-[var(--background)] min-h-screen">
            <MainWebsiteHeader/>
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-12">
                    <div className="rounded-md overflow-hidden bg-white">
                        <Image src="/images/qcsa_acm_workshop.png" alt="QCSA ACM Workshop" width={820} height={360} className="w-full h-[220px] md:h-[360px] object-cover" />
                    </div>

                    <div className="prose max-w-xl text-[#234285]">
                        <h2 className="text-5xl font-bold font-kantumruy">QCSA x ACM Introductory Workshop</h2>
                        <p className="text-1xl mt-4">New to quantum? Join our seminar series in collaboration with ACM (Association for Computer Machinery)!
The series focuses on quantum information science, including quantum computers, sensors, and algorithms. This collaboration brings you an accessible introduction to this revolutionary field. No prior experience needed—our approach emphasizes intuitive understanding with hands-on projects throughout the series.What you’ll explore:</p>
                        <ul className="mt-4 list-disc pl-6">
                            <li>The fundamentals and capabilities of quantum computing</li>
                            <li>Essential mathematical foundations</li>
                            <li>Understanding the quantum circuit model</li>
                            <li>Practical quantum algorithms with Qiskit implementation</li>
                            <li>Current landscape of cutting-edge quantum technologies</li>
                        </ul>
                    </div>
                </section>

                {/* Past Seminars */}
                <section className="py-12">
                    <h2 className="text-center text-3xl font-bold text-[#234285] mb-8 font-kantumruy">Past Seminars</h2>

                    <div className="relative">
                        <button
                            aria-label="previous"
                            onClick={() => scrollBy(-1)}
                            className="absolute top-1/2 -translate-y-1/2 -left-8 md:-left-12 z-20 flex items-center justify-center h-12 w-12 text-blue-800 hover:text-blue-900 focus:outline-none"
                        >
                            <span className="text-6xl">‹</span>
                        </button>

                        <div ref={containerRef} className="flex gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth py-6 px-6 sm:px-0">
                            {PAST_SEMINARS.map((s, i) => (
                                <div key={i} className="snap-start flex-shrink-0 w-full sm:w-[46%] lg:w-[31%]">
                                    <div className="relative">
                                        <div aria-hidden className="absolute inset-0 rounded-md" style={{ boxShadow: '0 10px 30px rgba(49,100,180,0.12)' }} />
                                        <article className="relative bg-white rounded-md p-8" style={{ boxShadow: '0 10px 24px rgba(14,57,106,0.06)', borderTop: '1px solid rgba(14,57,106,0.02)' }}>
                                            <h3 className="text-xl font-semibold text-[#234285] mb-6">{s.title}</h3>
                                            <div className="flex justify-center">
                                                <Link href={s.href} className="bg-blue-900 text-white px-6 py-3 rounded shadow-sm hover:bg-blue-800 font-kantumruy">Learn More</Link>
                                            </div>
                                        </article>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button
                            aria-label="next"
                            onClick={() => scrollBy(1)}
                            className="absolute top-1/2 -translate-y-1/2 -right-8 md:-right-12 z-20 flex items-center justify-center h-12 w-12 text-blue-800 hover:text-blue-900 focus:outline-none"
                        >
                            <span className="text-6xl">›</span>
                        </button>
                    </div>
                </section>
            </div>

            <MainWebsiteFooter />
        </main>
    );
}
