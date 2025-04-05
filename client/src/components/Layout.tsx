import { ReactNode, useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar"; // Ensure Sidebar.tsx is in the components directory

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPricingSidebarOpen, setIsPricingSidebarOpen] = useState(false);
  const [isAboutSidebarOpen, setIsAboutSidebarOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const togglePricingSidebar = () => {
    setIsPricingSidebarOpen(!isPricingSidebarOpen);
  };

  const toggleAboutSidebar = () => {
    setIsAboutSidebarOpen(!isAboutSidebarOpen);
  };

  useEffect(() => {
    // Make the sidebar toggle functions available globally
    (window as any).togglePricingSidebar = togglePricingSidebar;
    (window as any).toggleAboutSidebar = toggleAboutSidebar;

    // Add/remove overflow-hidden class to body when menu is open
    if (isMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isMenuOpen]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      
      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-30 bg-background transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ top: "60px" }}
      >
        <div className="container h-full mx-auto px-4 pt-6 pb-20 overflow-y-auto">
          <nav className="flex flex-col space-y-6">
            <a 
              href="#" 
              className="text-2xl font-bold text-white hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </a>
            <a 
              href="#properties" 
              className="text-2xl font-bold text-white hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Properties
            </a>
            <a 
              href="#how-it-works" 
              className="text-2xl font-bold text-white hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </a>
            <a 
              href="#about" 
              className="text-2xl font-bold text-white hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <a 
              href="#faq" 
              className="text-2xl font-bold text-white hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              FAQs
            </a>
            <a 
              href="#contact" 
              className="text-2xl font-bold text-white hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>
            
            <div className="pt-6 border-t border-primary/20 flex flex-col space-y-4">
              <button 
                onClick={() => {
                  setIsMenuOpen(false);
                  togglePricingSidebar();
                }}
                className="w-full py-3 text-primary border border-primary rounded-lg hover:bg-primary/10 transition-colors"
              >
                List Property
              </button>
              <button className="w-full py-3 bg-primary text-black rounded-lg hover:bg-white hover:text-primary transition-colors">
                Sign In
              </button>
            </div>
            
            <div className="pt-6 border-t border-primary/20">
              <div className="flex space-x-4 justify-center">
                <a href="#" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/30 transition-colors" aria-label="Facebook">
                  <i className="fab fa-facebook-f text-primary"></i>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/30 transition-colors" aria-label="Twitter">
                  <i className="fab fa-twitter text-primary"></i>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/30 transition-colors" aria-label="Instagram">
                  <i className="fab fa-instagram text-primary"></i>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/30 transition-colors" aria-label="LinkedIn">
                  <i className="fab fa-linkedin-in text-primary"></i>
                </a>
              </div>
            </div>
          </nav>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>
      
      <Footer />
      
      {/* Sidebars */}
      <Sidebar 
        type="pricing" 
        isOpen={isPricingSidebarOpen} 
        onClose={() => setIsPricingSidebarOpen(false)} 
      />
      
      <Sidebar 
        type="about" 
        isOpen={isAboutSidebarOpen} 
        onClose={() => setIsAboutSidebarOpen(false)} 
      />
    </div>
  );
}