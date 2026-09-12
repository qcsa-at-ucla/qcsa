'use client';

import Image from 'next/image';
import MainWebsiteFooter from '../Components/mainWebsiteFooter';
import MainWebsiteHeader from '../Components/mainWebsiteHeader';
import { motion } from 'framer-motion';

interface Paper {
	title: string;
	authors: string[];
	status: 'Published' | 'Preprint';
	venue: string;
	date: string;
	abstract: string;
	tags: string[];
	image: string;
	primaryLink: { label: string; href: string };
	secondaryLink: { label: string; href: string };
}

const PAPERS: Paper[] = [
	{
		title: 'Comparing the Performance of Leading VQE Algorithms for Computing Ground-State Energies of Amino Acids',
		authors: ['Sanskriti Shindadkar', 'Clyde Villacrusis', 'Jasper Andrews', 'Brandon Yan'],
		status: 'Published',
		venue: 'arXiv:2607.02620 [quant-ph]',
		date: 'July 2026',
		abstract:
			'An integrated, reproducible benchmark of over 10 VQE ansatzes and two truncation methods for computing amino acid ground-state energies on NISQ hardware. The study evaluates noise resilience, barren-plateau trainability, adaptive vs. fixed ansatzes, and accuracy vs. expressive capacity using Hamiltonians from the QMProt Dataset.',
		tags: ['Quantum Chemistry', 'VQE', 'NISQ'],
		image: '/images/quantum_chip.png',
		primaryLink: { label: 'Read on arXiv', href: 'https://arxiv.org/abs/2607.02620' },
		secondaryLink: { label: 'View PDF', href: 'https://arxiv.org/pdf/2607.02620' },
	},
	{
		title: 'Protein-Ligand Binding Affinity Prediction: Quantum Reservoir Computing as a Nonlinear Feature Map',
		authors: ['Sanskriti Shindadkar', 'Clyde Villacrusis', 'Manvi Agrawal', 'Hayk Gar'],
		status: 'Preprint',
		venue: 'Fetch.AI × BruinAI × QCSA Collaboration',
		date: 'In progress',
		abstract:
			'A research framework for protein-ligand binding affinity prediction on the PDBbind refined set, exploring quantum reservoir computing as a fixed nonlinear feature map fused with classical deep learning. Presented as an honest proof-of-concept, the work transparently documents where the quantum approach falls short of classical baselines and outlines concrete paths toward genuine quantum advantage.',
		tags: ['Quantum Machine Learning', 'Drug Discovery', 'Reservoir Computing'],
		image: '/images/quantum_atom.png',
		primaryLink: { label: 'View on GitHub', href: 'https://github.com/sanskriti-ss/bindingaffinity/tree/main' },
		secondaryLink: { label: 'Read the README', href: 'https://github.com/sanskriti-ss/bindingaffinity/tree/main#readme' },
	},
];

function PaperCard({ paper, index }: { paper: Paper; index: number }) {
	return (
		<motion.div
			className="rounded-lg w-full p-1 shadow-[0_0_40px_rgba(99,179,255,0.20)] mt-16 first:mt-0"
			initial={{ opacity: 0, y: 30 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.2 }}
			transition={{ delay: index * 0.15, duration: 0.6 }}
			whileHover={{ scale: 1.01, transition: { duration: 0.3 } }}
		>
			<section className="bg-white rounded-lg p-8 sm:p-10 shadow-[0_18px_40px_rgba(35,66,133,0.08)] ring-4 ring-[rgba(35,66,133,0.04)]">
				<div className="flex flex-col lg:flex-row gap-8">
					{/* Left: Content */}
					<div className="lg:w-2/3">
						<div className="flex flex-wrap items-center gap-3 mb-4">
							<span
								className={`text-xs font-semibold tracking-wide uppercase px-3 py-1 rounded-full ${
									paper.status === 'Published'
										? 'bg-green-100 text-green-700'
										: 'bg-amber-100 text-amber-700'
								}`}
							>
								{paper.status === 'Published' ? 'Published' : 'Not Yet Published'}
							</span>
							<span className="text-sm text-[#5a7bb8]">{paper.venue}</span>
							<span className="text-sm text-[#5a7bb8]">• {paper.date}</span>
						</div>

						<h2 className="text-2xl sm:text-3xl text-[#234285] font-kantumruy font-bold mb-3 leading-snug">
							{paper.title}
						</h2>

						{/* Authors */}
						<div className="flex flex-wrap gap-2 mb-5">
							{paper.authors.map((author) => (
								<span
									key={author}
									className="text-sm font-medium text-[#234285] bg-[#F3F8FF] border border-[#dbe7fb] px-3 py-1 rounded-full"
								>
									{author}
								</span>
							))}
						</div>

						<p className="text-[#3b5488] text-base leading-relaxed mb-6">
							{paper.abstract}
						</p>

						{/* Tags */}
						<div className="flex flex-wrap gap-2 mb-8">
							{paper.tags.map((tag) => (
								<span
									key={tag}
									className="text-xs text-[#234285] bg-white border border-[#234285]/30 px-3 py-1 rounded-md"
								>
									{tag}
								</span>
							))}
						</div>

						<div className="flex flex-col sm:flex-row gap-4">
							<a
								href={paper.primaryLink.href}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-block text-center bg-[#234285] text-white px-8 py-3 rounded-md text-lg font-kantumruy shadow-md hover:shadow-lg hover:bg-[#1f3f75] transition"
							>
								{paper.primaryLink.label}
							</a>
							<a
								href={paper.secondaryLink.href}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-block text-center bg-white text-[#234285] border-2 border-[#234285] px-8 py-3 rounded-md text-lg font-kantumruy shadow-md hover:shadow-lg hover:bg-[#F3F8FF] transition"
							>
								{paper.secondaryLink.label}
							</a>
						</div>
					</div>

					{/* Right: Image */}
					<div className="lg:w-1/3 flex justify-center lg:justify-end items-start">
						<div className="w-full max-w-sm h-64 rounded-md p-6 flex items-center justify-center">
							<Image
								src={paper.image}
								alt={`${paper.title} graphic`}
								width={350}
								height={300}
								className="object-contain max-w-none"
							/>
						</div>
					</div>
				</div>
			</section>
		</motion.div>
	);
}

export default function ResearchPage() {
	return (
		<div className="min-h-screen bg-[#F3F8FF]">
			<MainWebsiteHeader />
			<main id="main-content" className="max-w-6xl mx-auto px-6">
				<motion.h1
					className="text-4xl font-kantumruy font-bold text-[#234285] text-center mb-4 pt-24"
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					Research
				</motion.h1>
				<motion.p
					className="text-center text-[#3b5488] max-w-2xl mx-auto mb-16"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.15, duration: 0.6 }}
				>
					Publications and ongoing work from the QCSA Research team, spanning quantum
					chemistry, quantum machine learning, and their applications to the sciences.
				</motion.p>

				{PAPERS.map((paper, i) => (
					<PaperCard key={paper.title} paper={paper} index={i} />
				))}
			</main>
			<div className="mt-32" />
			<MainWebsiteFooter />
		</div>
	);
}
