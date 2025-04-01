export default function PropertyShowcase() {
  return (
    <section id="properties" className="py-16 md:py-24 bg-black">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Property Card 1 */}
          <div className="bg-[#1a1a1a] rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-primary/20" data-aos="fade-up">
            <div className="relative h-64 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80" 
                alt="Modern House" 
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                <button className="m-4 bg-primary text-black font-bold py-2 px-4 rounded-full hover:scale-105 transition-all">
                  Book Now
                </button>
              </div>
            </div>
            <div className="p-6 bg-gradient-to-b from-[#1a1a1a] to-black">
              <h3 className="text-2xl text-primary mb-4 font-bold">Luxury Modern Villa</h3>
              <p className="text-gray-300 mb-4">Experience elegance with our meticulously curated rental properties. Elevate your living experience and find your perfect home.</p>
            </div>
          </div>
          
          {/* Pricing Card */}
          <div className="bg-primary/5 border border-primary/20 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-primary/20" data-aos="fade-up" data-aos-delay="100">
            <div className="bg-gradient-to-r from-[#1a1a1a] to-black p-6 text-center">
              <h3 className="text-2xl text-primary font-bold">Simple & Transparent Pricing</h3>
            </div>
            <div className="p-6">
              <h4 className="text-primary text-lg font-semibold mb-2">Service Fee Structure:</h4>
              <p className="text-primary mb-2">One month's rent split as:</p>
              <ul className="list-none pl-4 mb-6">
                <li className="mb-2">• 15 days' rent from tenant</li>
                <li className="mb-2">• 15 days' rent from owner</li>
              </ul>
              
              <h4 className="text-primary text-lg font-semibold mb-2">Additional Services:</h4>
              <ul className="list-none pl-4 mb-6">
                <li className="mb-2">• 📜 Rental Agreement Assistance</li>
                <li className="mb-2">• 🔍 Police Verification</li>
              </ul>
              
              <button 
                className="w-full bg-primary text-black font-bold py-3 px-4 rounded-lg transition-all hover:-translate-y-1 hover:shadow-md"
                onClick={() => window.togglePricingSidebar && window.togglePricingSidebar()}
              >
                No Hidden Costs – Just Professional Service!
              </button>
            </div>
          </div>
          
          {/* About Us Card */}
          <div className="bg-primary/5 border border-primary/20 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-primary/20" id="about-housing-lord" data-aos="fade-up" data-aos-delay="200">
            <div className="bg-[#1a1a1a] p-6 text-center">
              <h3 className="text-2xl text-primary font-bold mb-4">About Housing Lord</h3>
              <div className="flex justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=180&h=180&q=80" 
                  alt="Housing Lord Logo" 
                  className="w-28 h-28 rounded-full object-cover border-2 border-primary shadow-md shadow-primary/30 bg-[#1a1a1a] p-1 transition-all hover:scale-105 hover:rotate-3"
                />
              </div>
            </div>
            
            <div className="p-6 bg-primary/5 rounded-b-xl">
              <h4 className="text-primary text-lg font-semibold mb-2">Who We Are?</h4>
              <p className="text-left mb-6">Housing Lord is Bhubaneswar's leading rental service, dedicated to making the rental process simple, professional, and stress-free for both tenants and property owners.</p>
              
              <div className="border-l-4 border-primary bg-primary/10 p-4 mb-6">
                <h4 className="text-primary text-lg font-semibold mb-2">Our Mission</h4>
                <p>"Simplifying Rentals, Enhancing Living."</p>
              </div>
              
              <button 
                className="w-full bg-primary text-black font-bold py-3 px-4 rounded-full transition-all hover:-translate-y-1 hover:shadow-md"
                onClick={() => window.toggleAboutSidebar && window.toggleAboutSidebar()}
              >
                Know More About Our Team
              </button>
            </div>
          </div>
          
          {/* Interior Card */}
          <div className="bg-[#1a1a1a] rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-primary/20" data-aos="fade-up" data-aos-delay="300">
            <div className="relative h-64 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80" 
                alt="Luxury Interior" 
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="p-6 bg-gradient-to-b from-[#1a1a1a] to-black">
              <h3 className="text-2xl text-primary mb-4 font-bold">Uncompromising Quality</h3>
              <p className="text-gray-300 mb-4">Elevate your living experience with our thoughtfully designed rental properties. Discover the perfect blend of modern amenities.</p>
              <button className="block mx-auto mt-4 bg-primary text-black font-bold py-2 px-6 rounded-full hover:scale-105 transition-all hover:shadow-md hover:shadow-primary/30">
                Inquire Today
              </button>
            </div>
          </div>
          
          {/* Property Card 2 */}
          <div className="bg-[#1a1a1a] rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-primary/20" data-aos="fade-up" data-aos-delay="400">
            <div className="relative h-64 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80" 
                alt="Luxury Home" 
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                <button className="m-4 bg-primary text-black font-bold py-2 px-4 rounded-full hover:scale-105 transition-all">
                  View Details
                </button>
              </div>
            </div>
            <div className="p-6 bg-gradient-to-b from-[#1a1a1a] to-black">
              <h3 className="text-2xl text-primary mb-4 font-bold">Premium Apartments</h3>
              <p className="text-gray-300 mb-4">Urban living redefined with our premium apartments in prime locations. Experience comfort and convenience.</p>
            </div>
          </div>
          
          {/* Property Card 3 */}
          <div className="bg-[#1a1a1a] rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-primary/20" data-aos="fade-up" data-aos-delay="500">
            <div className="relative h-64 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80" 
                alt="Family Home" 
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                <button className="m-4 bg-primary text-black font-bold py-2 px-4 rounded-full hover:scale-105 transition-all">
                  Book Tour
                </button>
              </div>
            </div>
            <div className="p-6 bg-gradient-to-b from-[#1a1a1a] to-black">
              <h3 className="text-2xl text-primary mb-4 font-bold">Family Residences</h3>
              <p className="text-gray-300 mb-4">Spacious homes perfect for families with all modern amenities and convenient locations near schools and parks.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
