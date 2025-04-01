interface AboutPoint {
  icon: string;
  text: string;
}

export default function AboutSection() {
  const leftPoints: AboutPoint[] = [
    { icon: "🚀", text: "Fast & Transparent Rentals – No hidden fees, clear process" },
    { icon: "🤝", text: "65+ Happy House Owners – Trusted by property owners" },
    { icon: "🔍", text: "Quick Tenant Placement – Verified listings & screening" }
  ];

  const rightPoints: AboutPoint[] = [
    { icon: "📜", text: "Legal Rental Agreements – Hassle-free documentation" },
    { icon: "💰", text: "Affordable & Fixed Service Fee – Best rates guaranteed" },
    { icon: "☎️", text: "Dedicated Customer Support – 24/7 assistance for seamless renting experience" }
  ];

  return (
    <section id="about-section" className="py-16 md:py-24 bg-[#111111]">
      <h2 className="text-center text-4xl md:text-5xl text-primary mb-16 bg-[#1a1a1a] py-4 rounded-lg w-4/5 mx-auto shadow-md shadow-primary/10">
        Why Choose Housing Lord?
      </h2>
      
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-10 mb-12">
          <div data-aos="fade-right">
            {leftPoints.map((point, index) => (
              <div 
                key={`left-${index}`}
                className="bg-primary/10 hover:bg-primary/20 rounded-lg p-4 flex items-center mb-6 transform transition-all duration-300 hover:-translate-y-2"
              >
                <span className="text-4xl mr-4">{point.icon}</span>
                <p className="text-lg">{point.text}</p>
              </div>
            ))}
          </div>
          
          <div data-aos="fade-left">
            {rightPoints.map((point, index) => (
              <div 
                key={`right-${index}`}
                className="bg-primary/10 hover:bg-primary/20 rounded-lg p-4 flex items-center mb-6 transform transition-all duration-300 hover:-translate-y-2"
              >
                <span className="text-4xl mr-4">{point.icon}</span>
                <p className="text-lg">{point.text}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center" data-aos="fade-up">
          <button className="bg-primary text-black font-bold py-3 px-8 rounded-full text-xl transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/30">
            Join Housing Lord – Simplify Your Rental Journey!
          </button>
        </div>
      </div>
    </section>
  );
}
