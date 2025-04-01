export default function PropertyShowcase() {
  const properties = [
    {
      id: 1,
      title: "Luxury Apartment with Sea View",
      location: "Puri Beach Road",
      price: 35000,
      bedrooms: 3,
      bathrooms: 2,
      area: 1750,
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: true,
      amenities: ["Parking", "Swimming Pool", "Gym", "24/7 Security"],
      furnished: "Fully Furnished",
    },
    {
      id: 2,
      title: "Modern Studio Apartment",
      location: "Bhubaneswar Chandrasekharpur",
      price: 15000,
      bedrooms: 1,
      bathrooms: 1,
      area: 650,
      image: "https://images.unsplash.com/photo-1600607687126-8a3414349a51?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: false,
      amenities: ["Parking", "24/7 Security", "Power Backup"],
      furnished: "Semi-Furnished",
    },
    {
      id: 3,
      title: "Spacious Family Home",
      location: "Cuttack Bidanasi",
      price: 28000,
      bedrooms: 4,
      bathrooms: 3,
      area: 2200,
      image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: false,
      amenities: ["Garden", "Parking", "24/7 Security", "Power Backup"],
      furnished: "Unfurnished",
    },
    {
      id: 4,
      title: "Elegant 2BHK With Balcony",
      location: "Bhubaneswar Patia",
      price: 22000,
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      image: "https://images.unsplash.com/photo-1600585152915-d208bec867a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: true,
      amenities: ["Parking", "Gym", "24/7 Security", "Air Conditioning"],
      furnished: "Fully Furnished",
    },
    {
      id: 5,
      title: "Modern Duplex Apartment",
      location: "Puri Marine Drive",
      price: 42000,
      bedrooms: 3,
      bathrooms: 3.5,
      area: 2500,
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: false,
      amenities: ["Terrace", "Parking", "Swimming Pool", "Gym", "24/7 Security", "Power Backup"],
      furnished: "Fully Furnished",
    },
    {
      id: 6,
      title: "Cozy 1BHK Near IT Park",
      location: "Bhubaneswar Infocity",
      price: 12000,
      bedrooms: 1,
      bathrooms: 1,
      area: 750,
      image: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: false,
      amenities: ["Parking", "24/7 Security", "Power Backup"],
      furnished: "Semi-Furnished",
    },
  ];

  return (
    <section id="properties" className="py-20 bg-gradient-to-b from-[#121212] to-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16" data-aos="fade-up">
          <span className="text-primary font-semibold uppercase tracking-wider">Browse Properties</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-6 text-white">Featured Properties</h2>
          <p className="text-white/70 max-w-3xl mx-auto">
            Explore our selection of handpicked properties across Odisha's major cities.
            From cozy studios to luxury villas, find your perfect home.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <div 
              key={property.id} 
              data-aos="fade-up"
              className="bg-background/20 hover:bg-background/40 rounded-xl overflow-hidden border border-primary/10 hover:border-primary/30 transition-all hover:shadow-xl hover:shadow-primary/10 group"
            >
              <div className="relative overflow-hidden h-64">
                <img 
                  src={property.image} 
                  alt={property.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {property.featured && (
                  <div className="absolute top-4 left-4 bg-primary text-black px-3 py-1 rounded-full text-sm font-bold">
                    Featured
                  </div>
                )}
                
                <div className="absolute top-4 right-4 bg-background/70 backdrop-blur-sm text-primary px-3 py-1 rounded-full text-sm font-bold">
                  ₹{property.price.toLocaleString()}/mo
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-white text-xl font-bold mb-2 group-hover:text-primary transition-colors">{property.title}</h3>
                <p className="text-white/70 mb-4 flex items-center">
                  <i className="fas fa-map-marker-alt text-primary mr-2"></i>
                  {property.location}
                </p>
                
                <div className="flex justify-between mb-6">
                  <div className="text-center">
                    <div className="text-primary text-lg font-bold">{property.bedrooms}</div>
                    <div className="text-white/60 text-sm">Beds</div>
                  </div>
                  <div className="text-center">
                    <div className="text-primary text-lg font-bold">{property.bathrooms}</div>
                    <div className="text-white/60 text-sm">Baths</div>
                  </div>
                  <div className="text-center">
                    <div className="text-primary text-lg font-bold">{property.area}</div>
                    <div className="text-white/60 text-sm">Sq.ft</div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {property.amenities.slice(0, 3).map((amenity, index) => (
                    <div key={index} className="px-3 py-1 rounded-full bg-background/50 text-white/80 text-xs flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mr-1.5"></span>
                      {amenity}
                    </div>
                  ))}
                  {property.amenities.length > 3 && (
                    <div className="px-3 py-1 rounded-full bg-background/50 text-white/80 text-xs flex items-center">
                      +{property.amenities.length - 3} more
                    </div>
                  )}
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-white/80 text-sm">{property.furnished}</span>
                  <span className="text-primary text-sm font-bold">Available Now</span>
                </div>
                
                <button className="w-full bg-primary text-black py-2.5 rounded-lg font-bold hover:bg-white hover:text-primary transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center" data-aos="fade-up">
          <button className="bg-transparent border-2 border-primary text-primary py-3 px-8 rounded-full font-bold hover:bg-primary hover:text-black transition-colors">
            View All Properties <i className="fas fa-arrow-right ml-2"></i>
          </button>
        </div>
      </div>
    </section>
  );
}