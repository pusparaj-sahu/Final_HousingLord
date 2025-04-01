import { ReactNode, useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [pricingSidebarOpen, setPricingSidebarOpen] = useState(false);
  const [aboutSidebarOpen, setAboutSidebarOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const togglePricingSidebar = () => {
    setPricingSidebarOpen(!pricingSidebarOpen);
  };

  const toggleAboutSidebar = () => {
    setAboutSidebarOpen(!aboutSidebarOpen);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    // Add AOS for on-scroll animations
    if (typeof window !== 'undefined') {
      import('aos').then((AOS) => {
        AOS.init({
          duration: 1000,
          easing: 'ease-out-cubic',
          once: true,
          mirror: false,
          disable: window.innerWidth < 768
        });
      });
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="font-montserrat bg-black text-white min-h-screen flex flex-col relative overflow-x-hidden">
      {/* Logo */}
      <img 
        src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600&q=80" 
        alt="Housing Lord Logo" 
        className="fixed top-5 left-5 z-50 w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full object-cover animate-float shadow-lg shadow-primary/30 bg-black p-1 transition-all hover:scale-110 hover:rotate-3 hover:brightness-110 hover:shadow-xl hover:shadow-primary/50"
      />
      
      <Navbar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />

      <main>
        {children}
      </main>

      <Sidebar 
        type="pricing"
        isOpen={pricingSidebarOpen}
        onClose={togglePricingSidebar}
      />

      <Sidebar
        type="about"
        isOpen={aboutSidebarOpen}
        onClose={toggleAboutSidebar}
      />

      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 bg-primary text-black w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-lg transition-all hover:-translate-y-1 hover:bg-white hover:text-primary hover:scale-110 hover:shadow-primary/40 z-50 ${
          showBackToTop ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        aria-label="Back to top"
      >
        ↑
      </button>

      <Footer />

      {/* Make sidebar toggles available globally */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.togglePricingSidebar = ${togglePricingSidebar.toString()};
            window.toggleAboutSidebar = ${toggleAboutSidebar.toString()};
          `,
        }}
      />
    </div>
  );
}
