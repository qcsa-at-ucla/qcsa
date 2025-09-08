"use client";

import { useRef, useEffect } from 'react';
import MainWebsiteFooter from "../Components/mainWebsiteFooter";
import Image from 'next/image';
import MainWebsiteHeader from '../Components/mainWebsiteHeader';

const SEMINARS = [
	{
		title: 'Quantum Computational Advantages in Optimization',
		speaker: 'Professor Leo Zhou',
		date: '01/24, Friday',
	},
	{
		title: 'AI + Quantum: Machine Learning Meets Quantum',
		speaker: 'Professor Di Luo',
		date: '01/30, Friday',
	},
	{
		title: 'Laser Cooled Molecules for Quantum Science',
		speaker: 'Professor Loic Andergg',
		date: '02/04, Friday',
	},
];

export default function UclaUscPage() {
	const containerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		// no-op for now, placeholder for future scroll tracking
		const el = containerRef.current;
		if (!el) return;
		const handler = () => {};
		el.addEventListener('scroll', handler, { passive: true });
		return () => el.removeEventListener('scroll', handler);
	}, []);

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
				<div className="max-w-6xl mx-auto">
					<div className="flex flex-col lg:flex-row items-center gap-12">

						{/* Left: image card */}
									<div className="w-full lg:w-5/12 flex justify-center">
										<div className="relative">
											{/* Aura / glow behind the card */}
											<div className="absolute -left-4 -top-4 w-[380px] h-[340px] rounded-2xl blur-3xl opacity-70 transform translate-x-1 translate-y-1" style={{background: 'radial-gradient(closest-side, rgba(27, 149, 236, 0.28), rgba(99,179,237,0.08) 60%, transparent 70%)'}} />

											<div className="bg-white rounded-xl p-6 shadow-lg ring-1 ring-blue-100/60 hover:shadow-xl transition-shadow duration-200 relative" style={{boxShadow: '0 10px 24px rgba(20, 86, 228, 0.08)'}}>
												<div className="w-[360px] h-[320px] flex items-center justify-center">
													<Image
														src="/images/ucla_usc.png"
														alt="UCLA x USC"
														width={360}
														height={320}
														className="object-contain rounded-md"
													/>
												</div>
											</div>
										</div>
									</div>

						{/* Right: text */}
						<div className="w-full lg:w-7/12">
							<h1 className="text-3xl md:text-4xl font-bold font-kantumruy text-[#234285] mb-6">
								UCLA x USC
							</h1>

							<div className="space-y-4 text-[#234285] font-kantumruy text-2xl leading-relaxed max-w-2xl">
								<p>
									Join us for monthly meetings about quantum computing between UCLA and USC!
								</p>
								<p>
									The meeting location will alternate between campuses with all meetings being broadcast over Zoom.
								</p>
							</div>
						</div>

					</div>
				</div>

					{/* Past Seminars section */}
					<section className="py-12 mt-12">
						<div className="max-w-6xl mx-auto relative">
							<h2 className="text-4xl md:text-5xl font-bold text-center font-kantumruy text-[#234285] mb-24">
								Past Seminars
							</h2>

							{/* Left/Right arrows (wired) */}
							<button aria-label="previous" onClick={() => scrollBy(-1)} className="hidden md:flex absolute top-[60%] -translate-y-1/2 -left-8 md:-left-12 z-20 flex items-center justify-center h-12 w-12 text-blue-800 hover:text-blue-900 focus:outline-none">
								<span className="text-6xl">‹</span>
							</button>

							<button aria-label="next" onClick={() => scrollBy(1)} className="hidden md:flex absolute top-[60%] -translate-y-1/2 -right-8 md:-right-12 z-20 flex items-center justify-center h-12 w-12 text-blue-800 hover:text-blue-900 focus:outline-none">
								<span className="text-6xl">›</span>
							</button>

							<div
								ref={containerRef}
								className="flex gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth py-6 px-6 sm:px-0"
								style={{ WebkitOverflowScrolling: 'touch' }}
								role="list"
								aria-label="Past seminars carousel"
							>
								{SEMINARS.map((s, idx) => (
									<div key={idx} className="snap-start flex-shrink-0 w-full md:w-[46%] lg:w-[31%]">
										<div className="relative">
											{/* decorative light-blue aura behind the card */}
											<div className="absolute -inset-2 rounded-lg blur-3xl opacity-70 pointer-events-none" style={{background: 'radial-gradient(closest-side, rgba(27,149,236,0.16), rgba(99,179,237,0.04) 55%, transparent 70%)'}} />
											<div className="bg-white rounded-lg p-10 shadow-lg ring-1 ring-blue-100/60 h-full flex flex-col justify-between relative z-10" style={{boxShadow: '0 12px 30px rgba(35,66,133,0.06)'}}>
												<div>
													<h3 className="text-xl md:text-2xl font-semibold text-center text-[#234285] mb-6 font-kantumruy leading-snug">
														{s.title}
													</h3>
									
													<p className="text-center text-[#234285] mb-3 font-kantumruy text-lg">
														{s.speaker}
													</p>
									
													<p className="text-center text-[#234285] mb-6 font-kantumruy text-lg">
														{s.date}
													</p>
												</div>

												<div className="flex justify-center mt-2">
													<button className="bg-[#234285] text-white px-8 py-3 rounded-md shadow-sm font-kantumruy">Learn More</button>
												</div>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</section>
				</main>

			<MainWebsiteFooter />
		</div>
	);
}