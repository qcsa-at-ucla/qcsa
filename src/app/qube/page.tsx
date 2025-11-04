"use client";

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import MainWebsiteFooter from "../Components/mainWebsiteFooter";
import Image from 'next/image';
import Link from 'next/link';
import MainWebsiteHeader from '../Components/mainWebsiteHeader';

interface Event {
    title: string;
    href: string;
}

const UPCOMING_EVENTS: Event[] = [
    // Add upcoming QuBE events here
];

const PAST_EVENTS: Event[] = [
    // Add past QuBE events here
];

export default function Page() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);

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
                    {/* Hero Section */}
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 items-center py-6 md:py-12">
                        <motion.div 
                            className="rounded-md overflow-hidden bg-white"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <Image 
                                src="/images/qube.png" 
                                alt="QuBE - Quantum Computing Applications in BioChemistry" 
                                width={820} 
                                height={360} 
                                className="w-full h-[220px] md:h-[360px] object-cover" 
                            />
                        </motion.div>

                        <motion.div 
                            className="prose max-w-xl text-[#234285] text-center md:text-left px-4 md:px-0"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                        >
                            <h2 className="text-4xl font-kantumruy text-[#234285]">QuBE - Quantum Computing Applications in BioChemistry</h2>
                            <p className="text-lg mt-4 font-kantumruy text-[#234285]">
                                Seminar and workshop on quantum computing applications in biochemistry. Features speakers from IBM, USC, and UCLA and includes lectures as well as a workshop and project. Hosted at CNSI with online participation as an option!
                            </p>
                        </motion.div>
                    </section>

                    {/* Event Schedule Section */}
                    <section className="py-12 md:py-16">
                        <motion.h2 
                            className="text-center text-3xl md:text-4xl font-bold text-[#234285] mb-12 font-kantumruy"
                            initial={{ opacity: 0, y: -20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            Event Schedule
                        </motion.h2>
                        
                        <div className="max-w-4xl mx-auto relative">
                            {/* Timeline line */}
                            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-[#234285] transform -translate-x-1/2 hidden md:block" />
                            
                            <div className="space-y-8 md:space-y-12">
                                {/* Event 1 - Left */}
                                <div className="flex flex-col md:flex-row items-center gap-4">
                                    <div className="md:w-1/2 md:pr-8">
                                        <div className="bg-white p-6 rounded-lg shadow-md border border-blue-100 text-center">
                                            <h3 className="text-xl font-bold text-[#234285] mb-2">9:00 AM – 9:15 AM</h3>
                                            <p className="text-lg text-[#234285] font-semibold mb-1">Welcome and Introduction</p>
                                            <p className="text-base text-[#234285]">Presented by Ilaana & Alex</p>
                                        </div>
                                    </div>
                                    <div className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-[#234285] border-4 border-white shadow-lg z-10 flex-shrink-0" />
                                    <div className="md:w-1/2 md:pl-8" />
                                </div>

                                {/* Event 2 - Right */}
                                <div className="flex flex-col md:flex-row items-center gap-4">
                                    <div className="md:w-1/2 md:pr-8" />
                                    <div className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-[#234285] border-4 border-white shadow-lg z-10 flex-shrink-0" />
                                    <div className="md:w-1/2 md:pl-8">
                                        <div className="bg-white p-6 rounded-lg shadow-md border border-blue-100 text-center">
                                            <h3 className="text-xl font-bold text-[#234285] mb-2">9:15 AM – 10:15 AM</h3>
                                            <p className="text-lg text-[#234285] font-semibold mb-1">Motivation Lecture</p>
                                            <p className="text-base text-[#234285]">By: Dr. Rosa Di Felice</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Event 3 - Left */}
                                <div className="flex flex-col md:flex-row items-center gap-4">
                                    <div className="md:w-1/2 md:pr-8">
                                        <div className="bg-white p-6 rounded-lg shadow-md border border-blue-100 text-center">
                                            <h3 className="text-xl font-bold text-[#234285] mb-2">10:15 AM – 11:15 PM</h3>
                                            <p className="text-lg text-[#234285] font-semibold mb-1">Quantum Kernel Methods</p>
                                            <p className="text-base text-[#234285]">By: Dr. William Munizzi, UCLA Post Doc</p>
                                        </div>
                                    </div>
                                    <div className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-[#234285] border-4 border-white shadow-lg z-10 flex-shrink-0" />
                                    <div className="md:w-1/2 md:pl-8" />
                                </div>

                                {/* Event 4 - Right */}
                                <div className="flex flex-col md:flex-row items-center gap-4">
                                    <div className="md:w-1/2 md:pr-8" />
                                    <div className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-[#234285] border-4 border-white shadow-lg z-10 flex-shrink-0" />
                                    <div className="md:w-1/2 md:pl-8">
                                        <div className="bg-white p-6 rounded-lg shadow-md border border-blue-100 text-center">
                                            <h3 className="text-xl font-bold text-[#234285] mb-2">11:15 AM - 12:15 PM</h3>
                                            <p className="text-lg text-[#234285] font-semibold mb-1">Research Lecture</p>
                                            <p className="text-base text-[#234285]">By: Sara Capponi, IBM</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Event 5 - Left */}
                                <div className="flex flex-col md:flex-row items-center gap-4">
                                    <div className="md:w-1/2 md:pr-8">
                                        <div className="bg-white p-6 rounded-lg shadow-md border border-blue-100 text-center">
                                            <h3 className="text-xl font-bold text-[#234285] mb-2">12:15 PM – 1:15 PM</h3>
                                            <p className="text-lg text-[#234285] font-semibold">Lunch Break</p>
                                        </div>
                                    </div>
                                    <div className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-[#234285] border-4 border-white shadow-lg z-10 flex-shrink-0" />
                                    <div className="md:w-1/2 md:pl-8" />
                                </div>

                                {/* Event 6 - Right */}
                                <div className="flex flex-col md:flex-row items-center gap-4">
                                    <div className="md:w-1/2 md:pr-8" />
                                    <div className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-[#234285] border-4 border-white shadow-lg z-10 flex-shrink-0" />
                                    <div className="md:w-1/2 md:pl-8">
                                        <div className="bg-white p-6 rounded-lg shadow-md border border-blue-100 text-center">
                                            <h3 className="text-xl font-bold text-[#234285] mb-2">1:15 PM – 3:15 PM</h3>
                                            <p className="text-lg text-[#234285] font-semibold mb-1">Tutorial on Projected Quantum Kernel</p>
                                            <p className="text-base text-[#234285]">By: Meltem Tolunay, IBM</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Event 7 - Left */}
                                <div className="flex flex-col md:flex-row items-center gap-4">
                                    <div className="md:w-1/2 md:pr-8">
                                        <div className="bg-white p-6 rounded-lg shadow-md border border-blue-100 text-center">
                                            <h3 className="text-xl font-bold text-[#234285] mb-2">3:15 PM – 4:30 PM</h3>
                                            <p className="text-lg text-[#234285] font-semibold">Open Reception & Networking</p>
                                        </div>
                                    </div>
                                    <div className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-[#234285] border-4 border-white shadow-lg z-10 flex-shrink-0" />
                                    <div className="md:w-1/2 md:pl-8" />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* RSVP Form Section - Clickable to Open Modal */}
                    <section className="py-8 md:py-16">
                        <div className="max-w-4xl mx-auto">
                            <button
                                onClick={() => setIsFormModalOpen(true)}
                                className="w-full bg-white rounded-xl shadow-lg overflow-hidden border border-blue-100 hover:shadow-2xl hover:border-blue-300 transition-all duration-300 cursor-pointer group"
                            >
                                <div className="bg-gradient-to-r from-blue-900 to-blue-800 px-6 py-4 group-hover:from-blue-800 group-hover:to-blue-700 transition-all duration-300">
                                    <div className="flex items-center justify-center gap-3">
                                        <h3 className="text-xl md:text-2xl font-bold text-white text-center font-kantumruy">
                                            Google Form
                                        </h3>
                                        <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    </div>
                                    <p className="text-white text-sm text-center mt-2 opacity-90 group-hover:opacity-100 transition-opacity">
                                        Click to open form
                                    </p>
                                </div>
                                
                                <div className="p-8 md:p-12 text-center">
                                    <div className="flex flex-col items-center gap-4">
                                        <svg className="w-16 h-16 md:w-20 md:h-20 text-blue-900 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        <p className="text-lg md:text-xl text-[#234285] font-semibold font-kantumruy">
                                            Click here to fill out the RSVP form
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            Opens in a modal window
                                        </p>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </section>

                    {/* Form Modal */}
                    {isFormModalOpen && (
                        <div 
                            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60" 
                            onClick={() => setIsFormModalOpen(false)} 
                            style={{ backdropFilter: 'blur(4px)'}}
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="form-modal-title"
                        >
                            <div 
                                className="bg-white rounded-xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl" 
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="bg-gradient-to-r from-blue-900 to-blue-800 px-6 py-4 flex items-center justify-between">
                                    <h3 id="form-modal-title" className="text-xl md:text-2xl font-bold text-white font-kantumruy">
                                        QuBE RSVP Form
                                    </h3>
                                    <button 
                                        className="text-white hover:text-gray-200 focus:text-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-900 rounded-full p-2 transition-colors duration-200" 
                                        onClick={() => setIsFormModalOpen(false)}
                                        aria-label="Close form modal"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                
                                <div className="p-4 md:p-6 overflow-auto max-h-[calc(90vh-80px)]">
                                    <div className="aspect-video w-full min-h-[500px] md:min-h-[700px]">
                                        <iframe 
                                            src="https://docs.google.com/forms/d/e/1FAIpQLSfr-qVBy-RbxtceJ_e-QO-yewp1HCy30cmmCRJaP2F1TVB5dw/viewform?embedded=true"
                                            className="w-full h-full border-0 rounded-lg"
                                            frameBorder="0"
                                            marginHeight={0}
                                            marginWidth={0}
                                            title="QuBE RSVP Form"
                                        >
                                            Loading…
                                        </iframe>
                                    </div>
                                    
                                    <div className="mt-6 text-center">
                                        <p className="text-sm text-gray-600 mb-4">
                                            Having trouble with the form?
                                        </p>
                                        <Link 
                                            href="https://docs.google.com/forms/d/e/1FAIpQLSfr-qVBy-RbxtceJ_e-QO-yewp1HCy30cmmCRJaP2F1TVB5dw/viewform"
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
                        </div>
                    )}

                    {/* QuBE Poster Section */}
                    <section className="py-8 md:py-16">
                        <div className="max-w-6xl mx-auto px-4 sm:px-6">
                            <div className="flex justify-center">
                                <Image 
                                    src="/images/qube_poster.png" 
                                    alt="QuBE Event Poster" 
                                    width={1200} 
                                    height={1600} 
                                    className="w-full max-w-xl h-auto rounded-lg shadow-lg" 
                                />
                            </div>
                        </div>
                    </section>

                    {/* Upcoming Events Section */}
                    {UPCOMING_EVENTS.length > 0 && (
                        <section className="py-6 md:py-12">
                            <h2 className="text-center text-2xl md:text-3xl font-bold text-[#234285] mb-6 md:mb-8 font-kantumruy">Upcoming Events</h2>

                            <div className="relative">
                                <button
                                    aria-label="previous"
                                    onClick={() => scrollBy(-1)}
                                    className="absolute top-1/2 -translate-y-1/2 -left-6 md:-left-8 lg:-left-12 z-20 flex items-center justify-center h-12 w-12 text-blue-800 hover:text-blue-900 focus:outline-none hidden md:flex"
                                >
                                    <span className="text-4xl md:text-6xl">‹</span>
                                </button>

                                <div ref={containerRef} className="flex gap-4 md:gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth py-6 px-4 md:px-6 sm:px-0">
                                    {UPCOMING_EVENTS.map((event, i) => (
                                        <div key={i} className="snap-start flex-shrink-0 w-[280px] sm:w-[46%] lg:w-[31%]">
                                            <div className="relative">
                                                <div aria-hidden className="absolute inset-0 rounded-md" style={{ boxShadow: '0 10px 30px rgba(49,100,180,0.12)' }} />
                                                <article className="relative bg-white rounded-md p-6 md:p-8" style={{ boxShadow: '0 10px 24px rgba(14,57,106,0.06)', borderTop: '1px solid rgba(14,57,106,0.02)' }}>
                                                    <h3 className="text-2xl font-kantamruy text-[#234285] font-bold mb-4 md:mb-6">{event.title}</h3>
                                                    <div className="flex justify-center">
                                                        <Link href={event.href} className="bg-blue-900 text-white px-4 md:px-6 py-2 md:py-3 rounded shadow-sm hover:bg-blue-800 font-kantumruy text-2xl">Learn More</Link>
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
                    )}

                   

                    {/* Past Events Section */}
                    {PAST_EVENTS.length > 0 && (
                        <section className="py-6 md:py-12">
                            <h2 className="text-center text-2xl md:text-3xl font-bold text-[#234285] mb-6 md:mb-8 font-kantumruy">Past Events</h2>

                            <div className="relative">
                                <button
                                    aria-label="previous"
                                    onClick={() => scrollBy(-1)}
                                    className="absolute top-1/2 -translate-y-1/2 -left-6 md:-left-8 lg:-left-12 z-20 flex items-center justify-center h-12 w-12 text-blue-800 hover:text-blue-900 focus:outline-none hidden md:flex"
                                >
                                    <span className="text-4xl md:text-6xl">‹</span>
                                </button>

                                <div ref={containerRef} className="flex gap-4 md:gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth py-6 px-4 md:px-6 sm:px-0">
                                    {PAST_EVENTS.map((event, i) => (
                                        <div key={i} className="snap-start flex-shrink-0 w-[280px] sm:w-[46%] lg:w-[31%]">
                                            <div className="relative">
                                                <div aria-hidden className="absolute inset-0 rounded-md" style={{ boxShadow: '0 10px 30px rgba(49,100,180,0.12)' }} />
                                                <article className="relative bg-white rounded-md p-6 md:p-8" style={{ boxShadow: '0 10px 24px rgba(14,57,106,0.06)', borderTop: '1px solid rgba(14,57,106,0.02)' }}>
                                                    <h3 className="text-2xl font-kantamruy text-[#234285] font-bold mb-4 md:mb-6">{event.title}</h3>
                                                    <div className="flex justify-center">
                                                        <Link href={event.href} className="bg-blue-900 text-white px-4 md:px-6 py-2 md:py-3 rounded shadow-sm hover:bg-blue-800 font-kantumruy text-2xl">Learn More</Link>
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
                    )}
                </div>
            </main>
            <MainWebsiteFooter />
        </div>
    );
}
