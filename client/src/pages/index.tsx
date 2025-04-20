import HeroSection from "../components/HeroSection";
import HowItWorks from "../components/HowItWorks";
import AboutSection from "../components/AboutSection";
import PropertyShowcase from "../components/PropertyShowcase";
import FAQSection from "../components/FAQSection";
import ContactSection from "../components/ContactSection";
import WhyChooseHousingLord from "../components/WhyChooseHousingLord";
import TransparentPricing from "../components/TransparentPricing";
import { useEffect } from "react";

export default function HomePage() {
  // Initialize AOS animations on component mount
  useEffect(() => {
    // Check if AOS is available
    if (typeof window !== 'undefined' && (window as any).AOS) {
      (window as any).AOS.init({
        duration: 800,
        once: false,
      });
    }
  }, []);

  return (
    <>
      <HeroSection />
      <PropertyShowcase />
      <HowItWorks />
      <WhyChooseHousingLord />
      <TransparentPricing />
      <AboutSection />
      <FAQSection />
      <ContactSection />
    </>
  );
}
