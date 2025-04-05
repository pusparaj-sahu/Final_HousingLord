interface AboutPoint {
  icon: string;
  text: string;
}

export default function AboutSection() {
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
    <section id="about" className="py-20 bg-[#0a0a0a]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div data-aos="fade-right">
            <span className="text-primary font-semibold uppercase tracking-wider">About Us</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-6 text-white">
              A New Approach to <span className="text-primary">Rental Services</span>
            </h2>
            <p className="text-white/70 leading-relaxed mb-8">
              Founded in 2023, Housing Lord has quickly become Odisha's premier 
              rental service platform, connecting property owners with verified tenants 
              across Bhubaneswar, Cuttack, and Puri.
            </p>
            <p className="text-white/70 leading-relaxed mb-8">
              Our mission is to transform the rental experience in Odisha by creating a 
              transparent, efficient marketplace that benefits both property owners and tenants.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {aboutPoints.map((point, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-3"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="text-primary text-xl mt-0.5">
                    <i className={point.icon}></i>
                  </div>
                  <p className="text-white/90">{point.text}</p>
                </div>
              ))}
            </div>
            
            <button 
              onClick={() => {
                if (typeof window !== 'undefined' && 'toggleAboutSidebar' in (window as any)) {
                  (window as any).toggleAboutSidebar();
                }
              }}
              className="border border-primary text-white py-3 px-6 rounded-full font-bold hover:bg-primary/10 transition-colors"
            >
              <i className="fas fa-info-circle mr-2"></i> Learn More About Us
            </button>
          </div>
          
          <div data-aos="fade-left" className="grid grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="rounded-xl overflow-hidden h-[250px] shadow-lg shadow-primary/10">
                <img 
                  src="https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                  alt="Modern living room" 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="rounded-xl overflow-hidden h-[200px] shadow-lg shadow-primary/10">
                <img 
                  src="https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                  alt="Kitchen interior" 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
            <div className="space-y-6 mt-10">
              <div className="rounded-xl overflow-hidden h-[200px] shadow-lg shadow-primary/10">
                <img 
                  src="https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                  alt="Modern bedroom" 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="rounded-xl overflow-hidden h-[250px] shadow-lg shadow-primary/10">
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
  );
}