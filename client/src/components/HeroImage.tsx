export default function HeroImage() {
  return (
    <section className="bg-black py-16 md:py-24 overflow-hidden relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div data-aos="fade-right" className="order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">
              Experience The New Era of Rental Services
            </h2>
            <p className="text-white/80 text-lg mb-8 leading-relaxed">
              Housing Lord uses cutting-edge technology to streamline the rental process, 
              making it easier than ever to find or list properties in Bhubaneswar, 
              Cuttack, and Puri. Our platform ensures all tenants are verified, 
              giving property owners peace of mind.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-background/60 p-4 rounded-lg border border-primary/20">
                <h3 className="text-primary font-bold text-xl mb-2">500+</h3>
                <p className="text-white/70">Available Properties</p>
              </div>
              <div className="bg-background/60 p-4 rounded-lg border border-primary/20">
                <h3 className="text-primary font-bold text-xl mb-2">97%</h3>
                <p className="text-white/70">Customer Satisfaction</p>
              </div>
              <div className="bg-background/60 p-4 rounded-lg border border-primary/20">
                <h3 className="text-primary font-bold text-xl mb-2">1000+</h3>
                <p className="text-white/70">Happy Tenants</p>
              </div>
              <div className="bg-background/60 p-4 rounded-lg border border-primary/20">
                <h3 className="text-primary font-bold text-xl mb-2">3</h3>
                <p className="text-white/70">Major Cities Covered</p>
              </div>
            </div>
          </div>
          
          <div data-aos="fade-left" className="order-1 md:order-2 flex justify-center">
            <div className="relative">
              <div className="w-[300px] h-[400px] md:w-[400px] md:h-[500px] rounded-lg overflow-hidden relative shadow-xl shadow-primary/20">
                <img 
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Modern apartment" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="bg-primary text-black px-3 py-1 rounded-full text-sm font-bold mb-2 inline-block">
                    Featured
                  </span>
                  <h3 className="text-white text-xl font-bold">Luxury Apartment</h3>
                  <p className="text-white/80">Bhubaneswar, Odisha</p>
                  <div className="flex items-center mt-2">
                    <span className="text-primary font-bold text-lg">₹25,000</span>
                    <span className="text-white/60 ml-1">/month</span>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -right-4 -bottom-4 w-[150px] h-[150px] border-2 border-primary rounded-lg -z-10"></div>
              <div className="absolute -left-4 -top-4 w-[100px] h-[100px] border-2 border-primary rounded-lg -z-10"></div>
              
              {/* Floating badges */}
              <div className="absolute -left-16 top-1/3 bg-background shadow-lg shadow-primary/20 p-3 rounded-lg border border-primary/50 hidden md:block">
                <div className="flex items-center gap-2">
                  <i className="fas fa-check-circle text-primary text-xl"></i>
                  <span className="text-white font-medium">Verified Tenant</span>
                </div>
              </div>
              
              <div className="absolute -right-20 bottom-1/4 bg-background shadow-lg shadow-primary/20 p-3 rounded-lg border border-primary/50 hidden md:block">
                <div className="flex items-center gap-2">
                  <i className="fas fa-shield-alt text-primary text-xl"></i>
                  <span className="text-white font-medium">Secure Payments</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}