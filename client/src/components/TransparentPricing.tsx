export default function TransparentPricing() {
  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-black to-[#121212]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16" data-aos="fade-up">
          <span className="text-primary font-semibold uppercase tracking-wider">Clear Fee Structure</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-6 text-white">Our Transparent Pricing</h2>
          <p className="text-white/70 max-w-3xl mx-auto">
            Make it clear so there's no confusion
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Service Fee Card */}
            <div 
              className="bg-background/30 rounded-lg p-6 border border-primary/20 hover:border-primary/60 transition-all hover:shadow-lg hover:shadow-primary/20"
              data-aos="fade-up"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <i className="fas fa-hand-holding-dollar text-primary text-2xl"></i>
              </div>
              <h3 className="text-white text-xl font-bold mb-4">Service Fee</h3>
              <p className="text-white/70 mb-4">
                One month's rent in total, split as follows:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-white/70">
                  <i className="fas fa-check text-primary mt-1"></i>
                  <span><strong>15 days' rent</strong> from the tenant</span>
                </li>
                <li className="flex items-start gap-2 text-white/70">
                  <i className="fas fa-check text-primary mt-1"></i>
                  <span><strong>15 days' rent</strong> from the house owner</span>
                </li>
              </ul>
            </div>

            {/* Additional Charges Card */}
            <div 
              className="bg-background/30 rounded-lg p-6 border border-primary/20 hover:border-primary/60 transition-all hover:shadow-lg hover:shadow-primary/20"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <i className="fas fa-file-invoice-dollar text-primary text-2xl"></i>
              </div>
              <h3 className="text-white text-xl font-bold mb-4">Additional Charges</h3>
              <p className="text-white/70 mb-4">
                Necessary documentation charges:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-white/70">
                  <i className="fas fa-check text-primary mt-1"></i>
                  <div>
                    <strong>Police Verification Fee</strong>
                    <p className="text-sm">As per local regulations</p>
                  </div>
                </li>
                <li className="flex items-start gap-2 text-white/70">
                  <i className="fas fa-check text-primary mt-1"></i>
                  <div>
                    <strong>Rental Agreement Fee</strong>
                    <p className="text-sm">Depends on property & duration</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 text-center" data-aos="fade-up">
            <div className="inline-block bg-primary/10 px-8 py-4 rounded-full border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 cursor-pointer group">
              <h3 className="text-xl md:text-2xl font-bold text-white flex items-center justify-center gap-3">
                <i className="fas fa-shield text-primary group-hover:scale-110 transition-transform"></i>
                No Hidden Costs – Just Professional Service!
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 