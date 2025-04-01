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
        className={`absolute top-0 right-0 w-full max-w-md h-full bg-background border-l border-primary/20 shadow-xl overflow-y-auto transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
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
            <div className="space-y-6">
              <p className="text-white/70 leading-relaxed">
                Housing Lord was founded in 2023 with a mission to transform the rental experience in Odisha. Our founders, experienced in real estate and technology, identified the need for a transparent, efficient platform to connect property owners with verified tenants.
              </p>
              
              <h3 className="text-white text-lg font-bold mt-8">Our Mission</h3>
              <p className="text-white/70 leading-relaxed">
                To create a seamless, transparent, and secure rental ecosystem that benefits both property owners and tenants, setting new standards for the real estate industry in Odisha.
              </p>
              
              <h3 className="text-white text-lg font-bold mt-8">Our Vision</h3>
              <p className="text-white/70 leading-relaxed">
                To become Odisha's most trusted property rental platform, expanding across Eastern India while maintaining our commitment to quality service, transparency, and customer satisfaction.
              </p>
              
              <h3 className="text-white text-lg font-bold mt-8">Our Values</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-primary mt-1 mr-2"></i>
                  <div>
                    <span className="text-white font-semibold">Transparency</span>
                    <p className="text-white/70 mt-1">We believe in full disclosure and honest communication in all our dealings.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-primary mt-1 mr-2"></i>
                  <div>
                    <span className="text-white font-semibold">Security</span>
                    <p className="text-white/70 mt-1">We prioritize the safety and security of both properties and personal information.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-primary mt-1 mr-2"></i>
                  <div>
                    <span className="text-white font-semibold">Reliability</span>
                    <p className="text-white/70 mt-1">We deliver on our promises and maintain consistent service quality.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-primary mt-1 mr-2"></i>
                  <div>
                    <span className="text-white font-semibold">Innovation</span>
                    <p className="text-white/70 mt-1">We continuously improve our platform to better serve our customers.</p>
                  </div>
                </li>
              </ul>
              
              <h3 className="text-white text-lg font-bold mt-8">Our Team</h3>
              <div className="grid grid-cols-2 gap-6 mt-4">
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-2 border-primary">
                    <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Ravi Patel" className="w-full h-full object-cover" />
                  </div>
                  <h4 className="text-white font-semibold">Ravi Patel</h4>
                  <p className="text-primary text-sm">CEO & Co-Founder</p>
                </div>
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-2 border-primary">
                    <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Priya Sharma" className="w-full h-full object-cover" />
                  </div>
                  <h4 className="text-white font-semibold">Priya Sharma</h4>
                  <p className="text-primary text-sm">COO & Co-Founder</p>
                </div>
              </div>
              
              <p className="text-white/70 leading-relaxed mt-6">
                Our team of 15 dedicated professionals includes real estate experts, technology specialists, customer service representatives, and legal advisors, all working together to provide you with exceptional service.
              </p>
              
              <h3 className="text-white text-lg font-bold mt-8">Awards & Recognition</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <i className="fas fa-trophy text-primary mt-1 mr-2"></i>
                  <p className="text-white/70">Best PropTech Startup in Odisha, 2023</p>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-trophy text-primary mt-1 mr-2"></i>
                  <p className="text-white/70">Excellence in Customer Service, Bhubaneswar Business Awards 2023</p>
                </li>
              </ul>
              
              <div className="border-t border-primary/20 pt-6 mt-8">
                <h3 className="text-white text-lg font-bold">Contact Our Team</h3>
                <p className="text-white/70 mt-2 mb-4">
                  Have more questions about Housing Lord? Our team is here to help.
                </p>
                <a 
                  href="#contact" 
                  onClick={onClose}
                  className="inline-block bg-primary text-black py-2 px-6 rounded-lg font-bold hover:bg-white hover:text-primary transition-colors"
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