"use client";

import { useRef, useEffect, useState } from "react";
import MainWebsiteFooter from "../Components/mainWebsiteFooter";
import Image from 'next/image';
import Link from 'next/link';
import MainWebsiteHeader from "../Components/mainWebsiteHeader";

const eventsData = [
	{
		datePrimary: "22",
		dateSecondary: "September",
		title: "QCSA at Enormous Activities Fair",
		location: "UCLA, CA",
	},
	{
		datePrimary: "##",
		dateSecondary: "October",
		title: "QCSA Fall GM",
		location: "UCLA, CA",
	},
	{
		datePrimary: "17-19",
		dateSecondary: "October",
		title: "Qiskit Fall Fest",
		location: "UCLA, CA",
	},
];

export default function EventsPage() {
	const containerRef = useRef<HTMLDivElement | null>(null);
    const [modalOpen, setModalOpen] = useState(false);

	// past events carousel ref and data
	const pastRef = useRef<HTMLDivElement | null>(null);

	type PastEvent = { title: string; date: string; excerpt: string; href: string; content?: string };
	const [selectedPast, setSelectedPast] = useState<PastEvent | null>(null);

	const pastEvents: PastEvent[] = [
		{
			title: 'EntangleTalks LA - #2',
			date: '05/09/2025',
			excerpt: 'We were thrilled to host Dr. William Munizzi from the Narang Lab (UCLA/ Lawrence Berkeley National Laboratory) for an insightful talk on entanglement and magic in holography.',
			href: '#',
			content: `We were thrilled to host Dr. William Munizzi from the Narang Lab (UCLA/Lawrence Berkeley National Laboratory) for an insightful talk on entanglement and magic in holography. Dr. Munizzi explored how holographic principles from high-energy physics shed light on entanglement structures in quantum systems and quantum error correction codes, bridging advanced theory with potential applications in quantum information science. The talk was followed by a lively social gathering, where researchers and students from UCLA and Caltech connected over refreshments and discussions.`,
		},
		{
			title: 'HRL Seminar with Judith Olson',
			date: '05/07/2025',
			excerpt: 'We were delighted to host Judith Olson from HRL Laboratories for an insightful session on preparing for life after school.',
			href: '#',
			content: `We were delighted to host Judith Olson from HRL Laboratories for an insightful session on preparing for life after school. Judith shared valuable perspectives to help students confidently approach their post-college journey, whether they plan to enter the workforce or pursue advanced degrees.`,
		},
		{
			title: 'QCSA x SPS Undergrad Seminar',
			date: '05/09/2025',
			excerpt: 'A seminar presenting recent student research and opportunities for undergraduates in quantum computing.',
			href: '#',
			content: `The talk by Mu Niu, a 4th year physics undergrad, introduced the Density Matrix Renormalization Group (DMRG) method and its use in identifying the critical point of Kitaev Chain. The event will began with an overview of topological quantum computation, followed by a discussion of tensor networks and DMRG, and Jordan-Wigner transformation. The talk aims to introduce students to DMRG and demonstrate its applications in quantum many-body physics.`,
		},
        {
			title: 'EntangleTalks LA - #1',
			date: '04/04/2025',
			excerpt: 'For our inaugural event, we were honored to host Prof. John Preskill, the Richard P. Feynman Professor of Theoretical Physics at Caltech and Director of the Institute for Quantum Information and Matter. ',
			href: '#',
            content: `For our inaugural event, we were honored to host Prof. John Preskill, the Richard P. Feynman Professor of Theoretical Physics at Caltech and Director of the Institute for Quantum Information and Matter. A pioneer in quantum error correction and quantum supremacy, Prof. Preskill shared insights into the current state of quantum development, potential applications of quantum computing, and his vision for the future of the field. The talk was followed by a social panel connecting students and researchers from UCLA and Caltech.`
		},
        {
			title: 'Talk: Leo Zhou',
			date: '01/24/2025',
			excerpt: '“Quantum Computational Advantages in Optimization” We thank Prof. Leo Zhou’s comprehensive and in-depth talk about quantum optimization and simulation. He included many recent exciting breakthroughs made by him and his collaborators. ',
			href: '#',
            content: `“Quantum Computational Advantages in Optimization” We thank Prof. Leo Zhou’s comprehensive and in-depth talk about quantum optimization and simulation. He included many recent exciting breakthroughs made by him and his collaborators. `
		},
        {
			title: 'UCLA x USC Quantum Seminar - #2',
			date: '11/22/2024',
			excerpt: 'We thank Prof. Luic Anderegg at USC for an insightful talk on laser-cooled molecules for quantum science and fundamental physics.',
			href: '#',
            content: `We thank Prof. Luic Anderegg at USC for an insightful talk on laser-cooled molecules for quantum science and fundamental physics. The discussion covered advancements in optical tweezer arrays for controlling molecular qubits, dipolar interactions, and quantum-state-specific collisions, highlighting their potential for quantum computing and precision tests of fundamental physics.`
		},
        {
			title: 'Talk: Andrei Faraon',
			date: '11/15/2024',
			excerpt: 'We thank Prof. Andrei Faraon for an engaging talk on the role of rare-earth ions in quantum science and technology.',
			href: '#',
            content: `We thank Prof. Andrei Faraon for an engaging talk on the role of rare-earth ions in quantum science and technology. He discussed how single and ensemble rare-earth ions in solid-state materials serve as optically addressable spin qubits, enabling quantum networking, storage, and processing. The talk covered applications in quantum transduction, entanglement, and many-body physics, highlighting research on ytterbium 171 in yttrium orthovanadate.`
		},
        {
			title: 'Talk: Makan Mohageg',
			date: '11/08/2025',
			excerpt: 'We were thrilled to host Dr. Makan Mohageg for a talk on the future of space-based quantum networking.',
			href: '#',
            content: `We were thrilled to host Dr. Makan Mohageg for a talk on the future of space-based quantum networking. He explored its transition from research to real-world applications, highlighting key use cases: secure communications, a global quantum internet, and the interplay of quantum mechanics and general relativity. Dr. Mohageg discussed two upcoming missions—Boeing’s Q4S for quantum entanglement-swapping in space and the SEAQUE mission for integrated-optical quantum systems—shedding light on the global landscape and the strategic role of US-led initiatives.`
		},
        {
			title: 'Talk: Di Luo',
			date: '10/10/2024',
			excerpt: '“Quantum Simulation meets Machine Learning”.',
			href: '#',
            content: `“Quantum Simulation meets Machine Learning”


We thank Prof. Di Luo for going in depth on his research at the intersection of Quantum Information and Artificial intelligence following his recent appointment as a full professor at UCLA.

`
		},
        {
			title: 'UCLA x USC Quantum Seminar - #1',
			date: '10/11/2024',
			excerpt: 'This talk explored how generative models infused with physics and symmetries can tackle the challenges of simulating high-dimensional quantum systems.',
			href: '#',
            content: `This talk explored how generative models infused with physics and symmetries can tackle the challenges of simulating high-dimensional quantum systems. The discussion highlighted applications in high-energy physics, quantum materials, and quantum computation. Additionally, the speaker presented recent advancements in physics-inspired machine learning and robotics, including generative models based on physical processes, neural network solvers for PDEs inspired by quantum principles, and optimizing multi-legged robots’ locomotion using many-body physics theory.`
		},
        {
			title: 'IBM x UCLA Quantum Workshop',
			date: '10/04/2024',
			excerpt: 'IBM Quantum and UCLA CQSE hosted a joint quantum computing workshop open to all levels, from novices to advanced researchers.',
			href: '#',
            content: `IBM Quantum and UCLA CQSE hosted a joint quantum computing workshop open to all levels, from novices to advanced researchers. The event featured expert-led presentations, interactive discussions, and hands-on workshops covering topics like quantum error correction, Qiskit tools, and quantum education. Key speakers included Luke Govia, Gavin Jones, Jason Cong, and Prineha Narang, who discussed IBM’s progress in quantum systems and UCLA’s quantum research initiatives. The workshop offered two specialized tracks: an advanced user session focused on teaching and research, and a beginner-friendly workshop introducing fundamental quantum concepts through hands-on Qiskit exercises. The event concluded with a crash course on Qiskit & Runtime Primitives, followed by an applied session on quantum chemistry simulations. Held in Engineering VI from 10 AM to 3 PM, the workshop provided an engaging learning experience for students, faculty, and researchers, with lunch included.`
		},
        {
			title: 'QCSA Industry Talk - IBM Qiskit Runtime',
			date: '06/03/2024',
			excerpt: 'Kate Marshall from IBM delivered a talk on Variational Quantum Algorithms (VQAs) and their applications in chemistry, AI, and condensed matter physics. ',
			href: '#',
            content: `Kate Marshall from IBM delivered a talk on Variational Quantum Algorithms (VQAs) and their applications in chemistry, AI, and condensed matter physics. She discussed how Qiskit Runtime enables efficient benchmarking, testing, and execution of VQAs on real IBM Quantum computers. The talk provided insights into leveraging near-term quantum computing alongside classical techniques to solve complex computational problems.`
		},
        {
			title: 'Talk: David Leibrandt',
			date: '05/29/2024',
			excerpt: 'Prof. David Leibrandt described a new experimental toolbox for quantum control of molecular ions. ',
			href: '#',
            content: `Prof. David Leibrandt described a new experimental toolbox for quantum control of molecular ions. The toolbox involves co-trapping a single molecular ion with an atomic "logic" ion, which facilitates sympathetic laser cooling and quantum-logic readout. As a demonstration, he reported the successful quantum-logic pure state preparation and detection of a single CaH+ molecule using Ca+ as the logic ion. Leibrandt further outlined plans to expand these techniques to explore rotational and vibrational transitions in diverse molecular ions, with applications in quantum sensing and fundamental symmetry violation research.`
		},
        {
			title: 'ANS x QCSA x PSTI Collaborative Research Seminar',
			date: '04/10/2025',
			excerpt: 'Dr. Ilon Joseph at Lawrence Livermore National Laboratory (LLNL) presented a Special Seminar on "Quantum Computing for Fusion Energy Science Applications." ',
			href: '#',
            content: `Dr. Ilon Joseph at Lawrence Livermore National Laboratory (LLNL) presented a Special Seminar on "Quantum Computing for Fusion Energy Science Applications." He discussed the potential of quantum computing to enhance computational power in various Fusion Energy Science (FES) areas. Dr. Joseph reviewed his team's work on developing and extending quantum algorithms for FES-relevant calculations, including simulating nonlinear and non-Hamiltonian dynamics, performing eigenvalue estimation, simulating nonlinear wave-wave interactions, and exploring chaotic dynamics. He also shared results from implementing toy models of these algorithms on current quantum hardware, demonstrating the fidelity of emerging quantum capabilities and highlighting the impact of noise models.`
		},
	];

	const pastScrollBy = (direction: number) => {
		const el = pastRef.current;
		if (!el) return;
		const scrollAmount = Math.max(el.clientWidth * 0.9, 300) * direction;
		el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
	};


	// keep track of scroll for accessible focus/indicator if desired
	useEffect(() => {
		const el = containerRef.current;
		if (!el) return;

		const handler = () => {
			// no-op for now; kept so we can extend behavior (e.g. updating an active indicator)
			// This runs on scroll but intentionally doesn't update state to avoid extra renders.
			return;
		};

		el.addEventListener('scroll', handler, { passive: true });
		return () => el.removeEventListener('scroll', handler);
	}, []);

	const scrollBy = (direction: number) => {
		const el = containerRef.current;
		if (!el) return;

		// Scroll by visible width to move one "page" (works for 1/2/3 visible cards)
		const scrollAmount = Math.max(el.clientWidth * 0.9, 300) * direction;
		el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
	};

	return (
		<div className="min-h-screen bg-slate-50">
			<MainWebsiteHeader/>
			<main className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
				<h2 className="text-center text-3xl sm:text-4xl font-semibold text-blue-900 mb-8">
					Upcoming Events
				</h2>

				<div className="relative overflow-visible ">
					{/* Left arrow placed outside the cards */}
					<button
						aria-label="previous"
						onClick={() => scrollBy(-1)}
						className="absolute top-1/2 -translate-y-1/2 -left-8 md:-left-12 z-20 flex items-center justify-center h-12 w-12 text-blue-800 hover:text-blue-900 focus:outline-none"
					>
						<span className="text-6xl">‹</span>
					</button>

					<div
						ref={containerRef}
						className="flex gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth py-6 px-6 sm:px-0"
						style={{ WebkitOverflowScrolling: 'touch' }}
						role="list"
						aria-label="Upcoming events carousel"
					>
						{eventsData.map((e, i) => (
							<div key={i} className="snap-start flex-shrink-0 w-full sm:w-[46%] lg:w-[31%] ">
								{/* aura wrapper */}
								<div className="relative">
									<div aria-hidden className="absolute inset-0 rounded-md" style={{ boxShadow: '0 10px 30px rgba(49,100,180,0.12)' }} />

									<article
										role="listitem"
										className="relative bg-white rounded-md p-8"
										style={{
											boxShadow: '0 10px 24px rgba(14,57,106,0.06)',
											borderTop: '1px solid rgba(14,57,106,0.02)'
										}}
									>
										<div className="flex flex-col items-start gap-6">
											<div className="text-blue-900  text-6xl sm:text-6xl leading-none font-kantumruy text-[#234285]">
												<div>{e.datePrimary}</div>
												<div className="text-4xl mt-3 font-bold font-kantumruy text-[#234285]">{e.dateSecondary}</div>
											</div>

											<div>
												<h3 className="text-2xl mb-2 font-kantumruy text-[#234285]">
													{e.title}
												</h3>
												<p className="text-slate-600 font-semibold font-kantumruy text-[#234285]">{e.location}</p>
											</div>
										</div>
									</article>
								</div>
							</div>
						))}
					</div>

					{/* Right arrow placed outside the cards */}
					<button
						aria-label="next"
						onClick={() => scrollBy(1)}
						className="absolute top-1/2 -translate-y-1/2 -right-8 md:-right-12 z-20 flex items-center justify-center h-12 w-12 text-blue-800 hover:text-blue-900 focus:outline-none"
					>
						<span className="text-6xl">›</span>
					</button>
				</div>
			</main>

			{/* Signature Events - matches the pasted image layout: stacked cards with image on left and content on right */}
			<section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
				<h2 className="text-center text-3xl sm:text-4xl font-semibold mb-8 font-kantumruy text-[#234285]">
					Signature Events
				</h2>
				<div className="space-y-8 font-kantumruy text-[#234285]">
					{[
						{
							img: '/images/ucla_usc.png',
							title: 'UCLA x USC',
							sub: 'Monthly seminar series between UCLA and USC on novel quantum science and engineering research. More information can be found on link below!',
						},
						{
							img: '/images/ucla_caltech.png',
							title: 'EntangleTalks LA',
							sub: 'Monthly seminar and networking series between UCLA and Caltech on quantum information theory and computing.',
						},
						{
							img: '/images/ucla_acm.png',
							title: 'QCSA x ACM Introductory Workshop',
							sub: 'Are you curious about quantum computing but not sure where to start? Join us on every Tuesdays from 6pm-8pm in the Tesla room, excluding week 4 and week 10.',
						},
					].map((s, idx) => (
						<article key={idx} className="bg-white rounded-md shadow-sm border border-transparent hover:shadow-md transition-shadow">
							<div className="flex flex-col md:flex-row items-stretch">
								{/* Image pane */}
								<div className="md:w-1/3 flex-shrink-0 bg-slate-100 rounded-t-md md:rounded-l-md md:rounded-tr-none flex items-center justify-center">
									<Image src={s.img} alt={s.title} width={340} height={260} className="object-contain max-w-none max-h-none" />
								</div>
								{/* Content pane */}
								<div className="md:w-2/3 p-6 border-l md:border-l-0 md:border-l-0">
									<div className="flex flex-col h-full justify-between">
										<div>
											<h3 className="text-lg font-semibold mb-2 font-kantumruy text-[#234285]">{s.title}</h3>
											<p className=" mb-4 text-lg font-kantumruy text-[#234285]">{s.sub}</p>
										</div>
										<div className="pt-2">
											<Link
												className="bg-blue-800 text-white px-4 py-2 rounded shadow-sm hover:bg-blue-900"
												href={
													s.img.includes('ucla_caltech.png')
														? '/ucla_caltech'
														: s.img.includes('ucla_usc.png')
														? '/ucla_usc'
														: '/ucla_acm'
												}
											>
												Learn More
											</Link>
										</div>
									</div>
								</div>
							</div>
						</article>
					))}
				</div>
			</section>

			{/* Past event details modal */}
			{selectedPast && (
				<div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60" onClick={() => setSelectedPast(null)} style={{ backdropFilter: 'blur(2px)'}}>
					<div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-auto p-6" onClick={(e) => e.stopPropagation()}>
						<div className="flex items-start justify-between gap-4">
							<div>
								<h3 className="text-2xl font-semibold mb-2">{selectedPast.title}</h3>
								<p className="text-sm text-slate-600 mb-4">{selectedPast.date}</p>
								<div className="prose max-w-none text-slate-700">{selectedPast.content}</div>
							</div>
							<button className="text-slate-600 hover:text-slate-800" onClick={() => setSelectedPast(null)}>Close</button>
						</div>
					</div>
				</div>
			)}

			{/* (removed duplicate gallery/lightbox + misplaced Past Events; Past Events will be rendered after the calendar+gallery below) */}

			{/* Event Calendar - embedded Google Calendar and .ics download */}
			<section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
				<h2 className="text-center text-3xl sm:text-4xl font-semibold mb-6 font-kantumruy text-[#234285]">Event Calendar</h2>
				<div className="bg-white rounded-lg shadow-lg p-6" style={{ boxShadow: '0 8px 24px rgba(14,57,106,0.06)', border: '1px solid rgba(14,57,106,0.06)' }}>
					{/* <p className="text-center text-slate-600 mb-4">Browse our calendar below. You can subscribe or download the .ics file for your calendar app.</p> */}
					<div className="flex flex-col md:flex-row gap-4 items-start">
						<div className="w-full md:flex-1">
							<div className="rounded-md overflow-hidden border border-transparent">
								{/* Embed Google Calendar. Using the public embed for quantum.ucla@gmail.com */}
								<iframe
									title="QCSA Event Calendar"
									src="https://calendar.google.com/calendar/embed?src=70e5c433011f8f8b954b98c30728ec1833d5e56a7fb0602ad097bf39a302f695%40group.calendar.google.com&ctz=Europe%2FBerlin"
									className="w-full h-[520px] border-0"
									loading="lazy"
								/>
							</div>
						</div>
						{/* <div className="md:w-64 flex-shrink-0">
							<div className="bg-slate-50 rounded-md p-4 h-full flex flex-col justify-between">
								<div>
									<h4 className="font-semibold mb-2">Subscribe / Download</h4>
									<p className="text-sm text-slate-600 mb-4">Subscribe to the QCSA calendar or download the .ics file to import into your calendar app.</p>
									<a
										href="https://www.google.com/calendar/render?cid=quantum.ucla%40gmail.com"
										target="_blank"
										rel="noreferrer"
										className="inline-block bg-white border border-blue-800 text-blue-800 px-3 py-2 rounded mb-3 w-full text-center hover:bg-blue-50"
									>
										Subscribe in Google
									</a>
									<a
										href="https://calendar.google.com/calendar/ical/quantum.ucla%40gmail.com/public/basic.ics"
										download
										className="inline-block bg-blue-800 text-white px-3 py-2 rounded w-full text-center hover:bg-blue-900"
									>
										Download .ics
									</a>
								</div>
								<div className="text-xs text-slate-500 mt-4">Calendar: quantum.ucla@gmail.com</div>
							</div>
						</div> */}
					</div>
				</div>
			</section>
            <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
				<h2 className="text-center text-3xl sm:text-4xl font-semibold mb-6 font-kantumruy text-[#234285]">Gallery</h2>

				{/* Thumbnails grid */}
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
					{/* Top row: first five thumbnails */}
					{['/images/gallery1.png','/images/gallery2.png','/images/gallery3.png'].map((src, i) => (
						<div key={i} className="overflow-hidden rounded-lg bg-white shadow-sm">
							<Image src={src} alt={`Gallery ${i+1}`} width={1200} height={800} className="w-full h-48 sm:h-44 md:h-56 object-cover" loading="lazy" />
						</div>
					))}

					{/* Bottom row: two larger thumbnails */}
					<div className="overflow-hidden rounded-lg bg-white shadow-sm sm:col-span-2">
						<Image src={'/images/gallery4.png'} alt={'Gallery 4'} width={800} height={900} className="w-full h-64 md:h-80 object-cover" loading="lazy" />
					</div>

					<div className="overflow-hidden rounded-lg bg-white shadow-sm">
						<Image src={'/images/gallery5.png'} alt={'Gallery 5'} width={800} height={600} className="w-full h-64 md:h-80 object-cover" loading="lazy" />
					</div>
				</div>

				<div className="mt-8 flex justify-center">
					<button
						className="bg-blue-800 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-900 font-kantumruy text-lg"
						onClick={() => setModalOpen(true)}
					>
						Show All
					</button>
				</div>
			</section>

			{/* Lightbox modal (grid of larger images) */}
			{modalOpen && (
				<div className="fixed inset-0 z-50 flex items-start justify-center p-6 bg-black/60">
					<div className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-auto p-6">
						<div className="flex items-center justify-between mb-4">
							<h3 className="text-lg font-semibold">Gallery</h3>
							<button className="text-slate-600 hover:text-slate-800" onClick={() => setModalOpen(false)}>Close</button>
						</div>
						<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
							{['/images/gallery1.png','/images/gallery2.png','/images/gallery3.png','/images/gallery4.png','/images/gallery5.png'].map((src, i) => (
								<div key={i} className="rounded-lg overflow-hidden bg-slate-100">
									<Image src={src} alt={`Gallery large ${i+1}`} width={800} height={900} className="w-full h-56 md:h-72 object-cover" loading="lazy" />
								</div>
							))}
						</div>
					</div>
				</div>
			)}

			{/* Past Events carousel (placed after gallery) */}
			<section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
				<h2 className="text-center text-3xl sm:text-4xl font-semibold text-blue-900 mb-8">Past Events</h2>

				<div className="relative">
					<button
						aria-label="previous past"
						onClick={() => pastScrollBy(-1)}
						className="absolute top-1/2 -translate-y-1/2 -left-8 md:-left-12 z-20 flex items-center justify-center h-12 w-12 text-blue-800 hover:text-blue-900 focus:outline-none"
					>
						<span className="text-6xl">‹</span>
					</button>

					<div ref={pastRef} className="flex gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth py-6 px-6 sm:px-0" role="list" aria-label="Past events carousel">
						{pastEvents.map((p, idx) => (
							<div key={idx} className="snap-start flex-shrink-0 w-full sm:w-[46%] lg:w-[31%]">
								<div className="relative">
									{/* light blue aura */}
									<div aria-hidden className="absolute inset-0 rounded-md" style={{ boxShadow: '0 10px 30px rgba(49,100,180,0.12)' }} />
									<article className="relative rounded-md p-6" style={{ backgroundColor: 'hsl(215,100%,98%)', boxShadow: '0 10px 24px rgba(14,57,106,0.06)', borderTop: '1px solid rgba(14,57,106,0.02)' }}>
										<h3 className="text-lg text-[#234285] mb-4 font-kantumruy">{p.title}</h3>
										<p className="text-sm text-slate-600 mb-1 font-kantumruy text-[#234285]">{p.date}</p>
										<p className="mb-4 font-kantumruy text-[#234285]">{p.excerpt}</p>
										<button onClick={() => setSelectedPast(p)} className="text-blue-800 underline">Read More</button>
									</article>
								</div>
							</div>
						))}
					</div>

					<button
						aria-label="next past"
						onClick={() => pastScrollBy(1)}
						className="absolute top-1/2 -translate-y-1/2 -right-8 md:-right-12 z-20 flex items-center justify-center h-12 w-12 text-blue-800 hover:text-blue-900 focus:outline-none"
					>
						<span className="text-6xl">›</span>
					</button>
				</div>
			</section>
                            
			<MainWebsiteFooter />
		</div>
	);
}

