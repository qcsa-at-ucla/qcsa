"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import MainWebsiteFooter from "../Components/mainWebsiteFooter";
import MainWebsiteHeader from "../Components/mainWebsiteHeader";

const COURSES = [
	"Math 33A: Linear Algebra and Applications",
	"Math 115A: Linear Algebra",
	"Physics 115A: Quantum Mechanics",
	"Physics 115B: Quantum Mechanics",
	"Physics 115C: Quantum Mechanics",
	"Physics 221A: Quantum Mechanics",
	"Physics 221B: Quantum Mechanics",
];

const Quantum_Information_Theory_COURSES = [
	"Physics 245: Quantum Computation",
    "ECE 128: Principles of Quantum Technology"
];

const AMO_COURSES = [
	"Physics 123: Atomic Structure",
	"Physics 180Q: Quantum Optics Laboratory",
	"Physics 213B: Advanced Atomic, Molecular, and Optical Physics",
	"ECE 170A: Principles of Photonics",
	"ECE 170B: Lasers and Photonic Devices",
];

const SOLID_STATE_COURSES = [
	"Physics 140B: Quantum States of Matter",
	"ECE 123A: Fundamentals of Solid-State I",
	"ECE: Fundamentals of Solid-State II",
	"ECE 223: Solid-State Electronics I",
	"ECE 224: Solid-State Electronics II",
	"ECE 225: Physics of Semiconductor Nanostructures and Devices",
];

const DEVICE_COURSES = [
	"ECE 128: Principles of Nanoelectronics",
	"ECE 163DA: Microwave and Wireless Design I",
	"ECE 163DB: Microwave and Wireless Design II",
	"ECE 121DA: Semiconductor Processing and Device Design",
	"ECE 121DB: Semiconductor Processing and Device Design",
	"ECE 110: Circuit Theory II",
];

const DESCRIPTIONS: Record<string, string> = {
	"Math 33A: Linear Algebra and Applications": "<strong>Enforced requisite:</strong> Course 3B or 31B or 32A with grade of C– or better.<br><br><strong>Introduction to linear algebra:</strong><br>Systems of linear equations, matrix algebra, linear independence, subspaces, bases and dimension, orthogonality, least-squares methods, determinants, eigenvalues and eigenvectors, matrix diagonalization, and symmetric matrices. P/NP or letter grading.",
	"Math 115A: Linear Algebra": "<strong>Requisite:</strong> Course 33A.<br><br><strong>Advanced linear algebra:</strong><br>Techniques of proof, abstract vector spaces, linear transformations, and matrices; determinants; inner product spaces; eigenvector theory. P/NP or letter grading.",
	"Physics 115A: Quantum Mechanics": "<strong>Requisites:</strong> Courses 17, 32, 105A.<br><br><strong>Introduction to quantum mechanics:</strong><br>Classical background. Basic ideas of quantum nature of light, wave-particle duality, Heisenberg uncertainty principle, Schrödinger equation. One-dimensional square well and harmonic oscillator problems. One-dimensional scattering, Formal theory, Hilbert spaces, and Dirac notation. P/NP or letter grading.",
	"Physics 115B: Quantum Mechanics": "<strong>Enforced requisites:</strong> Courses 115A, 131.<br><br><strong>Intermediate quantum mechanics:</strong><br>Formal theory: commutator algebra, Hermitian operators, generalized uncertainty principle, Ehrenfast relations. Three-dimensional problems. Central potentials. Angular momentum. Hydrogen atom. Identical particles and Pauli exclusion principle. Electrons in an electromagnetic field. Letter grading.",
	"Physics 115C: Quantum Mechanics": "<strong>Requisite:</strong> Course 115B.<br><br><strong>Advanced quantum mechanics:</strong><br>Time-independent perturbation theory, application to atomic spectra. Time-dependent perturbation theory. Fermi's golden rule. Scattering. Wentzel-Kramers-Brillouin (WKB) approximation. P/NP or letter grading.",
	"Physics 221A: Quantum Mechanics": "<strong>Graduate-level quantum mechanics:</strong><br>Fundamentals of quantum mechanics, operators and state vectors, equations of motion. Letter grading.",
	"Physics 221B: Quantum Mechanics": "<strong>Requisite:</strong> Course 221A.<br><br><strong>Advanced graduate quantum mechanics:</strong><br>Rotations and other symmetry operations, perturbation theory. S/U or letter grading.",
	"Physics 245: Quantum Computation": "<strong>Requisite:</strong> Course 115A. <strong>Recommended requisites:</strong> Courses 115B, 115C, 131.<br><br><strong>Introduction to quantum computation:</strong><br>Quantum circuits, quantum Fourier transform, quantum algorithms, physical implementations and Jaynes-Cummings model. May not be repeated for credit. Letter grading.",
	"ECE 128: Principles of Quantum Technology": "<strong>Requisite:</strong> Physics 1C.<br><br><strong>Fundamentals of nanoscience for electronics nanosystems:</strong><br>Principles of fundamental quantities: electron charge, effective mass, Bohr magneton, and spin, as well as theoretical approaches. From these nanoscale components, discussion of basic behaviors of nanosystems such as analysis of dynamics, variability, and noise, contrasted with those of scaled CMOS. Incorporation of design project in which students are challenged to design electronics nanosystems. Letter grading.",
	"Physics 123: Atomic Structure": "<strong>Requisites:</strong> Courses 1A, 1B, and 1C (or 1AH, 1BH, and 1CH), Mathematics 32B, 33A, 33B. <strong>Corequisite:</strong> Course 115C.<br><br><strong>Theory of atomic structure:</strong><br>Interaction of radiation with matter. P/NP or letter grading.",
	"Physics 180Q: Quantum Optics Laboratory": "<strong>Requisite or corequisite:</strong> Course 115C. Limited to junior/senior Astrophysics and Physics majors.<br><br><strong>Quantum optics laboratory techniques:</strong><br>Use of techniques of quantum optics to demonstrate concepts of quantum mechanics, including superposition, quantum measurement, hidden variable theories, and Bell's inequality. Examination and use of modern optics, including lasers, optics, fibers, polarization manipulation, and photon counting. Letter grading.",
	"Physics 213B: Advanced Atomic, Molecular, and Optical Physics": "<strong>Requisite:</strong> Course 221A (may be taken concurrently).<br><br><strong>Advanced quantum optics and quantum information:</strong><br>Quantum optics, quantum entanglement, quantum information processing, quantum sensing, quantum communication. S/U or letter grading.",
	"ECE 170A: Principles of Photonics": "<strong>Enforced requisites:</strong> Courses 2, 101A.<br><br><strong>Essential principles of photonics:</strong><br>Development of solid foundation on essential principles of photonics from ground up with minimum prior knowledge on this subject. Topics include optical properties of materials, optical wave propagation and modes, optical interferometers and resonators, optical coupling and modulation, optical absorption and emission, principles of lasers and light-emitting diodes, and optical detection. Letter grading.",
	"ECE 170B: Lasers and Photonic Devices": "<strong>Enforced requisite:</strong> Course 170A.<br><br><strong>Laser physics and photonic devices:</strong><br>Coverage of laser physics, related photonic devices, and applications of lasers. Topics include resonators, thermal radiation, Einstein coefficients, optical amplification, semiconductor lasers, optical modulation and detection. Letter grading.",
	"Physics 140B: Quantum States of Matter": "<strong>Enforced requisite:</strong> Course 140A.<br><br><strong>Properties of solids:</strong><br>Elementary discussion of properties of solids. Use of theory of electrons and the lattice to examine properties of semiconductors, metals, and superconductors, together with magnetic and dielectric properties of materials. Properties of noncrystalline solids. Letter grading.",
	"ECE 123A: Fundamentals of Solid-State I": "<strong>Requisite:</strong> Course 2 or Physics 1C. Limited to junior/senior engineering majors.<br><br><strong>Fundamentals of solid-state:</strong><br>Introduction to quantum mechanics and quantum statistics applied to solid-state. Crystal structure, energy levels in solids, and band theory and semiconductor properties. Letter grading.",
	"ECE: Fundamentals of Solid-State II": "<strong>Enforced requisite:</strong> Course 123A.<br><br><strong>Advanced solid-state properties:</strong><br>Discussion of solid-state properties, lattice vibrations, thermal properties, dielectric, magnetic, and superconducting properties. Letter grading.",
	"ECE 223: Solid-State Electronics I": "<strong>Recommended requisite:</strong> Course 270.<br><br><strong>Energy band theory and semiconductor physics:</strong><br>Energy band theory, electronic band structure of various elementary, compound, and alloy semiconductors, defects in semiconductors. Recombination mechanisms, transport properties. Letter grading.",
	"ECE 224: Solid-State Electronics II": "<strong>Requisite:</strong> Course 223.<br><br><strong>Advanced semiconductor transport:</strong><br>Techniques to solve Boltzmann transport equation, various scattering mechanisms in semiconductors, high field transport properties in semiconductors, Monte Carlo method in transport. Optical properties. Letter grading.",
	"ECE 225: Physics of Semiconductor Nanostructures and Devices": "<strong>Requisite:</strong> Course 223.<br><br><strong>Semiconductor nanostructures:</strong><br>Theoretical methods for circulating electronics and optical properties of semiconductor structures. Quantum size effects and low-dimensional systems. Application to semiconductor nanometer scale devices, including negative resistance diodes, transistors, and detectors. Letter grading.",
	"ECE 128: Principles of Nanoelectronics" : "<strong>Requisite:</strong> Physics 1C.<br><br><strong>Fundamentals of nanoscience for electronics nanosystems:</strong><br>Introduction to fundamentals of nanoscience for electronics nanosystems. Principles of fundamental quantities: electron charge, effective mass, Bohr magneton, and spin, as well as theoretical approaches. From these nanoscale components, discussion of basic behaviors of nanosystems such as analysis of dynamics, variability, and noise, contrasted with those of scaled CMOS. Incorporation of design project in which students are challenged to design electronics nanosystems. Letter grading.",
    "ECE 163DA: Microwave and Wireless Design I": "<strong>Enforced requisites:</strong> Courses 101A, 101B. Course 163DA is enforced requisite to 163DB. Limited to senior Electrical Engineering majors.<br><br><strong>Microwave and wireless circuit design:</strong><br>Capstone design course, with emphasis on transmission line-based circuits and components to address need in industry and research community for students with microwave and wireless circuit design experiences. Standard design procedure for waveguide and transmission line-based microwave circuits and systems to gain experience in using Microwave CAD software such as Agilent ADS or HFSS. How to fabricate and test these designs. In Progress grading (credit to be given only on completion of course 163DB).",
	"ECE 163DB: Microwave and Wireless Design II": "<strong>Enforced requisites:</strong> Courses 101A, 101B, 163DA. Limited to senior Electrical Engineering majors.<br><br><strong>Advanced radio frequency circuit design:</strong><br>Design of radio frequency circuits and systems, with emphasis on both theoretical foundations and hands-on experience. Design of radio frequency transceivers and their building blocks according to given specifications or in form of open-ended problems. Introduction to advanced topics related to projects through lecture and laboratories. Creation by students of end-to-end systems in application context, managing trade-offs across subsystems while meeting constraints and optimizing metrics related to cost, performance, ease of use, manufacturability, testing, and other real-world issues. Oral and written presentations of project results required. Letter grading.",
	"ECE 121DA: Semiconductor Processing and Device Design": "<strong>Enforced requisite or corequisite:</strong> Course 121B.<br><br><strong>Semiconductor fabrication and characterization:</strong><br>Design fabrication and characterization of p-n junction and transistors. Students perform various processing tasks such as wafer preparation, oxidation, diffusion, metallization, and photolithography. Introduction to CAD tools used in integrated circuit processing and device design. Device structure optimization tool based on MEDICI; process integration tool based on SUPREM. Course familiarizes students with those tools. Using CAD tools, CMOS process integration to be designed. In progress grading (credit to be given only on completion of course 121DB).",
	"ECE 121DB: Semiconductor Processing and Device Design": "<strong>Enforced requisites:</strong> Courses 121B, 121DA.<br><br><strong>Advanced semiconductor processing:</strong><br>Design fabrication and characterization of p-n junction and transistors. Students perform various processing tasks such as wafer preparation, oxidation, diffusion, metallization, and photolithography. Introduction to CAD tools used in integrated circuit processing and device design. Device structure optimization tool based on MEDICI; process integration tool based on SUPREM. Course familiarizes students with those tools. Using CAD tools, CMOS process integration to be designed. Letter grading.",
	"ECE 110: Circuit Theory II": "<strong>Enforced requisites:</strong> Courses 10, M16 (or Computer Science M51A), 102. <strong>Corequisite:</strong> Course 111L (enforced only for Computer Science and Engineering and Electrical Engineering majors).<br><br><strong>Advanced circuit analysis:</strong><br>Sinusoidal excitation and phasors, AC steady state analysis, AC steady state power, network functions, poles and zeros, frequency response, mutual inductance, ideal transformer, application of Laplace transforms to circuit analysis. Letter grading.",
};

export default function QuantumClassesPage() {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	return (
		<div className="min-h-screen bg-[#F8FAFF] flex flex-col font-kantumruy ">
			<MainWebsiteHeader/>
			<main className="w-full max-w-6xl mx-auto px-6 py-16">
				<motion.h1 
					className="text-center text-3xl sm:text-4xl font-bold text-[#173a73] mb-8 font-kantumruy text-[#234285]"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					Quantum Classes at UCLA
				</motion.h1>

				<motion.section 
					className="bg-white rounded-lg shadow-[0_0_40px_rgba(99,179,255,0.20)] mt-24 p-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-start"
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2, duration: 0.6 }}
					whileHover={{ scale: 1.01, transition: { duration: 0.3 } }}
				>
					<div className="md:col-span-2">
						<h3 className="text-3xl text-[#234285] font-bold mb-6 ">Quantum Mechanics</h3>

						<div className="divide-y">
							{COURSES.map((c, i) => {
								const open = openIndex === i;
								return (
									<div key={c} className="py-3">
										<button
											onClick={() => setOpenIndex(open ? null : i)}
											className="w-full flex items-center justify-between text-left space-x-4"
											aria-expanded={open}
											aria-controls={`course-content-${i}`}
											aria-label={`Toggle ${c} course details`}
										>
											<span className="text-lg text-gray-800">{c}</span>
											<svg
												className={`w-5 h-5 text-gray-700 transform transition-transform duration-150 ${open ? "rotate-180" : ""}`}
												viewBox="0 0 20 20"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
											</svg>
										</button>

										{open && (
											<div className="mt-3 text-sm text-gray-600 pl-2 font-kantumruy" id={`course-content-${i}`}>
												{DESCRIPTIONS[c] ? (
													<div dangerouslySetInnerHTML={{ __html: DESCRIPTIONS[c] }} />
												) : (
													<>Placeholder information about {c}. You can replace this with instructors, quarter, or notes.</>
												)}
											</div>
										)}
									</div>
								);
							})}
						</div>
					</div>

					{/* Right gradient card with avatar */}
					<aside className="flex items-center justify-center relative pointer-events-none">
                        <div className="w-full h-full flex items-start justify-center relative">
							{/* Background aura image */}
							<div className="absolute inset-0 flex items-center justify-center opacity-100">
								<Image 
									src="/images/quantum_aura.png" 
									alt="quantum aura background" 
									width={600} 
									height={400} 
									className="object-contain max-w-none" 
								/>
							</div>
							{/* Foreground atom image */}
	                        <div className="-mt-2 relative">
								<Image 
									src="/images/quantum_atom.png" 
									alt="quantum atom" 
									width={400} 
									height={200} 
									className="object-contain max-w-none" 
								/>
							</div>
						</div>
									
					</aside>
				</motion.section>

					{/* Quantum Information Theory */}
					<motion.section 
						className="bg-white rounded-lg shadow-[0_0_40px_rgba(99,179,255,0.20)] mt-24 p-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-start"
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.4, duration: 0.6 }}
						whileHover={{ scale: 1.01, transition: { duration: 0.3 } }}
					>
						<div className="md:col-span-2">
							<h3 className="text-3xl text-[#234285] font-bold mb-6 ">Quantum Information Theory</h3>

							<div className="divide-y">
								{Quantum_Information_Theory_COURSES.map((c, i) => {
									const idx = COURSES.length + i; // offset so indices stay unique
									const open = openIndex === idx;
									return (
										<div key={c} className="py-3">
											<button
												onClick={() => setOpenIndex(open ? null : idx)}
												className="w-full flex items-center justify-between text-left space-x-4"
												aria-expanded={open}
												aria-controls={`course-content-${idx}`}
												aria-label={`Toggle ${c} course details`}
											>
												<span className="text-lg text-gray-800">{c}</span>
												<svg
													className={`w-5 h-5 text-gray-700 transform transition-transform duration-150 ${open ? "rotate-180" : ""}`}
													viewBox="0 0 20 20"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
												</svg>
											</button>

											{open && (
												<div className="mt-3 text-sm text-gray-600 pl-2" id={`course-content-${idx}`}>
													{DESCRIPTIONS[c] ? (
														<div dangerouslySetInnerHTML={{ __html: DESCRIPTIONS[c] }} />
													) : (
														<>Placeholder information about {c}. You can replace this with instructors, quarter, or notes.</>
													)}
												</div>
											)}
										</div>
									);
								})}
							</div>
						</div>

						{/* Right gradient card with avatar */}
					<aside className="flex items-center justify-center relative pointer-events-none">
                        <div className="w-full h-full flex items-start justify-center relative">
							{/* Background aura image */}
							<div className="absolute inset-0 flex items-center justify-center opacity-100">
								<Image 
									src="/images/quantum_aura.png" 
									alt="quantum aura background" 
									width={600} 
									height={400} 
									className="object-contain max-w-none" 
								/>
							</div>
							{/* Foreground atom image */}
	                        <div className="-mt-2 relative">
								<Image 
									src="/images/orbital.png" 
									alt="quantum atom" 
									width={350} 
									height={300} 
									className="object-contain max-w-none" 
								/>
							</div>
						</div>
									
					</aside>
					</motion.section>

					{/* AMO Physics / Quantum Optics */}
					<motion.section 
						className="bg-white rounded-lg shadow-[0_0_40px_rgba(99,179,255,0.20)] mt-24 p-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-start"
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.6, duration: 0.6 }}
						whileHover={{ scale: 1.01, transition: { duration: 0.3 } }}
					>
						<div className="md:col-span-2">
							<h3 className="text-3xl text-[#234285] font-bold mb-6 ">AMO Physics / Quantum Optics</h3>

							<div className="divide-y">
								{AMO_COURSES.map((c, i) => {
									const idx = COURSES.length + Quantum_Information_Theory_COURSES.length + i;
									const open = openIndex === idx;
									return (
										<div key={c} className="py-3">
											<button
												onClick={() => setOpenIndex(open ? null : idx)}
												className="w-full flex items-center justify-between text-left space-x-4"
												aria-expanded={open}
												aria-controls={`course-content-${idx}`}
												aria-label={`Toggle ${c} course details`}
											>
												<span className="text-lg text-gray-800">{c}</span>
												<svg
													className={`w-5 h-5 text-gray-700 transform transition-transform duration-150 ${open ? "rotate-180" : ""}`}
													viewBox="0 0 20 20"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
												</svg>
											</button>

											{open && (
												<div className="mt-3 text-sm text-gray-600 pl-2" id={`course-content-${idx}`}>
													{DESCRIPTIONS[c] ? (
														<div dangerouslySetInnerHTML={{ __html: DESCRIPTIONS[c] }} />
													) : (
														<>Placeholder information about {c}. You can replace this with instructors, quarter, or notes.</>
													)}
												</div>
											)}
										</div>
									);
								})}
							</div>
						</div>

							{/* Right gradient card with avatar */}
					<aside className="flex items-center justify-center relative pointer-events-none">
                        <div className="w-full h-full flex items-start justify-center relative">
							{/* Background aura image */}
							<div className="absolute inset-0 flex items-center justify-center opacity-100">
								<Image 
									src="/images/quantum_aura.png" 
									alt="quantum aura background" 
									width={600} 
									height={400} 
									className="object-contain max-w-none" 
								/>
							</div>
							{/* Foreground atom image */}
	                        <div className="-mt-2 relative">
								<Image 
									src="/images/random_waves.png" 
									alt="quantum atom" 
									width={350} 
									height={300} 
									className="object-contain max-w-none" 
								/>
							</div>
						</div>
									
					</aside>
					</motion.section>

				{/* Solid State Physics */}
				<motion.section 
					className="bg-white rounded-lg shadow-[0_0_40px_rgba(99,179,255,0.20)] mt-24 p-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-start"
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.8, duration: 0.6 }}
					whileHover={{ scale: 1.01, transition: { duration: 0.3 } }}
				>
					<div className="md:col-span-2">
						<h3 className="text-3xl text-[#234285] font-bold mb-6 ">Solid State Physics</h3>

						<div className="divide-y">
							{SOLID_STATE_COURSES.map((c, i) => {
								const idx = COURSES.length + Quantum_Information_Theory_COURSES.length + AMO_COURSES.length + i;
								const open = openIndex === idx;
								return (
									<div key={c} className="py-3">
										<button
											onClick={() => setOpenIndex(open ? null : idx)}
											className="w-full flex items-center justify-between text-left space-x-4"
											aria-expanded={open}
											aria-controls={`course-content-${idx}`}
											aria-label={`Toggle ${c} course details`}
										>
											<span className="text-lg text-gray-800">{c}</span>
											<svg
												className={`w-5 h-5 text-gray-700 transform transition-transform duration-150 ${open ? "rotate-180" : ""}`}
												viewBox="0 0 20 20"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
											</svg>
										</button>

										{open && (
											<div className="mt-3 text-sm text-gray-600 pl-2" id={`course-content-${idx}`}>
												{DESCRIPTIONS[c] ? (
													<div dangerouslySetInnerHTML={{ __html: DESCRIPTIONS[c] }} />
												) : (
													<>Placeholder information about {c}. You can replace this with instructors, quarter, or notes.</>
												)}
											</div>
										)}
									</div>
								);
							})}
						</div>
					</div>

						{/* Right gradient card with avatar */}
					<aside className="flex items-center justify-center relative pointer-events-none">
                        <div className="w-full h-full flex items-start justify-center relative">
							{/* Background aura image */}
							<div className="absolute inset-0 flex items-center justify-center opacity-100">
								<Image 
									src="/images/quantum_aura.png" 
									alt="quantum aura background" 
									width={600} 
									height={400} 
									className="object-contain max-w-none" 
								/>
							</div>
							{/* Foreground atom image */}
	                        <div className="-mt-2 relative">
								<Image 
									src="/images/crystals.png" 
									alt="quantum atom" 
									width={350} 
									height={300} 
									className="object-contain max-w-none" 
								/>
							</div>
						</div>
									
					</aside>
				</motion.section>

				{/* Device Design and Fabrication */}
				<motion.section 
					className="bg-white rounded-lg shadow-[0_0_40px_rgba(99,179,255,0.20)] mt-24 p-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-start"
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 1.0, duration: 0.6 }}
					whileHover={{ scale: 1.01, transition: { duration: 0.3 } }}
				>
					<div className="md:col-span-2">
						<h3 className="text-3xl text-[#234285] font-bold mb-6 ">Device Design and Fabrication</h3>

						<div className="divide-y">
							{DEVICE_COURSES.map((c, i) => {
								const idx = COURSES.length + Quantum_Information_Theory_COURSES.length + AMO_COURSES.length + SOLID_STATE_COURSES.length + i;
								const open = openIndex === idx;
								return (
									<div key={c} className="py-3">
										<button
											onClick={() => setOpenIndex(open ? null : idx)}
											className="w-full flex items-center justify-between text-left space-x-4"
											aria-expanded={open}
											aria-controls={`course-content-${idx}`}
											aria-label={`Toggle ${c} course details`}
										>
											<span className="text-lg text-gray-800">{c}</span>
											<svg
												className={`w-5 h-5 text-gray-700 transform transition-transform duration-150 ${open ? "rotate-180" : ""}`}
												viewBox="0 0 20 20"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
											</svg>
										</button>

										{open && (
											<div className="mt-3 text-sm text-gray-600 pl-2" id={`course-content-${idx}`}>
												{DESCRIPTIONS[c] ? (
													<div dangerouslySetInnerHTML={{ __html: DESCRIPTIONS[c] }} />
												) : (
													<>Placeholder information about {c}. You can replace this with instructors, quarter, or notes.</>
												)}
											</div>
										)}
									</div>
								);
							})}
						</div>
					</div>

						{/* Right gradient card with avatar */}
					<aside className="flex items-center justify-center relative pointer-events-none">
                        <div className="w-full h-full flex items-start justify-center relative">
							{/* Background aura image */}
							<div className="absolute inset-0 flex items-center justify-center opacity-100">
								<Image 
									src="/images/quantum_aura.png" 
									alt="quantum aura background" 
									width={600} 
									height={400} 
									className="object-contain max-w-none" 
								/>
							</div>
							{/* Foreground atom image */}
	                        <div className="-mt-2 relative">
								<Image 
									src="/images/quantum_chip.png" 
									alt="quantum atom" 
									width={350} 
									height={200} 
									className="object-contain max-w-none" 
								/>
							</div>
						</div>
									
					</aside>
				</motion.section>

                            
			</main>

			<MainWebsiteFooter />
		</div>
	);
}