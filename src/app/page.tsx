
import AboutUs from "./Components/AboutUs";
import ContactSection from "./Components/ContactSection";
import GetInvolved from "./Components/GetInvolved";
import MainWebsiteFooter from "./Components/mainWebsiteFooter";
import BetweenPage from "./Components/between-page";
import HeroSection from "./Components/HeroSection";
import MainWebsiteHeader from "./Components/mainWebsiteHeader";


export default function Home() {
  return (
    <div>
      <MainWebsiteHeader />
      <main id="main-content">
        <HeroSection />
        <AboutUs />
        <BetweenPage />
        <GetInvolved/>
        <ContactSection />
      </main>
      <MainWebsiteFooter />
      {/* Add other components or content here as needed */}
    </div>
  );
}