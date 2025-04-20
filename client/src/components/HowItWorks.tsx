interface Step {
  icon: string;
  title: string;
  description: string;
  delay: number;
}

export default function HowItWorks() {
  const tenantSteps: Step[] = [
    {
      icon: "fas fa-home",
      title: "Browse verified properties",
      description: "Explore our extensive collection of verified properties in prime locations.",
      delay: 100,
    },
    {
      icon: "fas fa-hand-pointer",
      title: "Submit your interest",
      description: "Choose a property and express your interest—Housing Lord will facilitate the process with the property owner.",
      delay: 200,
    },
    {
      icon: "fas fa-file-signature",
      title: "Complete legal formalities",
      description: "Seamlessly complete all necessary documentation and verification process.",
      delay: 300,
    },
    {
      icon: "fas fa-smile",
      title: "Move in stress-free",
      description: "Get your keys and start your journey in your new home worry-free.",
      delay: 400,
    },
  ];

  const ownerSteps: Step[] = [
    {
      icon: "fas fa-clipboard-list",
      title: "List your property",
      description: "Create an attractive listing with photos and detailed information.",
      delay: 100,
    },
    {
      icon: "fas fa-user-check",
      title: "Get tenant verification",
      description: "We verify potential tenants to ensure security and reliability.",
      delay: 200,
    },
    {
      icon: "fas fa-money-bill-wave",
      title: "Set the best rental price",
      description: "Get market insights to set competitive rental prices for your property.",
      delay: 300,
    },
    {
      icon: "fas fa-handshake",
      title: "Rent out stress-free",
      description: "Find reliable tenants and manage your property with ease.",
      delay: 400,
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-b from-black to-[#121212] overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-yellow-400">How It Works?</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Tenants Section */}
          <div className="space-y-8" data-aos="fade-right">
            <h3 className="text-3xl font-bold text-yellow-400 text-center mb-10">For Tenants</h3>
            <div className="space-y-12">
              {tenantSteps.map((step, index) => (
                <div
                  key={`tenant-${index}`}
                  data-aos="fade-up"
                  data-aos-delay={step.delay}
                  className="flex items-start gap-6 group"
                >
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-yellow-400/10 flex items-center justify-center group-hover:bg-yellow-400/20 transition-all duration-300">
                      <i className={`${step.icon} text-yellow-400 text-2xl`}></i>
                    </div>
                    {index < tenantSteps.length - 1 && (
                      <div className="absolute top-16 left-1/2 w-0.5 h-16 bg-yellow-400/20 -translate-x-1/2"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xl font-bold text-yellow-400">Step {index + 1}</span>
                      <h4 className="text-white text-xl font-semibold">{step.title}</h4>
                    </div>
                    <p className="text-white/70">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Owners Section */}
          <div className="space-y-8" data-aos="fade-left">
            <h3 className="text-3xl font-bold text-yellow-400 text-center mb-10">For Owners</h3>
            <div className="space-y-12">
              {ownerSteps.map((step, index) => (
                <div
                  key={`owner-${index}`}
                  data-aos="fade-up"
                  data-aos-delay={step.delay}
                  className="flex items-start gap-6 group"
                >
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-yellow-400/10 flex items-center justify-center group-hover:bg-yellow-400/20 transition-all duration-300">
                      <i className={`${step.icon} text-yellow-400 text-2xl`}></i>
                    </div>
                    {index < ownerSteps.length - 1 && (
                      <div className="absolute top-16 left-1/2 w-0.5 h-16 bg-yellow-400/20 -translate-x-1/2"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xl font-bold text-yellow-400">Step {index + 1}</span>
                      <h4 className="text-white text-xl font-semibold">{step.title}</h4>
                    </div>
                    <p className="text-white/70">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 text-center" data-aos="fade-up">
          <button className="bg-yellow-400 text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-300 transform hover:scale-105 transition-all duration-300">
            Start Your Journey Today!
          </button>
        </div>
      </div>
    </section>
  );
}