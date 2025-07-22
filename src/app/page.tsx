
import AboutUs from "./Components/AboutUs";
import MainWebsiteFooter from "./Components/mainWebsiteFooter";
import Testimonials from "./Components/Testimonials";

export default function Home() {
  return (
    <div>
      <AboutUs />
      <Testimonials/>
      <MainWebsiteFooter />
      {/* Add other components or content here as needed */}
    </div>
  );
}