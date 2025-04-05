import { useState, useEffect } from "react";
import { useIsMobile } from "../hooks/use-mobile";

interface NavbarProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

export default function Navbar({ isMenuOpen, toggleMenu }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled 
          ? "bg-background/90 backdrop-blur-lg shadow-lg py-3" 
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <a 
            href="#" 
            className="text-white text-2xl font-bold flex items-center"
          >
            <span className="text-primary mr-1">Housing</span> Lord
          </a>

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-white hover:text-primary transition-colors">Home</a>
              <a href="#properties" className="text-white hover:text-primary transition-colors">Properties</a>
              <a href="#how-it-works" className="text-white hover:text-primary transition-colors">How It Works</a>
              <a href="#about" className="text-white hover:text-primary transition-colors">About</a>
              <a href="#faq" className="text-white hover:text-primary transition-colors">FAQs</a>
              <a href="#contact" className="text-white hover:text-primary transition-colors">Contact</a>
            </nav>
          )}

          {/* Right Side - CTA Buttons */}
          <div className="flex items-center">
            {!isMobile && (
              <div className="flex space-x-4 mr-4">
                <button 
                  onClick={() => {
                    if (typeof window !== 'undefined' && (window as any).togglePricingSidebar) {
                      (window as any).togglePricingSidebar();
                    }
                  }}
                  className="px-4 py-2 text-primary border border-primary rounded-full hover:bg-primary/10 transition-colors"
                >
                  List Property
                </button>
                <button className="px-4 py-2 bg-primary text-black rounded-full hover:bg-white hover:text-primary transition-colors">
                  Sign In
                </button>
              </div>
            )}
            
            {/* Mobile Menu Button */}
            <button 
              className="w-10 h-10 flex items-center justify-center focus:outline-none"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
              aria-expanded={isMenuOpen}
            >
              <div className="relative w-6 h-5 transform transition-all duration-300">
                <span 
                  className={`absolute h-0.5 w-6 bg-white transform transition-all duration-300 ${
                    isMenuOpen ? "rotate-45 top-2" : "rotate-0 top-0"
                  }`} 
                />
                <span 
                  className={`absolute h-0.5 w-6 bg-white transform transition-all duration-300 ${
                    isMenuOpen ? "opacity-0 top-2" : "opacity-100 top-2"
                  }`} 
                />
                <span 
                  className={`absolute h-0.5 w-6 bg-white transform transition-all duration-300 ${
                    isMenuOpen ? "-rotate-45 top-2" : "rotate-0 top-4"
                  }`} 
                />
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}