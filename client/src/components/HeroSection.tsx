export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen bg-black">
      {/* Background Overlay with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background/90"></div>
      
      {/* Background Video */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          className="absolute w-full h-full object-cover"
          autoPlay
          muted
          loop
          poster="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1280&q=80"
        >
          <source 
            src="https://cdn.videvo.net/videvo_files/video/free/2019-09/large_watermarked/190828_01_WideCity_HD_Drone_01_preview.mp4" 
            type="video/mp4" 
          />
          Your browser does not support the video tag.
        </video>
      </div>
      
      {/* Hero Content */}
      <div className="container mx-auto px-4 relative z-10 pt-36 pb-20 min-h-screen flex flex-col justify-center">
        <div className="max-w-3xl" data-aos="fade-right">
          <span className="inline-block px-4 py-1.5 bg-primary/20 border border-primary text-primary rounded-full text-sm font-semibold mb-6">
            The Premier Rental Service in Odisha
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Find Your Perfect <span className="text-primary">Home</span> With Ease
          </h1>
          <p className="text-xl text-white/80 mb-8 leading-relaxed">
            Housing Lord connects property owners with verified tenants across Bhubaneswar, 
            Cuttack, and Puri. Experience a seamless rental process with our comprehensive services.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => {
                document.getElementById('properties')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-3.5 bg-primary text-black rounded-full font-bold hover:bg-white hover:text-primary transition-colors"
            >
              Browse Properties
            </button>
            <button 
              onClick={() => {
                if (typeof window !== 'undefined' && (window as any).togglePricingSidebar) {
                  (window as any).togglePricingSidebar();
                }
              }}
              className="px-8 py-3.5 border-2 border-primary text-white rounded-full font-bold hover:bg-primary/10 transition-colors"
            >
              List Your Property
            </button>
          </div>
          
          <div className="flex items-center mt-12 mb-6">
            <span className="text-white font-semibold mr-6">Trusted By:</span>
            <div className="flex space-x-6 opacity-80 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
              <img src="https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png" alt="Partner 1" className="h-8" />
              <img src="https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo2.png" alt="Partner 2" className="h-8" />
              <img src="https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo3.png" alt="Partner 3" className="h-8" />
            </div>
          </div>
        </div>
        
        {/* Property Search Form */}
        <div 
          className="max-w-4xl w-full mt-8 bg-background/80 backdrop-blur-sm p-6 rounded-xl border border-primary/20 shadow-xl shadow-primary/5"
          data-aos="fade-up"
        >
          <h3 className="text-xl text-white font-bold mb-6">Find Your Perfect Rental</h3>
          <form className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="location" className="block text-white/80 mb-2 text-sm">Location</label>
              <select 
                id="location"
                className="w-full p-3 bg-background border border-primary/30 text-white rounded-lg focus:outline-none focus:border-primary"
              >
                <option value="">Select Location</option>
                <option value="bhubaneswar">Bhubaneswar</option>
                <option value="cuttack">Cuttack</option>
                <option value="puri">Puri</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="property-type" className="block text-white/80 mb-2 text-sm">Property Type</label>
              <select 
                id="property-type"
                className="w-full p-3 bg-background border border-primary/30 text-white rounded-lg focus:outline-none focus:border-primary"
              >
                <option value="">Select Type</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="villa">Villa</option>
                <option value="office">Office Space</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="price-range" className="block text-white/80 mb-2 text-sm">Budget (₹)</label>
              <select 
                id="price-range"
                className="w-full p-3 bg-background border border-primary/30 text-white rounded-lg focus:outline-none focus:border-primary"
              >
                <option value="">Select Budget</option>
                <option value="0-10000">Under ₹10,000</option>
                <option value="10000-20000">₹10,000 - ₹20,000</option>
                <option value="20000-30000">₹20,000 - ₹30,000</option>
                <option value="30000-50000">₹30,000 - ₹50,000</option>
                <option value="50000+">Above ₹50,000</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="bedrooms" className="block text-white/80 mb-2 text-sm">Bedrooms</label>
              <select 
                id="bedrooms"
                className="w-full p-3 bg-background border border-primary/30 text-white rounded-lg focus:outline-none focus:border-primary"
              >
                <option value="">Any</option>
                <option value="1">1 Bedroom</option>
                <option value="2">2 Bedrooms</option>
                <option value="3">3 Bedrooms</option>
                <option value="4+">4+ Bedrooms</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="furnished" className="block text-white/80 mb-2 text-sm">Furnishing</label>
              <select 
                id="furnished"
                className="w-full p-3 bg-background border border-primary/30 text-white rounded-lg focus:outline-none focus:border-primary"
              >
                <option value="">Any</option>
                <option value="furnished">Fully Furnished</option>
                <option value="semi-furnished">Semi-Furnished</option>
                <option value="unfurnished">Unfurnished</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <button 
                type="submit"
                className="w-full p-3 bg-primary text-black rounded-lg font-bold hover:bg-white hover:text-primary transition-colors flex items-center justify-center"
              >
                <i className="fas fa-search mr-2"></i> Search Properties
              </button>
            </div>
          </form>
          
          <div className="flex flex-wrap gap-3 mt-6">
            <span className="text-white/60 text-sm">Popular:</span>
            <button className="text-sm text-white/80 hover:text-primary transition-colors">
              2BHK in Bhubaneswar
            </button>
            <span className="text-white/60">•</span>
            <button className="text-sm text-white/80 hover:text-primary transition-colors">
              Sea View Apartment in Puri
            </button>
            <span className="text-white/60">•</span>
            <button className="text-sm text-white/80 hover:text-primary transition-colors">
              Luxury Villas
            </button>
            <span className="text-white/60">•</span>
            <button className="text-sm text-white/80 hover:text-primary transition-colors">
              Office Space in Cuttack
            </button>
          </div>
        </div>
      </div>
      
      {/* Hero Bottom Statistics */}
      <div className="relative z-10 bg-background/60 backdrop-blur-sm py-8 border-t border-b border-primary/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div data-aos="fade-up" data-aos-delay="0">
              <div className="text-primary text-3xl font-bold mb-1">500+</div>
              <div className="text-white/70 text-sm">Properties Listed</div>
            </div>
            <div data-aos="fade-up" data-aos-delay="100">
              <div className="text-primary text-3xl font-bold mb-1">300+</div>
              <div className="text-white/70 text-sm">Happy Tenants</div>
            </div>
            <div data-aos="fade-up" data-aos-delay="200">
              <div className="text-primary text-3xl font-bold mb-1">200+</div>
              <div className="text-white/70 text-sm">Property Owners</div>
            </div>
            <div data-aos="fade-up" data-aos-delay="300">
              <div className="text-primary text-3xl font-bold mb-1">3</div>
              <div className="text-white/70 text-sm">Cities Covered</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}