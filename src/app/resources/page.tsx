'use client';

import Image from 'next/image'
import Link from 'next/link'
import MainWebsiteFooter from "../Components/mainWebsiteFooter";
import MainWebsiteHeader from '../Components/mainWebsiteHeader';

export default function ResourcesPage() {
	return (
		<div className="min-h-screen bg-[#F3F8FF]">
			<MainWebsiteHeader/>
			<main id="main-content" className="max-w-6xl mx-auto px-6">
				<h1 className="text-4xl font-kantumruy font-bold text-[#234285] text-center mb-12 pt-24">
					Resources
				</h1>		
				{/* Mentorship Card */}
				<div className="rounded-lg w-full p-1 shadow-[0_0_40px_rgba(99,179,255,0.20)]">
					<section className="bg-white rounded-lg p-10 shadow-[0_18px_40px_rgba(35,66,133,0.08)] ring-4 ring-[rgba(35,66,133,0.04)]">
						<div className="flex flex-col lg:flex-row items-center gap-8">
						{/* Left: Text block */}
						<div className="lg:w-2/3">
							<h2 className="text-3xl text-[#234285] font-kantumruy mb-4">Mentorship</h2>
							<p className="text-[#234285] text-base mb-8">
								Connect with experienced mentors in quantum computing!
							</p>
                                <div>
                            <Link href="/mentorship" className="inline-block bg-[#234285] text-white px-8 py-3 rounded-md text-lg font-kantumruy shadow-md hover:shadow-lg hover:bg-[#1f3f75] transition">
									Learn More
							</Link>
								</div>
						</div>

						{/* Right: Image / gradient card */}
						<div className="lg:w-1/3 flex justify-center lg:justify-end">
							<div className="w-96 h-64 rounded-md p-6 flex items-center justify-center ">
								<Image src="/images/quantum_aura.png" alt="mentorship graphic" width={350} height={300} className="object-contain max-w-none" />
							</div>
						</div>
					</div>
					</section>
				</div>


				{/* QCSA Membership Form - Featured at the top */}
				{/* <div className="rounded-lg w-full p-1 shadow-[0_0_50px_rgba(99,179,255,0.30)] bg-gradient-to-r from-blue-50 to-indigo-50">
					<section className="bg-white rounded-lg p-10 shadow-[0_20px_50px_rgba(35,66,133,0.12)] ring-4 ring-[rgba(35,66,133,0.06)]">
						<div className="flex flex-col lg:flex-row items-center gap-8">
							<div className="lg:w-2/3">
								<div className="flex items-center gap-3 mb-4">
									<h2 className="text-3xl text-[#234285] font-kantumruy font-bold">QCSA Membership Form</h2>
								</div>
								<p className="text-[#234285] text-base mb-6 leading-relaxed">
									Join the Quantum Computing Society at UCLA! Become part of our vibrant community of students passionate about quantum computing and quantum information science. Get access to exclusive workshops, networking events, and opportunities to work on cutting-edge quantum projects.
								</p>
								<div className="flex flex-col sm:flex-row gap-4">
									<a 
										href="https://docs.google.com/forms/d/e/1FAIpQLSedU6c7m4swzNhmzJURbi5GkkYYyvX7Y5lqNxmCoj9aw4hlQg/viewform?usp=header"
										target="_blank"
										rel="noopener noreferrer"
										className="inline-block bg-[#234285] text-white px-8 py-3 rounded-md text-lg font-kantumruy shadow-md hover:shadow-xl hover:from-[#1f3f75] hover:to-blue-800 transition-all duration-300 transform hover:scale-105 text-center"
									>
										Join Now →
									</a>
								</div>
							</div>

							<div className="lg:w-1/3 flex justify-center lg:justify-end">
								<div className="w-96 h-64 rounded-md p-6 flex items-center justify-center relative overflow-hidden">
									<div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-indigo-50 to-blue-200 opacity-50"></div>
									<Image 
										src="/images/join-us.png" 
										alt="Join QCSA" 
										width={350} 
										height={300} 
										className="object-contain max-w-none relative z-10 drop-shadow-lg" 
									/>
								</div>
							</div>
						</div>
					</section>
				</div> */}

				{/* wrapper adds a subtle light-blue neon aura around the card without changing its size */}
				<div className="rounded-lg w-full p-1 shadow-[0_0_40px_rgba(99,179,255,0.20)] mt-24">
					<section className="bg-white rounded-lg p-10 shadow-[0_18px_40px_rgba(35,66,133,0.08)] ring-4 ring-[rgba(35,66,133,0.04)]">
						<div className="flex flex-col lg:flex-row items-center gap-8">
						{/* Left: Text block */}
						<div className="lg:w-2/3">
							<h2 className="text-3xl text-[#234285] font-kantumruy mb-4">QHackathon</h2>
							<p className="text-[#234285] text-base mb-8">
								Learn more about upcoming hackathons and the QuBruin team.
							</p>
                                <div>
                            <Link href="/qhackathon" className="inline-block bg-[#234285] text-white px-8 py-3 rounded-md text-lg font-kantumruy shadow-md hover:shadow-lg hover:bg-[#1f3f75] transition">
									Learn More
							</Link>
								</div>
						</div>

						{/* Right: Image / gradient card */}
						<div className="lg:w-1/3 flex justify-center lg:justify-end">
							<div className="w-96 h-64 rounded-md p-6 flex items-center justify-center ">
								{/* increased image size so it appears taller; parent box remains w-96 h-64 so it won't grow */}
								<Image src="/images/QHack_Graphic.png" alt="resource graphic" width={350} height={300} className="object-contain max-w-none" />
							</div>
						</div>
					</div>
					</section>

				</div>


				<div className="rounded-lg w-full p-1 shadow-[0_0_40px_rgba(99,179,255,0.20)] mt-24">
					<section className="bg-white rounded-lg p-10 shadow-[0_18px_40px_rgba(35,66,133,0.08)] ring-4 ring-[rgba(35,66,133,0.04)]">
						<div className="flex flex-col lg:flex-row items-center gap-8">
						{/* Left: Text block */}
						<div className="lg:w-2/3">
							<h2 className="text-3xl text-[#234285] font-kantumruy mb-4">Quantum Classes at UCLA</h2>
							<p className="text-[#234285] text-base mb-8">
								Useful courses for UCLA students passionate about pursuing quantum.
							</p>
                                <div>
                            <Link href="/quantum_classes" className="inline-block bg-[#234285] text-white px-8 py-3 rounded-md text-lg font-kantumruy shadow-md hover:shadow-lg hover:bg-[#1f3f75] transition">
									Learn More
							</Link>
								</div>
						</div>

						{/* Right: Image / gradient card */}
						<div className="lg:w-1/3 flex justify-center lg:justify-end">
							<div className="w-96 h-64 rounded-md p-6 flex items-center justify-center ">
								{/* increased image size so it appears taller; parent box remains w-96 h-64 so it won't grow */}
								<Image src="/images/QuantumClasses_Graphic.png" alt="resource graphic" width={350} height={300} className="object-contain max-w-none" />
							</div>
						</div>
					</div>
					</section>

				</div>

				<div className="rounded-lg w-full p-1 shadow-[0_0_40px_rgba(99,179,255,0.20)] mt-24">
					<section className="bg-white rounded-lg p-10 shadow-[0_18px_40px_rgba(35,66,133,0.08)] ring-4 ring-[rgba(35,66,133,0.04)]">
						<div className="flex flex-col lg:flex-row items-center gap-8">
						{/* Left: Text block */}
						<div className="lg:w-2/3">
							<h2 className="text-3xl text-[#234285] font-kantumruy mb-4">Past Newsletters</h2>
							<p className="text-[#234285] text-base mb-8">
								Stay updated on previous QCSA newsletters.
							</p>
                                <div>
                            <Link href="/newsletters" className="inline-block bg-[#234285] text-white px-8 py-3 rounded-md text-lg font-kantumruy shadow-md hover:shadow-lg hover:bg-[#1f3f75] transition">
									Learn More
							</Link>
								</div>
						</div>

						{/* Right: Image / gradient card */}
						<div className="lg:w-1/3 flex justify-center lg:justify-end">
							<div className="w-96 h-64 rounded-md p-6 flex items-center justify-center ">
								{/* increased image size so it appears taller; parent box remains w-96 h-64 so it won't grow */}
								<Image src="/images/Newsletter_Graphic.png" alt="resource graphic" width={350} height={300} className="object-contain max-w-none" />
							</div>
						</div>
					</div>
					</section>

				</div>

                
			</main>
			{/* spacer to add extra space before the footer */}
			<div className="mt-48" />
            
			<MainWebsiteFooter />
		</div>
	)
}
