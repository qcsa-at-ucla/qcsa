import TestimonialsAndStats from "./Components/TestimonialsAndStats";
import PageHead from "./Components/PageHead";
import ThankYouPage from "./Components/thank-you-page";


export default function Home() {
  return (
    <div>
          <PageHead></PageHead>
          <TestimonialsAndStats></TestimonialsAndStats>
          <ThankYouPage />
    </div>
  );
}