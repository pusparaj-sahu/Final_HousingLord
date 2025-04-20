import { useState } from 'react';
import AboutSidebar from './AboutSidebar';

interface AboutPoint {
  icon: string;
  text: string;
}

export default function AboutSection() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const aboutPoints: AboutPoint[] = [
    {
      icon: "fas fa-check-circle",
      text: "All properties personally verified by our team",
    },
    {
      icon: "fas fa-shield-alt",
      text: "Background checks on all tenants",
    },
    {
      icon: "fas fa-file-contract",
      text: "Legally vetted rental agreements",
    },
    {
      icon: "fas fa-hand-holding-usd",
      text: "Transparent pricing with no hidden fees",
    },
    {
      icon: "fas fa-headset",
      text: "24/7 customer support for tenants & owners",
    },
    {
      icon: "fas fa-camera",
      text: "High-quality photos & virtual tours",
    },
  ];

  return (
    <>
      <section id="about" className="py-16 sm:py-20 bg-[#0a0a0a] relative z-10">
        <div className="container mx-auto px-4 sm:px-6 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div data-aos="fade-right" className="relative z-20">
              <span className="text-primary text-sm sm:text-base font-semibold uppercase tracking-wider">About Us</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2 sm:mt-3 mb-4 sm:mb-6 text-white">
                A New Approach to <span className="text-primary">Rental Services</span>
              </h2>
              <p className="text-sm sm:text-base text-white/70 leading-relaxed mb-6 sm:mb-8">
                Housing Lord was founded in 2023 with a mission to transform the rental experience in Odisha. Our founders, experienced in real estate, business, and technology, identified the need for a transparent, efficient platform to connect property owners with verified tenants.
              </p>
              <p className="text-sm sm:text-base text-white/70 leading-relaxed mb-6 sm:mb-8">
                The roots of Housing Lord go back to when Pavitra Kumar Panda, an ambitious MBA graduate in International Finance and co-founder of Hotel Aether, began managing rental connections in Bhubaneswar. Over time, he successfully facilitated 100+ home rentals, building trust and credibility in the local real estate space.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 sm:mb-8">
                {aboutPoints.map((point, index) => (
                  <div 
                    key={index} 
                    className="flex items-start gap-2 sm:gap-3"
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <div className="text-primary text-base sm:text-xl mt-0.5">
                      <i className={point.icon}></i>
                    </div>
                    <p className="text-sm sm:text-base text-white/90">{point.text}</p>
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                    <img 
                      src="/images/pavitra.jpg" 
                      alt="Pavitra Kumar Panda" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-white font-bold mb-1">Pavitra Kumar Panda</h3>
                  <p className="text-primary text-sm">CEO & Founder</p>
                </div>
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                    <img 
                      src="/images/ranjit.jpg" 
                      alt="Ranjit Kumar Panda" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-white font-bold mb-1">Ranjit Kumar Panda</h3>
                  <p className="text-primary text-sm">CMO & Co-Founder</p>
                </div>
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                    <img 
                      src="/images/pusparaj.jpg" 
                      alt="Pusparaj Sahu" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-white font-bold mb-1">Pusparaj Sahu</h3>
                  <p className="text-primary text-sm">CTO & Co-Founder</p>
                </div>
              </div>

              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="border border-primary text-white py-2.5 sm:py-3 px-5 sm:px-6 rounded-full text-sm sm:text-base font-bold hover:bg-primary/10 transition-colors relative z-20"
              >
                <i className="fas fa-info-circle mr-2"></i> Learn More About Us
              </button>
            </div>
            
            <div data-aos="fade-left" className="grid grid-cols-2 gap-4 sm:gap-6 relative z-20">
              <div className="space-y-4 sm:space-y-6">
                <div className="rounded-lg sm:rounded-xl overflow-hidden h-[180px] sm:h-[250px] shadow-lg shadow-primary/10">
                  <img 
                    src="https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                    alt="Modern living room" 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="rounded-lg sm:rounded-xl overflow-hidden h-[150px] sm:h-[200px] shadow-lg shadow-primary/10">
                  <img 
                    src="https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                    alt="Kitchen interior" 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
              <div className="space-y-4 sm:space-y-6 mt-6 sm:mt-10">
                <div className="rounded-lg sm:rounded-xl overflow-hidden h-[150px] sm:h-[200px] shadow-lg shadow-primary/10">
                  <img 
                    src="https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                    alt="Modern bedroom" 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="rounded-lg sm:rounded-xl overflow-hidden h-[180px] sm:h-[250px] shadow-lg shadow-primary/10">
                  <img 
                    src="https://images.unsplash.com/photo-1602872030490-4a484a7b3ba6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                    alt="Apartment building" 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AboutSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
    </>
  );
}