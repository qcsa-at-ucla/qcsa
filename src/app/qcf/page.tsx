import MainWebsiteFooter from "../Components/mainWebsiteFooter"
import MainWebsiteHeader from "../Components/mainWebsiteHeader"
import SponsorSection from "../Components/SponsorSection"

const qcfSponsors = [
    { name: 'BQP', logo: '/images/qcf-sponsors/bqp.png', url: 'https://www.bqp.io/' },
    { name: 'JPL', logo: '/images/qcf-sponsors/JPL.png', url: 'https://www.jpl.nasa.gov/' },
    { name: 'Keysight', logo: '/images/qcf-sponsors/keysight.jpg', url: 'https://www.keysight.com' },
    { name: 'PsiQuantum', logo: '/images/qcf-sponsors/psiquantum.png', url: 'https://www.psiquantum.com/' },
];

export default function QCF(){
    return (
        <div>
            <MainWebsiteHeader/>
            <main id="main-content">
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