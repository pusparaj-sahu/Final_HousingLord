import { useState, useEffect } from "react";
import { useIsMobile } from "../hooks/use-mobile";
import logo from "../assets/logo.png";
import { SignedOut, SignedIn, UserButton } from '@clerk/clerk-react';
import { useLocation, useNavigate } from "react-router-dom";

interface NavbarProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

export default function Navbar({ isMenuOpen, toggleMenu }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  const navigate = useNavigate();
  
  const isDashboard = location.pathname === '/dashboard';

  useEffect(() => {
    // Add viewport meta tag to ensure proper mobile scaling
    const viewport = document.querySelector('meta[name=viewport]');
    if (!viewport) {
      const meta = document.createElement('meta');
      meta.name = 'viewport';
      meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
      document.head.appendChild(meta);
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style>
        {`
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }

          .side-logo {
            position: fixed;
            left: 20px;
            top: 0;
            padding-top: 0.75rem;
            z-index: 50;
            pointer-events: none;
          }

          .side-logo img {
            pointer-events: auto;
            cursor: pointer;
          }

          .logo-bounce {
            animation: bounce 3s ease-in-out infinite;
          }

          .logo-glow {
            filter: drop-shadow(0 0 8px rgba(255, 193, 7, 0.5));
            transition: filter 0.3s ease;
          }

          .logo-glow:hover {
            filter: drop-shadow(0 0 12px rgba(255, 193, 7, 0.8));
          }

          .mobile-header {
            padding: 0.75rem 1rem;
            background: rgba(17, 25, 40, 0.95);
            backdrop-filter: blur(8px);
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 50;
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            max-width: 100vw;
          }

          .mobile-logo {
            height: 40px;
            width: auto;
          }

          .mobile-actions {
            display: flex;
            align-items: center;
            gap: 0.75rem;
          }

          .menu-toggle {
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            cursor: pointer;
            transition: all 0.2s ease;
          }

          .mobile-menu {
            position: fixed;
            top: 0;
            right: -100%;
            width: 100%;
            height: 100vh;
            background: rgba(17, 25, 40, 0.98);
            backdrop-filter: blur(8px);
            transition: right 0.3s ease-in-out;
            z-index: 40;
            padding: 5rem 1.5rem 2rem;
            display: flex;
            flex-direction: column;
          }

          .mobile-menu.open {
            right: 0;
          }

          .mobile-menu-links {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }

          .mobile-menu-link {
            font-size: 1.125rem;
            color: white;
            padding: 0.75rem;
            border-radius: 0.5rem;
            transition: all 0.2s;
            text-decoration: none;
          }

          .mobile-menu-link:hover {
            background: rgba(255, 255, 255, 0.1);
          }

          .clerk-user-button {
            transform: scale(1.2);
            margin: 0 0.5rem;
          }

          .clerk-user-button img {
            border: 2px solid rgba(255, 255, 255, 0.2);
            transition: all 0.2s ease;
          }

          .clerk-user-button:hover img {
            border-color: rgba(255, 255, 255, 0.4);
            transform: scale(1.05);
          }

          @media (max-width: 640px) {
            .mobile-menu {
              padding: 4rem 1rem 1.5rem;
            }

            .mobile-menu-link {
              font-size: 1rem;
              padding: 0.875rem;
            }
          }
        `}
      </style>

      {/* Mobile Header */}
      {isMobile && (
        <header className="mobile-header">
          <img
            src={logo}
            alt="Housing Lord"
            className="mobile-logo"
            onClick={() => navigate('/')}
          />
          <div className="mobile-actions">
            <SignedIn>
              <div className="clerk-user-button">
                <UserButton 
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "w-10 h-10",
                      userButtonPopoverCard: "bg-[#1a2234] border border-gray-700",
                      userButtonPopoverActions: "text-white",
                      userButtonPopoverActionButton: "hover:bg-gray-700",
                    }
                  }}
                />
              </div>
            </SignedIn>
            <button
              className="menu-toggle"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </header>
      )}

      {/* Mobile Menu */}
      {isMobile && (
        <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
          <div className="mobile-menu-links">
            <a
              className="mobile-menu-link"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate('/');
                toggleMenu();
              }}
            >
              Home
            </a>
            
            {isDashboard ? (
              <span className="mobile-menu-link">Dashboard</span>
            ) : (
              <>
                <a 
                  className="mobile-menu-link" 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/properties');
                    toggleMenu();
                  }}
                >
                  Properties
                </a>
                <a className="mobile-menu-link" href="#how-it-works">How It Works</a>
                <a className="mobile-menu-link" href="#about">About</a>
                <a className="mobile-menu-link" href="#faq">FAQs</a>
                <a className="mobile-menu-link" href="#contact">Contact</a>
              </>
            )}
            <SignedIn>
              {!isDashboard && (
                <a
                  className="mobile-menu-link"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/dashboard');
                    toggleMenu();
                  }}
                >
                  Dashboard
                </a>
              )}
            </SignedIn>
          </div>
        </div>
      )}

      {/* Desktop Navbar */}
      {!isMobile && (
        <>
          {!isDashboard && (
            <div className="side-logo hidden lg:block">
              <div className="h-[140px] lg:h-[160px] xl:h-[180px] 2xl:h-[200px] logo-bounce">
                <img
                  src={logo}
                  alt="Housing Lord"
                  className="h-full w-auto logo-glow"
                  onClick={() => navigate('/')}
                />
              </div>
            </div>
          )}
          <header
            className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
              isScrolled 
                ? "bg-background/90 backdrop-blur-lg shadow-lg py-4" 
                : "bg-transparent py-6"
            }`}
          >
            <div className="container mx-auto px-6">
              <div className="flex justify-between items-center">
                {!isDashboard && (
                  <a 
                    href="#" 
                    className="text-white text-2xl lg:text-3xl font-bold"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/');
                    }}
                  >
                    <span className="text-primary">Housing</span> Lord
                  </a>
                )}

                <nav className="flex items-center space-x-8">
                  <a 
                    href="#"
                    className="text-white hover:text-primary transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/');
                    }}
                  >
                    Home
                  </a>
                  {!isDashboard && (
                    <>
                      <a 
                        href="#"
                        className="text-white hover:text-primary transition-colors"
                        onClick={(e) => {
                          e.preventDefault();
                          navigate('/properties');
                        }}
                      >
                        Properties
                      </a>
                      <a href="#how-it-works" className="text-white hover:text-primary transition-colors">How It Works</a>
                      <a href="#about" className="text-white hover:text-primary transition-colors">About</a>
                      <a href="#faq" className="text-white hover:text-primary transition-colors">FAQs</a>
                      <a href="#contact" className="text-white hover:text-primary transition-colors">Contact</a>
                    </>
                  )}
                  <SignedIn>
                    {!isDashboard ? (
                      <a
                        href="#"
                        className="text-white hover:text-primary transition-colors"
                        onClick={(e) => {
                          e.preventDefault();
                          navigate('/dashboard');
                        }}
                      >
                        Dashboard
                      </a>
                    ) : (
                      <span className="text-white">Dashboard</span>
                    )}
                  </SignedIn>
                </nav>

                <div className="flex items-center space-x-6">
                  {!isDashboard && (
                    <>
                      <button 
                        onClick={() => {
                          if (typeof window !== 'undefined' && (window as any).togglePricingSidebar) {
                            (window as any).togglePricingSidebar();
                          }
                        }}
                        className="px-6 py-2 text-primary border border-primary rounded-full hover:bg-primary/10 transition-colors"
                      >
                        List Property
                      </button>
                      <SignedOut>
                        <button
                          className="px-6 py-2 bg-primary text-black rounded-full hover:bg-primary/90 transition-colors"
                          onClick={() => navigate('/sign-in')}
                        >
                          Sign In
                        </button>
                        <button
                          className="px-6 py-2 bg-primary text-black rounded-full hover:bg-primary/90 transition-colors"
                          onClick={() => navigate('/sign-up')}
                        >
                          Sign Up
                        </button>
                      </SignedOut>
                    </>
                  )}
                  
                  <SignedIn>
                    <div className="clerk-user-button">
                      <UserButton 
                        afterSignOutUrl="/"
                        appearance={{
                          elements: {
                            avatarBox: "w-10 h-10",
                            userButtonPopoverCard: "bg-[#1a2234] border border-gray-700",
                            userButtonPopoverActions: "text-white",
                            userButtonPopoverActionButton: "hover:bg-gray-700",
                          }
                        }}
                      />
                    </div>
                  </SignedIn>
                </div>
              </div>
            </div>
          </header>
        </>
      )}
    </>
  );
}