
import AboutUs from "./Components/AboutUs";
import GetInvolved from "./Components/GetInvolved";
import MainWebsiteFooter from "./Components/mainWebsiteFooter";
import Testimonials from "./Components/Testimonials";
import TextAndPhoto from "./Components/TextAndPhoto";
import JoinUs from "./join-us/page";

export default function Home() {
  return (
    <div>
      <AboutUs />
      <Testimonials/>
      <GetInvolved/>
      <MainWebsiteFooter />
      {/* Add other components or content here as needed */}
    </div>
  );
}