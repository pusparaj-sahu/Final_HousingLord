import { useState, useEffect } from "react";

interface NavbarProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

export default function Navbar({ isMenuOpen, toggleMenu }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button 
        className="menu-toggle fixed top-5 right-5 z-50 lg:hidden bg-transparent border-none text-white hover:text-primary p-2 transition-all text-2xl focus:outline-none" 
        aria-label="Toggle Menu"
        onClick={toggleMenu}
      >
        <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
      </button>

      {/* Desktop Navigation */}
      <nav className={`main-nav fixed top-0 left-0 right-0 z-40 bg-black/90 py-4 shadow-md hidden lg:block transition-all ${isScrolled ? 'bg-black/95' : 'bg-transparent'}`}>
        <ul className="flex justify-end items-center gap-8 px-6 lg:px-10">
          <li>
            <a href="#home" className="text-white hover:text-primary transition-all relative group">
              Home
              <span className="absolute left-0 bottom-[-5px] w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </a>
          </li>
          <li>
            <a href="#about-housing-lord" className="text-white hover:text-primary transition-all relative group">
              About Us
              <span className="absolute left-0 bottom-[-5px] w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </a>
          </li>
          <li>
            <a href="#properties" className="text-white hover:text-primary transition-all relative group">
              Properties
              <span className="absolute left-0 bottom-[-5px] w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </a>
          </li>
          <li>
            <a href="#services" className="text-white hover:text-primary transition-all relative group">
              Services
              <span className="absolute left-0 bottom-[-5px] w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </a>
          </li>
          <li>
            <a href="#contact" className="text-white hover:text-primary transition-all relative group">
              Contact Us
              <span className="absolute left-0 bottom-[-5px] w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </a>
          </li>
          <li>
            <button 
              className="bg-primary text-black font-bold py-2 px-6 rounded-full hover:transform hover:scale-105 transition-all shadow-md hover:shadow-primary/30"
              onClick={() => window.open('#book-now', '_self')}
            >
              Book Now
            </button>
          </li>
        </ul>
      </nav>

      {/* Mobile Navigation */}
      <nav className={`fixed inset-0 bg-black/95 z-40 lg:hidden transition-all duration-300 overflow-hidden ${isMenuOpen ? 'flex' : 'hidden'}`}>
        <div className="flex flex-col justify-center items-center h-full">
          <ul className="flex flex-col items-center gap-6 p-10 text-center">
            <li className={`w-full ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'} transition-all duration-300 delay-100`}>
              <a 
                href="#home" 
                className="block text-xl py-3 text-white hover:text-primary hover:translate-x-2 transition-all"
                onClick={toggleMenu}
              >
                Home
              </a>
            </li>
            <li className={`w-full ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'} transition-all duration-300 delay-200`}>
              <a 
                href="#about-housing-lord" 
                className="block text-xl py-3 text-white hover:text-primary hover:translate-x-2 transition-all"
                onClick={toggleMenu}
              >
                About Us
              </a>
            </li>
            <li className={`w-full ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'} transition-all duration-300 delay-300`}>
              <a 
                href="#properties" 
                className="block text-xl py-3 text-white hover:text-primary hover:translate-x-2 transition-all"
                onClick={toggleMenu}
              >
                Properties
              </a>
            </li>
            <li className={`w-full ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'} transition-all duration-300 delay-400`}>
              <a 
                href="#services" 
                className="block text-xl py-3 text-white hover:text-primary hover:translate-x-2 transition-all"
                onClick={toggleMenu}
              >
                Services
              </a>
            </li>
            <li className={`w-full ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'} transition-all duration-300 delay-500`}>
              <a 
                href="#contact" 
                className="block text-xl py-3 text-white hover:text-primary hover:translate-x-2 transition-all"
                onClick={toggleMenu}
              >
                Contact Us
              </a>
            </li>
            <li className={`w-full ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'} transition-all duration-300 delay-600`}>
              <button 
                className="mt-4 w-full max-w-[200px] bg-primary text-black font-bold py-3 px-6 rounded-full hover:transform hover:shadow-lg hover:shadow-primary/30 transition-all"
                onClick={() => {
                  toggleMenu();
                  window.open('#book-now', '_self');
                }}
              >
                Book Now
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
