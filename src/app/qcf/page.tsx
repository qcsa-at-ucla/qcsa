import MainWebsiteFooter from "../Components/mainWebsiteFooter"
import MainWebsiteHeader from "../Components/mainWebsiteHeader"
import SponsorSection from "../Components/SponsorSection"

const qcfSponsors = [
  { name: 'BQP', logo: '/images/qcf-sponsors/bqp.png', url: 'https://www.bqp.io/' },
  { name: 'JPL', logo: '/images/qcf-sponsors/JPL.png', url: 'https://www.jpl.nasa.gov/' },
  { name: 'Keysight', logo: '/images/qcf-sponsors/keysight.jpg', url: 'https://www.keysight.com' },
  { name: 'Microsoft', logo: '/images/qcf-sponsors/microsoft.png', url: 'https://www.microsoft.com'},
  { name: 'PsiQuantum', logo: '/images/qcf-sponsors/psiquantum.png', url: 'https://www.psiquantum.com/' },
];

export default function QCF(){
  return (
    <div>
      <MainWebsiteHeader/>
      <main id="main-content">
        
        {/* Quantum Career Fair Section */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-blue-900 mb-8">
              Quantum Career Fair
            </h2>
            <a 
              href="https://docs.google.com/forms/d/e/1FAIpQLSex5EiOsnk4ZjP1nlZ8PyTZXm8qywiuZfG4M0zJNfn7H4L9Kg/viewform" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block cursor-pointer hover:opacity-90 transition-opacity"
            >
              <img 
                src="/images/qcf-flyer-final.png" 
                alt="Quantum Career Fair - February 20th, 2026"
                className="w-full max-w-2xl mx-auto rounded-lg shadow-lg"
              />
            </a>
          </div>
        </section>

        <SponsorSection
          title="Our Sponsors"
          direction="left"
          sponsors={qcfSponsors}
        />
        
      </main>
      <MainWebsiteFooter/>
    </div>
  )
}