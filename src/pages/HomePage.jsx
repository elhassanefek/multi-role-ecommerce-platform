import HeroSection from "../features/home/HeroSection";
import FeaturesSection from "../features/home/FeaturesSection";
import HowItWorks from "../features/home/HowItWorks";

import Footer from "../ui/Footer";
import PageNav from "../features/home/PageNav";

function HomePage() {
  return (
    <div>
      <PageNav />
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <Footer />
    </div>
  );
}

export default HomePage;
