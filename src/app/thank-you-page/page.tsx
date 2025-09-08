import TestimonialsAndStats from "../Components/TestimonialsAndStats";
import PageHead from "../Components/PageHead";
import ThankYouPage from "../Components/thank-you-page";
import Footer from "../Components/mainWebsiteFooter";
import Header from "../Components/mainWebsiteHeader";

export default function ThankYouPageRoute() {
  return (
    <div>
      <Header />
      <PageHead />
      <ThankYouPage />
      <TestimonialsAndStats />
      <Footer />
    </div>
  );
}
