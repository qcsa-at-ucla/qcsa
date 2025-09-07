import HackathonCard from "./HackathonCard";

export default function JoinHackathon() {
  return (
    <section className ="mx-auto px-6 py-12 w-full max-w-sm sm:max-w-md md:max-w-4xl lg:max-w-5xl xl:max-w-6xl pb-44">
        <h2 className="text-center text-4xl my-12">Join a Quantum Hackathon</h2>

        <div className = 'flex flex-wrap justify-center gap-16 item-stretch'>
            <div className='flex'>
            <HackathonCard
                imageSrc="/images/iquhack.png"
                title="iQuHack"
                subtitle="MIT, Boston"
                description="iQuHACK (interdisciplinary Quantum HACKathon) is MIT's annual quantum hackathon. The aim is to bring students (high school through early-career professionals) from a diverse set of backgrounds to explore improvements and applications of near-term quantum devices."
                href="#"
                cta="Application Link"
            />
            </div>
            <div className='flex'>
            <HackathonCard
                imageSrc="/images/yquantum.png"
                title="YQuantum"
                subtitle="Yale, New Haven"
                description="YQuantum is Yale’s premier quantum computing hackathon"
                href="#"
                cta="Application Link"
            />
            </div>
        </div>



  
    </section>
  )
}
