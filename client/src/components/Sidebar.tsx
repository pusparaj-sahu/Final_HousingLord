import { useEffect, useRef } from "react";

interface SidebarProps {
  type: "pricing" | "about";
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ type, isOpen, onClose }: SidebarProps) {
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node) && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <div 
      className={`fixed inset-0 z-50 ${isOpen ? 'visible' : 'invisible'}`}
      style={{ transition: "visibility 0.3s" }}
    >
      <div 
        className={`absolute inset-0 bg-black/70 backdrop-blur-sm ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        style={{ transition: "opacity 0.3s" }}
      ></div>
      
      <div 
        ref={sidebarRef}
        className={`absolute top-0 right-0 w-full md:w-1/2 h-full bg-background border-l border-primary/20 shadow-xl overflow-y-auto transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ transition: "transform 0.3s ease-in-out" }}
      >
        <div className="sticky top-0 z-10 flex justify-between items-center p-6 bg-gradient-to-b from-background to-transparent">
          <h2 className="text-xl font-bold text-white">
            {type === 'pricing' ? 'Pricing Plans' : 'About Housing Lord'}
          </h2>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-background/80 border border-primary/20 flex items-center justify-center text-white hover:bg-primary/10"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="p-6 pt-0">
          {type === 'pricing' && (
            <div className="space-y-8">
              <p className="text-white/70 leading-relaxed">
                Choose the perfect plan for your property listing needs. We offer flexible options for both property owners and tenants.
              </p>
              
              {/* Basic Plan */}
              <div className="bg-background/50 border border-primary/20 rounded-xl p-6 transition-transform hover:scale-[1.02]">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-white text-xl font-bold">Basic Plan</h3>
                    <p className="text-primary mt-1">For Individual Owners</p>
                  </div>
                  <div className="text-right">
                    <span className="text-white text-2xl font-bold">₹999</span>
                    <p className="text-white/60 text-sm">one-time fee</p>
                  </div>
                </div>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
                    <span className="text-white/80">List 1 property for 30 days</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
                    <span className="text-white/80">Basic property verification</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
                    <span className="text-white/80">Up to 5 photos per listing</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
                    <span className="text-white/80">Standard rental agreement template</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-times text-red-500 mt-1 mr-2"></i>
                    <span className="text-white/60">No featured placement</span>
                  </li>
                </ul>
                
                <button className="w-full py-3 bg-primary text-black rounded-lg font-bold hover:bg-white hover:text-primary transition-colors">
                  Choose Basic Plan
                </button>
              </div>
              
              {/* Premium Plan */}
              <div className="bg-background/50 border-2 border-primary rounded-xl p-6 relative transition-transform hover:scale-[1.02]">
                <div className="absolute -top-3 right-6 bg-primary text-black px-3 py-1 rounded-full text-sm font-bold">
                  Popular
                </div>
                
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-white text-xl font-bold">Premium Plan</h3>
                    <p className="text-primary mt-1">For Serious Owners</p>
                  </div>
                  <div className="text-right">
                    <span className="text-white text-2xl font-bold">₹2,499</span>
                    <p className="text-white/60 text-sm">one-time fee</p>
                  </div>
                </div>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
                    <span className="text-white/80">List 1 property for 60 days</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
                    <span className="text-white/80">Premium property verification badge</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
                    <span className="text-white/80">Up to 15 photos per listing</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
                    <span className="text-white/80">Professional photography service</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
                    <span className="text-white/80">Featured placement for 14 days</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
                    <span className="text-white/80">Customized rental agreement</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
                    <span className="text-white/80">Priority customer support</span>
                  </li>
                </ul>
                
                <button className="w-full py-3 bg-primary text-black rounded-lg font-bold hover:bg-white hover:text-primary transition-colors">
                  Choose Premium Plan
                </button>
              </div>
              
              {/* Elite Plan */}
              <div className="bg-background/50 border border-primary/20 rounded-xl p-6 transition-transform hover:scale-[1.02]">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-white text-xl font-bold">Elite Plan</h3>
                    <p className="text-primary mt-1">For Property Businesses</p>
                  </div>
                  <div className="text-right">
                    <span className="text-white text-2xl font-bold">₹5,999</span>
                    <p className="text-white/60 text-sm">one-time fee</p>
                  </div>
                </div>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
                    <span className="text-white/80">List up to 5 properties for 90 days</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
                    <span className="text-white/80">Elite property verification badge</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
                    <span className="text-white/80">Unlimited photos per listing</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
                    <span className="text-white/80">Professional photography & virtual tour</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
                    <span className="text-white/80">Featured placement for 30 days</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
                    <span className="text-white/80">Legal consultation services</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
                    <span className="text-white/80">Dedicated account manager</span>
                  </li>
                </ul>
                
                <button className="w-full py-3 bg-primary text-black rounded-lg font-bold hover:bg-white hover:text-primary transition-colors">
                  Choose Elite Plan
                </button>
              </div>
              
              <p className="text-white/60 text-sm text-center mt-6">
                All plans include access to our tenant verification service. Custom plans available for real estate agencies.
                <a href="#contact" onClick={onClose} className="text-primary hover:underline ml-1">Contact us</a> for details.
              </p>
            </div>
          )}
          
          {type === 'about' && (
            <div className="space-y-8 max-w-3xl mx-auto">
              <div className="bg-background/30 border border-primary/20 rounded-xl p-6">
                <p className="text-white/80 leading-relaxed text-lg">
                  Housing Lord was founded in 2023 with a mission to transform the rental experience in Odisha. Our founders, experienced in real estate and technology, identified the need for a transparent, efficient platform to connect property owners with verified tenants.
                </p>
              </div>
              
              <div className="bg-background/30 border border-primary/20 rounded-xl p-6">
                <h3 className="text-white text-xl font-bold mb-6 flex items-center">
                  <i className="fas fa-history text-primary mr-3"></i>
                  Our Story
                </h3>
                <div className="relative">
                  {/* Journey Path */}
                  <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 to-primary/20 transform -translate-x-1/2"></div>
                  
                  {/* 2023 Node */}
                  <div className="relative mb-16">
                    <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background animate-glow"></div>
                    <div className="grid grid-cols-2 gap-4 items-center">
                      <div className="text-right pr-8">
                        <span className="text-primary font-bold text-2xl">2023</span>
                        <h4 className="text-white font-semibold mt-1 text-lg">The Beginning</h4>
                      </div>
                      <div className="pl-8 relative">
                        <div className="absolute left-0 top-1/2 w-8 h-0.5 bg-gradient-to-r from-primary/50 to-transparent transform -translate-y-1/2"></div>
                        <div className="bg-background/40 border border-primary/20 rounded-lg p-4">
                          <p className="text-white/80 text-sm leading-relaxed">
                            Pavitra Kumar Panda began connecting tenants with property owners in Bhubaneswar, successfully managing 100+ homes
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* 2025 Node */}
                  <div className="relative">
                    <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background animate-glow"></div>
                    <div className="grid grid-cols-2 gap-4 items-center">
                      <div className="text-right pr-8">
                        <span className="text-primary font-bold text-2xl">2025</span>
                        <h4 className="text-white font-semibold mt-1 text-lg">Official Launch</h4>
                      </div>
                      <div className="pl-8 relative">
                        <div className="absolute left-0 top-1/2 w-8 h-0.5 bg-gradient-to-r from-primary/50 to-transparent transform -translate-y-1/2"></div>
                        <div className="bg-background/40 border border-primary/20 rounded-lg p-4">
                          <p className="text-white/80 text-sm leading-relaxed">
                            Launched Housing Lord with two co-founders, combining expertise in hospitality, technology, and real estate
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-background/30 border border-primary/20 rounded-xl p-6">
                  <h3 className="text-white text-xl font-bold mb-4 flex items-center">
                    <i className="fas fa-bullseye text-primary mr-3"></i>
                    Our Mission
                  </h3>
                  <p className="text-white/80 leading-relaxed">
                    To create a seamless, transparent, and secure rental ecosystem that benefits both property owners and tenants.
                  </p>
                </div>
                
                <div className="bg-background/30 border border-primary/20 rounded-xl p-6">
                  <h3 className="text-white text-xl font-bold mb-4 flex items-center">
                    <i className="fas fa-eye text-primary mr-3"></i>
                    Our Vision
                  </h3>
                  <p className="text-white/80 leading-relaxed">
                    To become Odisha's most trusted property rental platform, expanding across Eastern India.
                  </p>
                </div>
              </div>
              
              <div className="bg-background/30 border border-primary/20 rounded-xl p-6">
                <h3 className="text-white text-xl font-bold mb-6 flex items-center">
                  <i className="fas fa-star text-primary mr-3"></i>
                  Our Values
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <i className="fas fa-check-circle text-primary mt-1"></i>
                      <div>
                        <h4 className="text-white font-semibold">Transparency</h4>
                        <p className="text-white/70 text-sm mt-1">Full disclosure in all dealings</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <i className="fas fa-shield-alt text-primary mt-1"></i>
                      <div>
                        <h4 className="text-white font-semibold">Security</h4>
                        <p className="text-white/70 text-sm mt-1">Safety of properties & data</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <i className="fas fa-handshake text-primary mt-1"></i>
                      <div>
                        <h4 className="text-white font-semibold">Reliability</h4>
                        <p className="text-white/70 text-sm mt-1">Consistent service quality</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <i className="fas fa-lightbulb text-primary mt-1"></i>
                      <div>
                        <h4 className="text-white font-semibold">Innovation</h4>
                        <p className="text-white/70 text-sm mt-1">Continuous improvement</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-background/30 border border-primary/20 rounded-xl p-6 text-center">
                <h3 className="text-white text-xl font-bold mb-3">Contact Our Team</h3>
                <p className="text-white/70 mb-4">
                  Have questions about Housing Lord? We're here to help.
                </p>
                <a 
                  href="#contact" 
                  onClick={onClose}
                  className="inline-block bg-primary text-black py-3 px-8 rounded-lg font-bold hover:bg-white hover:text-primary transition-colors"
                >
                  Contact Us
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}