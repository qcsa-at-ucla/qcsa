"use client";

import { useState } from "react";
import Image from "next/image";
import MainWebsiteFooter from "../Components/mainWebsiteFooter";

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
	"Math 33A: Linear Algebra and Applications": "Lecture, three hours; discussion, one hour. Enforced requisite: course 3B or 31B or 32A with grade of C– or better. Introduction to linear algebra: systems of linear equations, matrix algebra, linear independence, subspaces, bases and dimension, orthogonality, least-squares methods, determinants, eigenvalues and eigenvectors, matrix diagonalization, and symmetric matrices. P/NP or letter grading.",
	"Math 115A: Linear Algebra": "Lecture, three hours; discussion, two hours. Requisite: course 33A. Techniques of proof, abstract vector spaces, linear transformations, and matrices; determinants; inner product spaces; eigenvector theory. P/NP or letter grading.",
	"Physics 115A: Quantum Mechanics": "Lecture, three hours; discussion, one hour. Requisites: courses 17, 32, 105A. Classical background. Basic ideas of quantum nature of light, wave-particle duality, Heisenberg uncertainty principle, Schrödinger equation. One-dimensional square well and harmonic oscillator problems. One-dimensional scattering, Formal theory, Hilbert spaces, and Dirac notation. P/NP or letter grading.",
	"Physics 115B: Quantum Mechanics": "Lecture, three hours; discussion, one hour. Enforced requisites: courses 115A, 131. Formal theory: commutator algebra, Hermitian operators, generalized uncertainty principle, Ehrenfast relations. Three-dimensional problems. Central potentials. Angular momentum. Hydrogen atom. Identical particles and Pauli exclusion principle. Electrons in an electromagnetic field. Letter grading.",
	"Physics 115C: Quantum Mechanics": "Lecture, three hours; discussion, one hour. Requisite: course 115B. Time-independent perturbation theory, application to atomic spectra. Time-dependent perturbation theory. Fermi's golden rule. Scattering. Wentzel-Kramers-Brillouin (WKB) approximation. P/NP or letter grading.",
	"Physics 221A: Quantum Mechanics": "Lecture, three hours. Fundamentals of quantum mechanics, operators and state vectors, equations of motion. Letter grading.",
	"Physics 221B: Quantum Mechanics": "Lecture, three hours. Requisite: course 221A. Rotations and other symmetry operations, perturbation theory. S/U or letter grading.",
	"Physics 245: Quantum Computation": "Lecture, three hours; discussion, one hour. Requisite: course 115A. Recommended requisites: courses 115B, 115C, 131. Quantum circuits, quantum Fourier transform, quantum algorithms, physical implementations and Jaynes-Cummings model. May not be repeated for credit. Letter grading.",
	"ECE 128: Principles of Quantum Technology": "Lecture, four hours; discussion, four hours; outside study, four hours. Requisite: Physics 1C. Introduction to fundamentals of nanoscience for electronics nanosystems. Principles of fundamental quantities: electron charge, effective mass, Bohr magneton, and spin, as well as theoretical approaches. From these nanoscale components, discussion of basic behaviors of nanosystems such as analysis of dynamics, variability, and noise, contrasted with those of scaled CMOS. Incorporation of design project in which students are challenged to design electronics nanosystems. Letter grading.",
	"Physics 123: Atomic Structure": "Lecture, three hours; discussion, one hour. Requisites: courses 1A, 1B, and 1C (or 1AH, 1BH, and 1CH), Mathematics 32B, 33A, 33B. Corequisite: course 115C. Theory of atomic structure. Interaction of radiation with matter. P/NP or letter grading.",
	"Physics 180Q: Quantum Optics Laboratory": "Lecture, two hours; laboratory, six hours. Requisite or corequisite: course 115C. Limited to junior/senior Astrophysics and Physics majors. Use of techniques of quantum optics to demonstrate concepts of quantum mechanics, including superposition, quantum measurement, hidden variable theories, and Bell's inequality. Examination and use of modern optics, including lasers, optics, fibers, polarization manipulation, and photon counting. Letter grading.",
	"Physics 213B: Advanced Atomic, Molecular, and Optical Physics": "Lecture, three hours. Requisite: course 221A (may be taken concurrently). Quantum optics, quantum entanglement, quantum information processing, quantum sensing, quantum communication. S/U or letter grading.",
	"ECE 170A: Principles of Photonics": "Lecture, four hours; recitation, one hour; outside study, seven hours. Enforced requisites: courses 2, 101A. Development of solid foundation on essential principles of photonics from ground up with minimum prior knowledge on this subject. Topics include optical properties of materials, optical wave propagation and modes, optical interferometers and resonators, optical coupling and modulation, optical absorption and emission, principles of lasers and light-emitting diodes, and optical detection. Letter grading.",
	"ECE 170B: Lasers and Photonic Devices": "Lecture, four hours; recitation, one hour; outside study, seven hours. Enforced requisite: course 170A. Coverage of laser physics, related photonic devices, and applications of lasers. Topics include resonators, thermal radiation, Einstein coefficients, optical amplification, semiconductor lasers, optical modulation and detection. Letter grading.",
	"Physics 140B: Quantum States of Matter": "Lecture, three hours; discussion, one hour. Enforced requisite: course 140A. Elementary discussion of properties of solids. Use of theory of electrons and the lattice to examine properties of semiconductors, metals, and superconductors, together with magnetic and dielectric properties of materials. Properties of noncrystalline solids. Letter grading.",
	"ECE 123A: Fundamentals of Solid-State I": "Lecture, three hours; discussion, one hour; outside study, eight hours. Requisite: course 2 or Physics 1C. Limited to junior/senior engineering majors. Fundamentals of solid-state, introduction to quantum mechanics and quantum statistics applied to solid-state. Crystal structure, energy levels in solids, and band theory and semiconductor properties. Letter grading.",
	"ECE: Fundamentals of Solid-State II": "Lecture, four hours; outside study, eight hours. Enforced requisite: course 123A. Discussion of solid-state properties, lattice vibrations, thermal properties, dielectric, magnetic, and superconducting properties. Letter grading.",
	"ECE 223: Solid-State Electronics I": "Lecture, four hours; discussion, one hour; outside study, seven hours. Recommended requisite: course 270. Energy band theory, electronic band structure of various elementary, compound, and alloy semiconductors, defects in semiconductors. Recombination mechanisms, transport properties. Letter grading.",
	"ECE 224: Solid-State Electronics II": "Lecture, four hours; outside study, eight hours. Requisite: course 223. Techniques to solve Boltzmann transport equation, various scattering mechanisms in semiconductors, high field transport properties in semiconductors, Monte Carlo method in transport. Optical properties. Letter grading.",
	"ECE 225: Physics of Semiconductor Nanostructures and Devices": "Lecture, four hours; outside study, eight hours. Requisite: course 223. Theoretical methods for circulating electronics and optical properties of semiconductor structures. Quantum size effects and low-dimensional systems. Application to semiconductor nanometer scale devices, including negative resistance diodes, transistors, and detectors. Letter grading.",
	"ECE 128: Principles of Nanoelectronics" : "Lecture, four hours; discussion, four hours; outside study, four hours. Requisite: Physics 1C. Introduction to fundamentals of nanoscience for electronics nanosystems. Principles of fundamental quantities: electron charge, effective mass, Bohr magneton, and spin, as well as theoretical approaches. From these nanoscale components, discussion of basic behaviors of nanosystems such as analysis of dynamics, variability, and noise, contrasted with those of scaled CMOS. Incorporation of design project in which students are challenged to design electronics nanosystems. Letter grading.",
    "ECE 163DA: Microwave and Wireless Design I": "Lecture, one hour; laboratory, three hours; outside study, eight hours. Enforced requisites: courses 101A, 101B. Course 163DA is enforced requisite to 163DB. Limited to senior Electrical Engineering majors. Capstone design course, with emphasis on transmission line-based circuits and components to address need in industry and research community for students with microwave and wireless circuit design experiences. Standard design procedure for waveguide and transmission line-based microwave circuits and systems to gain experience in using Microwave CAD software such as Agilent ADS or HFSS. How to fabricate and test these designs, In Progress grading (credit to be given only on completion of course 163DB).",
	"ECE 163DB: Microwave and Wireless Design II": "Lecture, one hour; laboratory, three hours; outside study, eight hours. Enforced requisites: courses 101A, 101B, 163DA. Limited to senior Electrical Engineering majors. Design of radio frequency circuits and systems, with emphasis on both theoretical foundations and hands-on experience. Design of radio frequency transceivers and their building blocks according to given specifications or in form of open-ended problems. Introduction to advanced topics related to projects through lecture and laboratories. Creation by students of end-to-end systems in application context, managing trade-offs across subsystems while meeting constraints and optimizing metrics related to cost, performance, ease of use, manufacturability, testing, and other real-world issues. Oral and written presentations of project results required. Letter grading.",
	"ECE 121DA: Semiconductor Processing and Device Design": "Lecture, four hours; laboratory, four hours; outside study, four hours. Enforced requisite or corequisite: course 121B. Design fabrication and characterization of p-n junction and transistors. Students perform various processing tasks such as wafer preparation, oxidation, diffusion, metallization, and photolithography. Introduction to CAD tools used in integrated circuit processing and device design. Device structure optimization tool based on MEDICI; process integration tool based on SUPREM. Course familiarizes students with those tools. Using CAD tools, CMOS process integration to be designed. In progress grading (credit to be given only on completion of course 121DB).",
	"ECE 121DB: Semiconductor Processing and Device Design": "Lecture, two hours; laboratory, four hours; outside study, six hours. Enforced requisites: courses 121B, 121DA. Design fabrication and characterization of p-n junction and transistors. Students perform various processing tasks such as wafer preparation, oxidation, diffusion, metallization, and photolithography. Introduction to CAD tools used in integrated circuit processing and device design. Device structure optimization tool based on MEDICI; process integration tool based on SUPREM. Course familiarizes students with those tools. Using CAD tools, CMOS process integration to be designed. Letter grading.",
	"ECE 110: Circuit Theory II": "Lecture, three hours; discussion, one hour; outside study, eight hours. Enforced requisites: courses 10, M16 (or Computer Science M51A), 102. Corequisite: course 111L (enforced only for Computer Science and Engineering and Electrical Engineering majors). Sinusoidal excitation and phasors, AC steady state analysis, AC steady state power, network functions, poles and zeros, frequency response, mutual inductance, ideal transformer, application of Laplace transforms to circuit analysis. Letter grading.",
};

export default function QuantumClassesPage() {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	return (
		<div className="min-h-screen bg-[#F8FAFF] flex flex-col font-kantumruy ">
			<main className="w-full max-w-6xl mx-auto px-6 py-16">
				<h1 className="text-center text-3xl sm:text-4xl font-bold text-[#173a73] mb-8 font-kantumruy text-[#234285]">
					Quantum Classes at UCLA
				</h1>

				<section className="bg-white rounded-lg shadow-[0_0_40px_rgba(99,179,255,0.20)] mt-24 p-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
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
											<div className="mt-3 text-sm text-gray-600 pl-2">
												{DESCRIPTIONS[c] || (
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
					<aside className="flex items-center justify-center">
                        <div className="w-full h-full flex items-start justify-center">
	                            <div className="-mt-2">
									<Image src="/images/quantum_aura.png" alt="quantum aura" width={500} height={200} className="object-contain max-w-none" />
								</div>
						</div>
									
					</aside>
				</section>

					{/* Quantum Information Theory */}
					<section className="bg-white rounded-lg shadow-[0_0_40px_rgba(99,179,255,0.20)] mt-24 p-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
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
												<div className="mt-3 text-sm text-gray-600 pl-2">
													{DESCRIPTIONS[c] || (
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
						<aside className="flex items-center justify-center">
							<div className="w-full h-full flex items-start justify-center">
								<div className="-mt-2">
									<Image src="/images/quantum_aura.png" alt="quantum aura" width={500} height={200} className="object-contain max-w-none" />
								</div>
							</div>
                        
						</aside>
					</section>

					{/* AMO Physics / Quantum Optics */}
					<section className="bg-white rounded-lg shadow-[0_0_40px_rgba(99,179,255,0.20)] mt-24 p-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
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
												<div className="mt-3 text-sm text-gray-600 pl-2">
													{DESCRIPTIONS[c] || (
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
						<aside className="flex items-center justify-center">
							<div className="w-full h-full flex items-start justify-center">
								<div className="-mt-2">
									<Image src="/images/quantum_aura.png" alt="quantum aura" width={500} height={200} className="object-contain max-w-none" />
								</div>
							</div>
                        
						</aside>
					</section>

				{/* Solid State Physics */}
				<section className="bg-white rounded-lg shadow-[0_0_40px_rgba(99,179,255,0.20)] mt-24 p-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
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
											<div className="mt-3 text-sm text-gray-600 pl-2">
												{DESCRIPTIONS[c] || (
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
					<aside className="flex items-center justify-center">
						<div className="w-full h-full flex items-start justify-center">
							<div className="-mt-2">
								<Image src="/images/quantum_aura.png" alt="quantum aura" width={500} height={200} className="object-contain max-w-none" />
							</div>
						</div>
						
					</aside>
				</section>

				{/* Device Design and Fabrication */}
				<section className="bg-white rounded-lg shadow-[0_0_40px_rgba(99,179,255,0.20)] mt-24 p-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
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
											<div className="mt-3 text-sm text-gray-600 pl-2">
												{DESCRIPTIONS[c] || (
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
					<aside className="flex items-center justify-center">
						<div className="w-full h-full flex items-start justify-center">
							<div className="-mt-2">
								<Image src="/images/quantum_aura.png" alt="quantum aura" width={500} height={200} className="object-contain max-w-none" />
							</div>
						</div>
						
					</aside>
				</section>

                            
			</main>

			<MainWebsiteFooter />
		</div>
	);
}