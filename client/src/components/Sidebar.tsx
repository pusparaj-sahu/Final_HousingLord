import { useEffect, useRef } from "react";

interface SidebarProps {
  type: "pricing" | "about";
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ type, isOpen, onClose }: SidebarProps) {
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Prevent scrolling when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }

    return () => {
      document.body.style.overflow = "visible";
    };
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        ref={sidebarRef}
        className={`absolute top-0 bottom-0 right-0 w-full max-w-sm bg-background shadow-xl shadow-primary/20 p-6 overflow-y-auto transform transition-transform ${
          isOpen ? "translate-x-0 animate-slideIn" : "translate-x-full"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-primary hover:text-white"
          aria-label="Close sidebar"
        >
          ×
        </button>

        <div className="pt-10">
          {type === "pricing" ? (
            <div>
              <h2 className="text-2xl font-bold text-primary mb-6">Our Pricing</h2>
              
              <div className="space-y-8">
                <div className="border border-primary/30 rounded-lg p-5 hover:border-primary/80 transition-all">
                  <h3 className="text-xl font-semibold mb-2">Basic Package</h3>
                  <p className="text-3xl font-bold text-primary mb-4">₹499<span className="text-sm text-muted-foreground">/month</span></p>
                  <ul className="space-y-2 mb-5">
                    <li className="flex items-center">
                      <i className="fas fa-check text-primary mr-2"></i>
                      <span>Property listing for 30 days</span>
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-check text-primary mr-2"></i>
                      <span>Up to 5 photos</span>
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-check text-primary mr-2"></i>
                      <span>Basic visibility</span>
                    </li>
                  </ul>
                  <button className="w-full bg-primary text-black py-2 rounded-md font-medium hover:bg-white hover:text-primary transition-colors">
                    Select Plan
                  </button>
                </div>

                <div className="border-2 border-primary rounded-lg p-5 relative bg-gradient-to-br from-background to-background/50 shadow-lg">
                  <div className="absolute -top-3 right-5 bg-primary text-black px-3 py-1 rounded-full text-xs font-bold">
                    POPULAR
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Premium Package</h3>
                  <p className="text-3xl font-bold text-primary mb-4">₹999<span className="text-sm text-muted-foreground">/month</span></p>
                  <ul className="space-y-2 mb-5">
                    <li className="flex items-center">
                      <i className="fas fa-check text-primary mr-2"></i>
                      <span>Property listing for 60 days</span>
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-check text-primary mr-2"></i>
                      <span>Up to 15 photos</span>
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-check text-primary mr-2"></i>
                      <span>Featured positioning</span>
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-check text-primary mr-2"></i>
                      <span>Social media promotion</span>
                    </li>
                  </ul>
                  <button className="w-full bg-primary text-black py-2 rounded-md font-medium hover:bg-white hover:text-primary transition-colors">
                    Select Plan
                  </button>
                </div>

                <div className="border border-primary/30 rounded-lg p-5 hover:border-primary/80 transition-all">
                  <h3 className="text-xl font-semibold mb-2">Elite Package</h3>
                  <p className="text-3xl font-bold text-primary mb-4">₹1999<span className="text-sm text-muted-foreground">/month</span></p>
                  <ul className="space-y-2 mb-5">
                    <li className="flex items-center">
                      <i className="fas fa-check text-primary mr-2"></i>
                      <span>Property listing for 90 days</span>
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-check text-primary mr-2"></i>
                      <span>Unlimited photos</span>
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-check text-primary mr-2"></i>
                      <span>Top placement guaranteed</span>
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-check text-primary mr-2"></i>
                      <span>Virtual tour capability</span>
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-check text-primary mr-2"></i>
                      <span>Dedicated account manager</span>
                    </li>
                  </ul>
                  <button className="w-full bg-primary text-black py-2 rounded-md font-medium hover:bg-white hover:text-primary transition-colors">
                    Select Plan
                  </button>
                </div>
              </div>

              <p className="mt-8 text-sm text-muted-foreground">
                All plans include basic tenant verification. For custom corporate packages, please contact our sales team.
              </p>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold text-primary mb-6">About Housing Lord</h2>
              
              <p className="mb-4">
                Founded in 2023, Housing Lord has quickly become Odisha's premier rental service platform, 
                connecting property owners with verified tenants across Bhubaneswar, Cuttack, and Puri.
              </p>
              
              <h3 className="text-lg font-semibold text-primary mt-6 mb-3">Our Mission</h3>
              <p className="mb-4">
                To transform the rental experience in Odisha by creating a transparent, 
                efficient marketplace that benefits both property owners and tenants.
              </p>
              
              <h3 className="text-lg font-semibold text-primary mt-6 mb-3">Our Vision</h3>
              <p className="mb-4">
                To be the most trusted name in Odisha's real estate rental market, known for 
                reliability, innovation, and exceptional customer service.
              </p>
              
              <h3 className="text-lg font-semibold text-primary mt-6 mb-3">Our Values</h3>
              <ul className="space-y-2 mb-5">
                <li className="flex items-start">
                  <i className="fas fa-check text-primary mr-2 mt-1"></i>
                  <span><strong className="text-primary">Integrity:</strong> We operate with complete transparency in all our dealings.</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check text-primary mr-2 mt-1"></i>
                  <span><strong className="text-primary">Innovation:</strong> We continuously improve our platform to better serve our users.</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check text-primary mr-2 mt-1"></i>
                  <span><strong className="text-primary">Community:</strong> We're committed to improving housing access across Odisha.</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check text-primary mr-2 mt-1"></i>
                  <span><strong className="text-primary">Excellence:</strong> We strive for the highest standards in every aspect of our service.</span>
                </li>
              </ul>
              
              <div className="mt-8 p-5 bg-primary/5 rounded-lg border border-primary/20">
                <h3 className="text-lg font-semibold text-primary mb-3">Our Team</h3>
                <p className="mb-2">
                  Housing Lord is powered by a dedicated team of real estate professionals, 
                  technology experts, and customer service specialists, all committed to 
                  revolutionizing Odisha's rental market.
                </p>
                <p>
                  With decades of combined experience in Odisha's property market, 
                  we understand the unique challenges and opportunities in this region.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}