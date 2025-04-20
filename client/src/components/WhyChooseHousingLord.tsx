interface Feature {
  icon: string;
  title: string;
  description: string;
  delay: number;
}

export default function WhyChooseHousingLord() {
  const features: Feature[] = [
    {
      icon: "fas fa-rocket",
      title: "Fast & Transparent Rentals",
      description: "No hidden fees, clear process",
      delay: 100,
    },
    {
      icon: "fas fa-file-contract",
      title: "Legal Rental Agreements",
      description: "Hassle-free documentation",
      delay: 200,
    },
    {
      icon: "fas fa-handshake",
      title: "65+ Happy House Owners",
      description: "Trusted by property owners",
      delay: 300,
    },
    {
      icon: "fas fa-coins",
      title: "Affordable & Fixed Service Fee",
      description: "Best rates guaranteed",
      delay: 400,
    },
    {
      icon: "fas fa-search",
      title: "Quick Tenant Placement",
      description: "Verified listings & screening",
      delay: 500,
    },
    {
      icon: "fas fa-headset",
      title: "Dedicated Customer Support",
      description: "24/7 assistance for seamless renting experience",
      delay: 600,
    },
  ];

  return (
    <section id="why-choose-us" className="py-20 bg-[#121212] overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-yellow-400">
            Why Choose Housing Lord?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={feature.delay}
              className="bg-[#1a1a1a] rounded-xl p-6 flex items-center gap-4 group hover:bg-[#222] transition-all duration-300 border border-yellow-400/10 hover:border-yellow-400/30"
            >
              <div className="w-12 h-12 rounded-full bg-yellow-400/10 flex items-center justify-center group-hover:bg-yellow-400/20 transition-all duration-300 flex-shrink-0">
                <i className={`${feature.icon} text-yellow-400 text-xl`}></i>
              </div>
              <div>
                <h3 className="text-white text-lg font-semibold mb-1">
                  {feature.title}
                </h3>
                <p className="text-white/70 text-sm">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center" data-aos="fade-up">
          <a
            href="#"
            className="inline-block bg-yellow-400 text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-300 transform hover:scale-105 transition-all duration-300"
          >
            Join Housing Lord – Simplify Your Rental Journey!
          </a>
        </div>
      </div>
    </section>
  );
} 