
import AboutUs from "./Components/AboutUs";
import GetInvolved from "./Components/GetInvolved";
import MainWebsiteFooter from "./Components/mainWebsiteFooter";
import Testimonials from "./Components/Testimonials";
import BetweenPage from "./Components/between-page";

export default function Home() {
  return (
    <div>
      <AboutUs />
      <BetweenPage />
      <Testimonials/>
      <GetInvolved/>
      <MainWebsiteFooter />
      {/* Add other components or content here as needed */}
    </div>
  );
}