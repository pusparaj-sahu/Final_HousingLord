interface Step {
  icon: string;
  title: string;
  description: string;
  delay: number;
}

export default function HowItWorks() {
  const tenantSteps: Step[] = [
    { icon: "🏡", title: "Step 1", description: "Browse verified properties", delay: 0 },
    { icon: "📞", title: "Step 2", description: "Connect with property owners", delay: 100 },
    { icon: "✅", title: "Step 3", description: "Complete legal formalities", delay: 200 },
    { icon: "🎉", title: "Step 4", description: "Move in stress-free", delay: 300 }
  ];

  const ownerSteps: Step[] = [
    { icon: "📌", title: "Step 1", description: "List your property", delay: 0 },
    { icon: "🔍", title: "Step 2", description: "Get tenant verification", delay: 100 },
    { icon: "💰", title: "Step 3", description: "Set the best rental price", delay: 200 },
    { icon: "🤝", title: "Step 4", description: "Rent out stress-free", delay: 300 }
  ];

  return (
    <section className="py-16 md:py-24 bg-[#111111] text-white" id="services">
      <div className="container mx-auto px-6 max-w-6xl">
        <h2 className="text-center text-4xl md:text-5xl text-primary mb-16 bg-[#1a1a1a] py-4 rounded-lg w-4/5 mx-auto shadow-md shadow-primary/10">
          How It Works?
        </h2>
        
        <div className="grid md:grid-cols-2 gap-10 mb-16">
          <div className="tenant-path">
            <h3 className="text-2xl md:text-3xl text-primary mb-8 text-center">For Tenants</h3>
            <div className="space-y-8">
              {tenantSteps.map((step, index) => (
                <div 
                  key={`tenant-${index}`}
                  className="step flex items-center bg-[#1a1a1a]/50 hover:bg-primary/5 p-4 rounded-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-primary/10" 
                  data-aos="fade-right"
                  data-aos-delay={step.delay}
                >
                  <div className="step-icon text-4xl mr-6 bg-primary/10 hover:bg-primary/20 p-5 rounded-full transition-all duration-300">
                    {step.icon}
                  </div>
                  <div className="step-content flex-1">
                    <h4 className="text-2xl text-primary mb-2 font-semibold transition-transform duration-300">
                      {step.title}
                    </h4>
                    <p className="text-xl transition-transform duration-300">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="owner-path">
            <h3 className="text-2xl md:text-3xl text-primary mb-8 text-center">For Owners</h3>
            <div className="space-y-8">
              {ownerSteps.map((step, index) => (
                <div 
                  key={`owner-${index}`}
                  className="step flex items-center bg-[#1a1a1a]/50 hover:bg-primary/5 p-4 rounded-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-primary/10" 
                  data-aos="fade-left"
                  data-aos-delay={step.delay}
                >
                  <div className="step-icon text-4xl mr-6 bg-primary/10 hover:bg-primary/20 p-5 rounded-full transition-all duration-300">
                    {step.icon}
                  </div>
                  <div className="step-content flex-1">
                    <h4 className="text-2xl text-primary mb-2 font-semibold transition-transform duration-300">
                      {step.title}
                    </h4>
                    <p className="text-xl transition-transform duration-300">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="text-center" data-aos="fade-up">
          <button className="bg-primary text-black font-bold py-3 px-8 rounded-full text-xl transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/30">
            Start Your Journey Today!
          </button>
        </div>
      </div>
    </section>
  );
}
