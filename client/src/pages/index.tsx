import HeroSection from "@/components/HeroSection";
import HeroImage from "@/components/HeroImage";
import HowItWorks from "@/components/HowItWorks";
import AboutSection from "@/components/AboutSection";
import PropertyShowcase from "@/components/PropertyShowcase";
import CTASection from "@/components/CTASection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import { useEffect } from "react";

export default function HomePage() {
  // Initialize animations on component mount
  useEffect(() => {
    // Hero section animations
    const heroTitle = document.getElementById('hero-title');
    const heroSubtitle = document.getElementById('hero-subtitle');
    const heroButtons = document.querySelector('.hero-buttons');
    
    if (heroTitle && heroSubtitle && heroButtons) {
      setTimeout(() => {
        heroTitle.style.opacity = '1';
        heroTitle.style.transform = 'translateY(0)';
        
        setTimeout(() => {
          heroSubtitle.style.opacity = '1';
          heroSubtitle.style.transform = 'translateY(0)';
          
          setTimeout(() => {
            heroButtons.style.opacity = '1';
            heroButtons.style.transform = 'translateY(0)';
          }, 300);
        }, 300);
      }, 300);
    }
  }, []);

  return (
    <>
      <HeroSection />
      <HeroImage />
      <HowItWorks />
      <AboutSection />
      <PropertyShowcase />
      <CTASection />
      <FAQSection />
      <ContactSection />
    </>
  );
}
