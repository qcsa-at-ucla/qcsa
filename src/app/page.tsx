
import TestimonialsAndStats from "./Components/TestimonialsAndStats";
import PageHead from "./Components/PageHead";
import ThankYouPage from "./Components/thank-you-page";
import BetweenPage from "./Components/between-page";
import Footer from "./Components/footer";

export default function Home() {
  return (
    <div>
      <PageHead />
      <BetweenPage />
      <ThankYouPage />
      <TestimonialsAndStats />
      <Footer />
    </div>
  );
}