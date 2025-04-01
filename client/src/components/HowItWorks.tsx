interface Step {
  icon: string;
  title: string;
  description: string;
  delay: number;
}

export default function HowItWorks() {
  const steps: Step[] = [
    {
      icon: "fas fa-search",
      title: "Search Properties",
      description: "Browse our extensive collection of verified properties across Bhubaneswar, Cuttack, and Puri.",
      delay: 0,
    },
    {
      icon: "fas fa-calendar-check",
      title: "Schedule Visits",
      description: "Book property visits at your convenience through our simple scheduling system.",
      delay: 200,
    },
    {
      icon: "fas fa-file-signature",
      title: "Apply & Verify",
      description: "Complete your application and verification process entirely online - fast and secure.",
      delay: 400,
    },
    {
      icon: "fas fa-key",
      title: "Get Your Keys",
      description: "Sign the lease agreement and receive your keys to your new home!",
      delay: 600,
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-b from-black to-[#121212]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16" data-aos="fade-up">
          <span className="text-primary font-semibold uppercase tracking-wider">Simple Process</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-6 text-white">How Housing Lord Works</h2>
          <p className="text-white/70 max-w-3xl mx-auto">
            We've streamlined the rental process to make finding your next home or tenant as easy as possible.
            Follow these simple steps to get started.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              data-aos="fade-up" 
              data-aos-delay={step.delay}
              className="bg-background/30 rounded-lg p-6 border border-primary/20 hover:border-primary/60 transition-all hover:shadow-lg hover:shadow-primary/20 group"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <i className={`${step.icon} text-primary text-2xl`}></i>
              </div>
              <h3 className="text-white text-xl font-bold mb-3 flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-black font-bold">
                  {index + 1}
                </span>
                {step.title}
              </h3>
              <p className="text-white/70">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center" data-aos="fade-up">
          <p className="text-white/70 mb-6 max-w-2xl mx-auto">
            Have questions about how our process works? Our customer support team is available 7 days a week to help you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary text-black py-3 px-6 rounded-full font-bold hover:bg-white hover:text-primary transition-colors">
              <i className="fas fa-headset mr-2"></i> Get Support
            </button>
            <button className="border border-primary text-white py-3 px-6 rounded-full font-bold hover:bg-primary/10 transition-colors">
              <i className="fas fa-play-circle mr-2"></i> Watch Tutorial
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}