"use client";

import { useRef, useEffect, useState } from "react";
import MainWebsiteFooter from "../Components/mainWebsiteFooter";
import Image from 'next/image';
import Link from 'next/link';
import MainWebsiteHeader from "../Components/mainWebsiteHeader";
import { motion } from 'framer-motion';

type UpcomingEvent = { datePrimary: string; dateSecondary: string; title: string; location: string; time: string; description: string; link?: string; image?: string; speakerImage?: string; transportationLink?: string };

const eventsData: UpcomingEvent[] = [
	{
		datePrimary: '28',
		dateSecondary: 'April',
		title: 'The Road to Quantum Advantage',
		location: 'Lauristen 269',
		time: 'April 28, 2026, 4:00PM – 5:00PM',
		description: `I will review recent advances in quantum computing across hardware, algorithms, and fault-tolerant architectures, and assess the progress toward realizing useful applications.`,
		image: '/images/john-preskill.png',
		speakerImage: '/images/jp-head-ann.jpg',
	},
	{
		datePrimary: '30',
		dateSecondary: 'April',
		title: 'Entangle Talks - Dr. Kai-Chi Chang',
		location: 'E-IV Maxwell Room #57-124',
		time: 'April 30, 2026, 2:30PM – 3:30PM',
		description: `Explore the synergy of quantum optical physics and applications of photonic qudit on quantum information processing and quantum communication tasks.\n\nLearn about:\n• How high-dimensional entanglement in the energy-time degree of freedom offers unique advantages over binary qubit systems\n• Telecom photons for quantum measurements\n• Testing the uncertainty principle in the time-frequency domain\n• Verification of 648-dimensional Hilbert space entanglement with frequency-time entangled photons\n• Applications in quantum communication\n• Entanglement distribution and quantum key distribution with quantum frequency combs\n\nPizza and refreshments will be served!`,
		image: '/images/Dr.Kai-Chi-Entangle-Talks.png',
		link: 'https://docs.google.com/forms/d/e/1FAIpQLScjNbKx6COi9hRuzU1oqDmETTdGeB_Ok5gmFMzYpOXGSVuMow/viewform?usp=dialog'
	}
];

export default function EventsPage() {
	const containerRef = useRef<HTMLDivElement | null>(null);
    const [modalOpen, setModalOpen] = useState(false);

	// State for upcoming events modal
	const [selectedEvent, setSelectedEvent] = useState<UpcomingEvent | null>(null);

	// past events carousel ref and data
	const pastRef = useRef<HTMLDivElement | null>(null);

	type PastEvent = { title: string; date: string; excerpt: string; href: string; content?: string };
	const [selectedPast, setSelectedPast] = useState<PastEvent | null>(null);

	const pastEvents: PastEvent[] = [
		{
			title: 'Talk by Dolev Bluvstein: Atomic quantum processors and the error-correction frontier',
			date: '03/02/2026',
			excerpt: 'Dolev Bluvstein presented on the development of quantum computing with reconfigurable arrays of neutral atoms and their use for quantum processing with logical qubits, heralding a transition to error-corrected quantum processing.',
			href: 'https://luma.com/fksa8rvm',
			content: `Abstract: Quantum computers open new scientific avenues, from exploring complex quantum mechanical systems to new computational paradigms, but face the fundamental challenge of decoherence. Remarkably, decoherence can be prevented by creating highly entangled states of physical qubits that encode an error-corrected logical qubit. Here we will describe the development of quantum computing with reconfigurable arrays of neutral atoms and their use for quantum processing with logical qubits. Quantum processing in this approach is based on the coherent transport of atoms shuttled by optical tweezers, enabling any-to-any connectivity, high-fidelity programmable logic, and mid-circuit processing within a zoned architecture. Logical qubit processing is greatly facilitated by parallel control and transversal operations, and is used for experiments ranging from entangling logical qubits to their use for precise simulation of quantum scrambling. Core physical mechanisms for achieving deep-circuit, universal algorithms with logical qubits are identified, and these are leveraged into new techniques that greatly reduce overheads for large-scale computation. These results, alongside other recent advances, herald a transition to error-corrected quantum processing, establishing foundations that can enable future large-scale quantum computers and their useful applications.\n\nBio: Dolev Bluvstein did his PhD in Physics at Harvard University. During his PhD he developed an approach to quantum computing based on reconfigurable atom arrays and used this for the world's first error-corrected algorithms. He came to Caltech as a faculty where he is working with other faculty members to build the world's first useful quantum computer.`,
		},
		{
			title: 'DataX Center for Quantum Data Sciences Kickoff & CQSE Annual Meeting',
			date: '02/23/2026',
			excerpt: 'A showcase of UCLA\'s quantum ecosystem including our research centers, workshops, and educational programs.',
			href: 'https://forms.gle/dtKjyX2o6BWMuRQN6',
			content: `The DataX Center for Quantum Data Sciences Kickoff & CQSE Annual Meeting was held at UCLA from 1:30-4 PM PST. This event showcased UCLA's thriving quantum ecosystem, featuring presentations on our research centers, hands-on workshops, and innovative educational programs. Attendees had the opportunity to learn about cutting-edge quantum research and connect with faculty, researchers, and students passionate about quantum computing and data sciences.`,
		},
		{
			title: 'Quantum Career Fair',
			date: '02/20/2026',
			excerpt: 'Explore different quantum computing companies and research labs, network with professionals, and discover internship and job opportunities in the quantum industry.',
			href: '/qcf',
			content: `The Quantum Career Fair was held at UCLA from 1-5 PM PST, bringing together leading quantum computing companies and research labs with students and professionals. Attendees explored exciting career opportunities, networked with industry professionals, and discovered internships and full-time positions in the rapidly growing quantum industry. This event provided invaluable connections between the quantum workforce and the next generation of quantum talent.`,
		},
		{
			title: 'Mentorship Program with QISCA',
			date: '11/14/2025',
			excerpt: 'Mentorship Program joint with QISCA, the Korean Quantum Computing Club, to connect with experienced mentors in quantum computing and get guidance on your quantum journey!',
			href: 'https://docs.google.com/forms/d/e/1FAIpQLScYwmQ5A6_YCOM-jSDCUD1zY7WP900A4CWpnd9FTVCPw_qzFg/viewform?usp=send_form',
			content: `Mentorship Program joint with QISCA, the Korean Quantum Computing Club, to connect with experienced mentors in quantum computing and get guidance on your quantum journey! This collaborative program was held on Zoom at 7:00 PM (PST) and provided valuable opportunities for students to receive personalized guidance from experienced professionals in the quantum computing field.`,
		},
		{
			title: 'QuARC 2025',
			date: '11/10-12/2025',
			excerpt: 'The Quantum Architecture Conference (QuARC) 2025 brought together researchers, students, and industry professionals to explore the latest advances in quantum computing architecture.',
			href: 'https://quarc.squarespace.com/',
			content: `The Quantum Architecture Conference (QuARC) 2025 brought together researchers, students, and industry professionals to explore the latest advances in quantum computing architecture. The conference featured keynote presentations, technical sessions, poster presentations, and networking events. It was a premier gathering of the quantum computing community at the James West Alumni Center, UCLA.`,
		},
		{
			title: 'Qiskit Fall Fest',
			date: '10/18-19/2025',
			excerpt: 'UCLA hosted a two-day celebration of quantum computing featuring hands-on workshops with IBM Qiskit, technical talks from industry experts, networking opportunities, and exciting challenges.',
			href: 'https://qiskit-fall-fest-ucla.vercel.app',
			content: `UCLA's Qiskit Fall Fest was a two-day celebration of quantum computing! This event featured hands-on workshops with IBM Qiskit, technical talks from industry experts, networking opportunities, and exciting challenges. Whether you were a beginner or experienced quantum developer, there was something for everyone. Prizes and swag were available throughout the event.`,
		},
		{
			title: 'QCSA Fall GM',
			date: '10/06/2025',
			excerpt: 'Our Fall General Meeting was the perfect opportunity to learn about QCSA\'s mission, meet our board members, and connect with fellow quantum enthusiasts.',
			href: '#',
			content: `Our Fall General Meeting was the perfect opportunity to learn about QCSA's mission, meet our board members, and connect with fellow quantum enthusiasts. We presented our plans for the academic year, including workshops, speaker series, hackathons, and collaborative research opportunities!`,
		},
		{
			title: 'QCSA at Enormous Activities Fair',
			date: '09/22/2025',
			excerpt: 'We met students at UCLA\'s Enormous Activities Fair! The QCSA team shared information about quantum computing and opportunities to get involved in our community.',
			href: '#',
			content: `We were at UCLA's Enormous Activities Fair! Students came to meet the QCSA team, learn about quantum computing, and discover opportunities to get involved in our community. We shared information about our workshops, seminars, and upcoming events. Whether new to quantum or already passionate about it, students learned about our organization and mission.`,
		},
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

	// Handle keyboard navigation for modals
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				if (selectedPast) {
					setSelectedPast(null);
				}
				if (selectedEvent) {
					setSelectedEvent(null);
				}
			}
		};

		if (selectedPast || selectedEvent) {
			document.addEventListener('keydown', handleKeyDown);
			// Prevent background scrolling when modal is open
			document.body.style.overflow = 'hidden';
		}

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
			document.body.style.overflow = 'unset';
		};
	}, [selectedPast, selectedEvent]);

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
				<motion.h2 
					className="text-center text-4xl font-semibold text-blue-900 mb-8"
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					Upcoming Events
				</motion.h2>

				{eventsData.length === 0 ? (
					<motion.div 
						className="text-center py-16"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
					>
						<p className="text-xl text-slate-600 font-kantumruy">
							No upcoming events at this time. Check back soon!
						</p>
					</motion.div>
				) : (
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
							<motion.div 
								key={i} 
								className="snap-start flex-shrink-0" 
								style={{ width: '380px', height: '456px' }}
								initial={{ opacity: 0, scale: 0.9, y: 20 }}
								whileInView={{ opacity: 1, scale: 1, y: 0 }}
								viewport={{ once: true, margin: "-100px" }}
								transition={{ delay: i * 0.1, duration: 0.5 }}
								whileHover={{ y: -10, transition: { duration: 0.3 } }}
							>
								{/* aura wrapper */}
								<div className="relative w-full h-full">
									<div aria-hidden className="absolute inset-0 rounded-md" style={{ boxShadow: '0 10px 30px rgba(49,100,180,0.12)' }} />

								<article
									role="listitem"
									onClick={() => setSelectedEvent(e)}
									className="relative bg-white rounded-md p-8 w-full h-full flex flex-col cursor-pointer hover:shadow-xl transition-shadow"
									style={{
										boxShadow: '0 10px 24px rgba(14,57,106,0.06)',
										borderTop: '1px solid rgba(14,57,106,0.02)'
									}}
								>
									{/* Info icon in top right corner */}
									<button
										onClick={(ev) => {
											ev.stopPropagation();
											setSelectedEvent(e);
										}}
										className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-[#234285] hover:bg-blue-200 hover:text-blue-900 transition-colors duration-200 "
										aria-label={`View details for ${e.title}`}
										title="Click for more information"
									>
										<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
											<path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
										</svg>
									</button>

									<div className="flex flex-col items-start gap-6">
											<div className="text-blue-900  text-6xl sm:text-6xl leading-none font-kantumruy text-[#234285]">
												<div style={{width: '163px', height: '83px'}}><strong>{e.datePrimary}</strong></div>
												<div style={{width: '163px', height: '83px'}} className="text-4xl mt-3 font-bold font-kantumruy text-[#234285]">{e.dateSecondary}</div>
											</div>

											<div>
												<h3 className="text-4xl mb-4 font-kantumruy text-[#234285] line-clamp-3" style={{width: '285px'}}>
													{e.title}
												</h3>
												<p className="text-slate-600 font-semibold font-kantumruy text-[#234285] text-2xl mt-4" style={{width: '285px', height: '43px'}}>{e.location}</p>
											</div>
										</div>
									</article>
								</div>
							</motion.div>
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
				)}
			</main>

			{/* Upcoming event details modal */}
			{selectedEvent && (
				<div 
					className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60" 
					onClick={() => setSelectedEvent(null)} 
					style={{ backdropFilter: 'blur(2px)'}}
					role="dialog"
					aria-modal="true"
					aria-labelledby="upcoming-modal-title"
					aria-describedby="upcoming-modal-content"
				>
					<div className={`bg-white rounded-lg ${selectedEvent.image ? 'max-w-5xl' : 'max-w-3xl'} w-full max-h-[90vh] overflow-auto p-8`} onClick={(e) => e.stopPropagation()}>
						<div className="flex items-start justify-between gap-4">
							<div className="flex-grow">
								{/* Date badge */}
								<div className="inline-flex items-center gap-3 mb-4 bg-blue-50 px-4 py-2 rounded-md">
									<span className="text-5xl font-bold font-kantumruy text-[#234285]">{selectedEvent.datePrimary}</span>
									<span className="text-2xl font-semibold font-kantumruy text-[#234285]">{selectedEvent.dateSecondary}</span>
								</div>

								{/* Speaker headshot + title row */}
							{selectedEvent.speakerImage ? (
								<div className="flex items-center gap-5 mb-4">
									<img
										src={selectedEvent.speakerImage}
										alt="Speaker"
										className="w-20 h-20 rounded-full object-cover flex-shrink-0 shadow-md border-2 border-blue-100"
									/>
									<h3 id="upcoming-modal-title" className="text-3xl font-bold font-kantumruy text-[#234285] break-words">{selectedEvent.title}</h3>
								</div>
							) : (
								<h3 id="upcoming-modal-title" className="text-3xl font-bold mb-4 font-kantumruy text-[#234285] break-words">{selectedEvent.title}</h3>
							)}
							
							<div className="space-y-2 mb-4">
								<p className="text-lg text-slate-700 font-kantumruy flex items-center gap-2">
									<span className="font-semibold">📍 Location:</span> {selectedEvent.location}
								</p>
								<p className="text-lg text-slate-700 font-kantumruy flex items-center gap-2">
									<span className="font-semibold">🕐 Time:</span> {selectedEvent.time}
								</p>
							</div>
							
							<div id="upcoming-modal-content" className="prose max-w-none text-slate-700 font-kantumruy leading-relaxed text-lg whitespace-pre-line">
									{selectedEvent.description}
								</div>

								{/* Show image if available */}
								{selectedEvent.image && (
									<div className="mt-6">
										{selectedEvent.link ? (
											<a
												href={selectedEvent.link}
												target="_blank"
												rel="noopener noreferrer"
												className="block cursor-pointer transition-opacity hover:opacity-90"
												title="Click to register"
											>
												<img
													src={selectedEvent.image}
													alt={selectedEvent.title}
													className="w-full max-w-full rounded-lg shadow-lg"
												/>
											</a>
										) : (
											<img
												src={selectedEvent.image}
												alt={selectedEvent.title}
												className="w-full max-w-full rounded-lg shadow-lg"
											/>
										)}
									</div>
								)}

								{/* Event link buttons if available */}
								{(selectedEvent.link || selectedEvent.transportationLink) && (
									<div className="mt-6 flex flex-col sm:flex-row gap-3">
										{selectedEvent.link && (
											<a
												href={selectedEvent.link}
												target="_blank"
												rel="noopener noreferrer"
												className="inline-block bg-[#234285] text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-900 text-lg font-semibold transition-colors font-kantumruy text-center"
											>
												Visit Event Website →
											</a>
										)}
										{selectedEvent.transportationLink && (
											<a
												href={selectedEvent.transportationLink}
												target="_blank"
												rel="noopener noreferrer"
												className="inline-block bg-[#234285] text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-900 text-lg font-semibold transition-colors font-kantumruy text-center"
											>
												Transportation Form →
											</a>
										)}
									</div>
								)}
							</div>
							<button 
								className="text-slate-600 hover:text-slate-800 focus:text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:ring-offset-2 rounded p-2 transition-colors duration-200 flex-shrink-0" 
								onClick={() => setSelectedEvent(null)}
								aria-label="Close modal"
							>
								<span aria-hidden="true" className="text-2xl">✕</span>
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Signature Events - matches the pasted image layout: stacked cards with image on left and content on right */}
			<section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
				<motion.h2 
					className="text-center text-3xl sm:text-4xl font-semibold mb-8 font-kantumruy text-[#234285]" 
					style={{height: '65px'}}
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-100px" }}
					transition={{ duration: 0.6 }}
				>
					Signature Events
				</motion.h2>
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
							img: '/images/acmquantum.svg',
							title: 'QCSA x ACM Introductory Workshop',
							sub: 'Are you curious about quantum computing but not sure where to start? Join our workshops every Wednesday from 6pm-8pm in Boelter 2444!',
						},
						{
							img: '/images/Qube.png',
							title: 'Quantum Computing Application in BioChemistry',
							sub: 'Seminar and workshop on quantum computing applications in biochemistry. Featuring speakers from USC and IBM at CNSI + a Qiskit workshop on modeling solubility.',
						},
					].map((s, idx) => (
						<motion.article 
							key={idx} 
							className="rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow overflow-hidden"
							initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true, margin: "-100px" }}
							transition={{ delay: idx * 0.1, duration: 0.6 }}
							whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
						>
							<div className="flex flex-col md:flex-row items-stretch">
								{/* Image pane */}
								<motion.div 
									className="md:w-1/2 flex-shrink-0 "
									whileHover={{ scale: 1.05 }}
									transition={{ duration: 0.3 }}
								>
									<Image src={s.img} alt={s.title} width={518} height={368} className="w-full h-full object-cover" />
								</motion.div>
								{/* Content pane */}
								<div className="md:w-1/2 flex flex-col justify-center p-8 bg-white">
									<motion.h3 
										className="text-3xl font-bold mb-4 font-kantumruy text-[#234285]"
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true }}
										transition={{ delay: idx * 0.1 + 0.2, duration: 0.5 }}
									>
										{s.title}
									</motion.h3>
									<motion.p 
										className="mb-6 text-lg leading-relaxed font-kantumruy text-[#234285]"
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true }}
										transition={{ delay: idx * 0.1 + 0.3, duration: 0.5 }}
									>
										{s.sub}
									</motion.p>
									<motion.div
										initial={{ opacity: 0, scale: 0.9 }}
										whileInView={{ opacity: 1, scale: 1 }}
										viewport={{ once: true }}
										transition={{ delay: idx * 0.1 + 0.4, duration: 0.4 }}
									>
										<motion.div
											whileHover={{ scale: 1.05 }}
											whileTap={{ scale: 0.95 }}
										>
											<Link
												className="inline-block bg-[#234285] text-white px-6 py-3 rounded-sm shadow-md hover:bg-blue-900 text-lg font-bold transition-colors"
												href={
													s.img.includes('ucla_caltech.png')
														? '/ucla_caltech'
														: s.img.includes('ucla_usc.png')
														? '/ucla_usc'
														: s.img.includes('Qube.png')
														? '/qube'
														: '/ucla_acm'
												}
											>
												Learn More
											</Link>
										</motion.div>
									</motion.div>
								</div>
							</div>
						</motion.article>
					))}
				</div>
			</section>

			{/* Past event details modal */}
			{selectedPast && (
				<div 
					className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60" 
					onClick={() => setSelectedPast(null)} 
					style={{ backdropFilter: 'blur(2px)'}}
					role="dialog"
					aria-modal="true"
					aria-labelledby="modal-title"
					aria-describedby="modal-content"
				>
					<div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-auto p-6" onClick={(e) => e.stopPropagation()}>
						<div className="flex items-start justify-between gap-4">
							<div className="flex-grow">
								<h3 id="modal-title" className="text-2xl font-semibold mb-2 font-kantumruy text-[#234285]">{selectedPast.title}</h3>
								<p className="text-sm text-slate-600 mb-4 font-kantumruy">{selectedPast.date}</p>
								<div id="modal-content" className="prose max-w-none text-slate-700 font-kantumruy leading-relaxed">{selectedPast.content}</div>
								
								{/* Event website link button if available and not just '#' */}
								{selectedPast.href && selectedPast.href !== '#' && (
									<div className="mt-6">
										<a
											href={selectedPast.href}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-block bg-[#234285] text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-900 text-lg font-semibold transition-colors font-kantumruy"
										>
											Visit Event Website →
										</a>
									</div>
								)}
							</div>
							<button 
								className="text-slate-600 hover:text-slate-800 focus:text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:ring-offset-2 rounded p-2 transition-colors duration-200 flex-shrink-0" 
								onClick={() => setSelectedPast(null)}
								aria-label="Close modal"
							>
								<span aria-hidden="true">✕</span>
							</button>
						</div>
					</div>
				</div>
			)}

			{/* (removed duplicate gallery/lightbox + misplaced Past Events; Past Events will be rendered after the calendar+gallery below) */}

			{/* Event Calendar - embedded Google Calendar and .ics download */}
			<section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
				<motion.h2 
					className="text-center text-4xl font-bold mb-6 font-kantumruy text-[#234285]"
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-100px" }}
					transition={{ duration: 0.6 }}
				>
					Event Calendar
				</motion.h2>
				<motion.div 
					className="bg-white rounded-lg shadow-lg p-6" 
					style={{ boxShadow: '0 8px 24px rgba(14,57,106,0.06)', border: '1px solid rgba(14,57,106,0.06)' }}
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: 0.2, duration: 0.6 }}
				>
					{/* <p className="text-center text-slate-600 mb-4">Browse our calendar below. You can subscribe or download the .ics file for your calendar app.</p> */}
					<div className="flex flex-col md:flex-row gap-4 items-start">
						<div className="w-full md:flex-1">
							<div className="rounded-md overflow-hidden border border-transparent">
								{/* Embed Google Calendar. Using the public embed for quantum.ucla@gmail.com */}
								<iframe
									title="QCSA Event Calendar"
									src="https://calendar.google.com/calendar/embed?src=70e5c433011f8f8b954b98c30728ec1833d5e56a7fb0602ad097bf39a302f695%40group.calendar.google.com&ctz=America%2FLos_Angeles"
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
				</motion.div>
			</section>
            <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
				<motion.h2 
					className="text-center text-4xl font-bold mb-6 font-kantumruy text-[#234285]"
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-100px" }}
					transition={{ duration: 0.6 }}
				>
					Gallery
				</motion.h2>

				{/* Thumbnails grid */}
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
					{/* Top row: first five thumbnails */}
					{['/images/gallery1.png','/images/gallery2.png','/images/gallery3.png'].map((src, i) => (
						<motion.div 
							key={i} 
							className="overflow-hidden rounded-lg bg-white shadow-sm"
							initial={{ opacity: 0, scale: 0.8, y: 30 }}
							whileInView={{ opacity: 1, scale: 1, y: 0 }}
							viewport={{ once: true, margin: "-50px" }}
							transition={{ delay: i * 0.1, duration: 0.5 }}
							whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
						>
							<Image src={src} alt={`Gallery ${i+1}`} width={1200} height={800} className="w-full h-48 sm:h-44 md:h-56 object-cover" loading="lazy" />
						</motion.div>
					))}

					{/* Bottom row: two larger thumbnails */}
					<motion.div 
						className="overflow-hidden rounded-lg bg-white shadow-sm sm:col-span-2"
						initial={{ opacity: 0, scale: 0.8, y: 30 }}
						whileInView={{ opacity: 1, scale: 1, y: 0 }}
						viewport={{ once: true, margin: "-50px" }}
						transition={{ delay: 0.3, duration: 0.5 }}
						whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
					>
						<Image src={'/images/gallery4.png'} alt={'Gallery 4'} width={800} height={900} className="w-full h-64 md:h-80 object-cover" loading="lazy" />
					</motion.div>

					<motion.div 
						className="overflow-hidden rounded-lg bg-white shadow-sm"
						initial={{ opacity: 0, scale: 0.8, y: 30 }}
						whileInView={{ opacity: 1, scale: 1, y: 0 }}
						viewport={{ once: true, margin: "-50px" }}
						transition={{ delay: 0.4, duration: 0.5 }}
						whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
					>
						<Image src={'/images/gallery5.png'} alt={'Gallery 5'} width={800} height={600} className="w-full h-64 md:h-80 object-cover" loading="lazy" />
					</motion.div>
				</div>

				<motion.div 
					className="mt-8 flex justify-center"
					initial={{ opacity: 0, scale: 0.9 }}
					whileInView={{ opacity: 1, scale: 1 }}
					viewport={{ once: true }}
					transition={{ delay: 0.5, duration: 0.5 }}
				>
					<motion.button
						className="bg-[#234285] text-white px-8 py-3 rounded-sm shadow-md font-bold font-kantumruy text-2xl font-kantumruy transition-colors"
						onClick={() => setModalOpen(true)}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						Show All
					</motion.button>
				</motion.div>
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
				<motion.h2 
					className="text-center text-4xl font-kantumruy text-blue-900 mb-8"
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-100px" }}
					transition={{ duration: 0.6 }}
				>
					Past Events
				</motion.h2>

				<div className="relative">
					<button
						aria-label="View previous past events"
						onClick={() => pastScrollBy(-1)}
						className="absolute top-1/2 -translate-y-1/2 -left-4 sm:-left-8 md:-left-12 z-20 flex items-center justify-center h-12 w-12 text-blue-800 hover:text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:ring-offset-2 rounded-full transition-colors duration-200"
					>
						<span className="text-4xl sm:text-6xl" aria-hidden="true">‹</span>
					</button>

					<div ref={pastRef} className="flex gap-4 sm:gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth py-6 px-2 sm:px-6 md:px-0" role="list" aria-label="Past events carousel">
						{pastEvents.map((p, idx) => (
							<motion.div 
								key={idx} 
								className="snap-start flex-shrink-0 w-72 sm:w-80 md:w-[297px]" 
								style={{ height: '327px' }}
								initial={{ opacity: 0, scale: 0.9, y: 20 }}
								whileInView={{ opacity: 1, scale: 1, y: 0 }}
								viewport={{ once: true, margin: "-50px" }}
								transition={{ delay: Math.min(idx * 0.05, 0.5), duration: 0.5 }}
								whileHover={{ y: -10, scale: 1.02, transition: { duration: 0.3 } }}
							>
								<div className="relative w-full h-full">
									{/* light blue aura */}
									<div aria-hidden className="absolute inset-0 rounded-md" style={{ boxShadow: '0 10px 30px rgba(49,100,180,0.12)' }} />
									<article className="relative rounded-md p-4 sm:p-6 w-full h-full flex flex-col overflow-hidden" style={{ backgroundColor: 'hsl(215,100%,98%)', boxShadow: '0 10px 24px rgba(14,57,106,0.06)', borderTop: '1px solid rgba(14,57,106,0.02)' }}>
										<h3 className="text-lg text-[#234285] mb-3 font-kantumruy leading-tight break-words">{p.title}</h3>
										<p className="text-sm text-slate-600 mb-2 font-kantumruy text-[#234285]">{p.date}</p>
										<p className="mb-4 font-kantumruy text-[#234285] text-sm flex-grow leading-relaxed break-words overflow-hidden">{p.excerpt}</p>
										<div className="mt-auto flex justify-start items-end flex-shrink-0">
											<motion.button 
												onClick={() => setSelectedPast(p)} 
												className="text-blue-800 hover:text-blue-900 focus:text-blue-900 underline text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:ring-offset-2 rounded px-1"
												aria-label={`Read more about ${p.title}`}
												whileHover={{ scale: 1.1 }}
												whileTap={{ scale: 0.95 }}
											>
												Read More
											</motion.button>
										</div>
									</article>
								</div>
							</motion.div>
						))}
					</div>

					<button
						aria-label="View next past events"
						onClick={() => pastScrollBy(1)}
						className="absolute top-1/2 -translate-y-1/2 -right-4 sm:-right-8 md:-right-12 z-20 flex items-center justify-center h-12 w-12 text-blue-800 hover:text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:ring-offset-2 rounded-full transition-colors duration-200"
					>
						<span className="text-4xl sm:text-6xl" aria-hidden="true">›</span>
					</button>
				</div>
			</section>
                            
			<MainWebsiteFooter />
		</div>
	);
}

