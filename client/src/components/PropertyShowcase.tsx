import { useState } from "react";
import { useSanityData } from "../lib/useSanityData";
import { getImageUrl } from "../lib/imageUtils";
import { FaTimes, FaBed, FaBath, FaRulerCombined, FaHome } from "react-icons/fa";
import PlaceholderImage from "./PlaceholderImage";
import { useNavigate } from "react-router-dom";

// Define TypeScript interface for the property based on your schema
interface SanityProperty {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description: string;
  price: number;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  size: number;
  location: {
    name: string;
    city?: string;
    state?: string;
    country?: string;
  };
  owner: {
    name: string;
  };
  images: {
    _key: string;
    asset: {
      _ref: string;
      url?: string;
    };
  }[];
  featured: boolean;
  available: boolean;
  createdAt: string;
}

interface SidebarProps {
  property: any;
  onClose: () => void;
  onImageClick: (imageUrl: string) => void;
}

const PropertySidebar: React.FC<SidebarProps> = ({ property, onClose, onImageClick }) => {
  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-background/95 backdrop-blur-lg border-l border-primary/10 shadow-xl transform transition-transform duration-300 ease-in-out z-50 overflow-y-auto">
      <div className="p-6">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white/70 hover:text-white"
        >
          <FaTimes className="w-6 h-6" />
        </button>

        <div className="mb-6">
          <img 
            src={property.images && property.images.length > 0 
              ? getImageUrl(property.images[0]) 
              : "/placeholder-property.jpg"} 
            alt={property.title}
            className="w-full h-64 object-contain rounded-lg mb-4 cursor-pointer"
            onClick={() => property.images && property.images.length > 0 && 
              onImageClick(getImageUrl(property.images[0]))}
          />
          
          {property.images && property.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {property.images.slice(1).map((image: any, index: number) => (
                <img 
                  key={index}
                  src={getImageUrl(image)}
                  alt={`${property.title} - ${index + 2}`}
                  className="w-full h-20 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => onImageClick(getImageUrl(image))}
                />
              ))}
            </div>
          )}
        </div>

        <h2 className="text-2xl font-bold text-white mb-2">{property.title}</h2>
        <p className="text-primary font-bold text-xl mb-4">₹{property.price?.toLocaleString()}/mo</p>
        
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-3 bg-background/40 rounded-lg">
            <FaBed className="w-6 h-6 mx-auto mb-2 text-primary" />
            <span className="text-white/70">{property.bedrooms} Beds</span>
          </div>
          <div className="text-center p-3 bg-background/40 rounded-lg">
            <FaBath className="w-6 h-6 mx-auto mb-2 text-primary" />
            <span className="text-white/70">{property.bathrooms} Baths</span>
          </div>
          <div className="text-center p-3 bg-background/40 rounded-lg">
            <FaRulerCombined className="w-6 h-6 mx-auto mb-2 text-primary" />
            <span className="text-white/70">{property.size} sqft</span>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-2">Location</h3>
          <p className="text-white/70">{property.location?.city}, {property.location?.state}</p>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-2">Property Type</h3>
          <p className="text-white/70 capitalize">{property.propertyType}</p>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
          <p className="text-white/70">{property.description}</p>
        </div>

        <button className="w-full bg-primary text-black py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors">
          Contact Owner
        </button>
      </div>
    </div>
  );
};

export default function PropertyShowcase() {
  const { properties, loading, error } = useSanityData();
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const navigate = useNavigate();

  // Show loading state
  if (loading) {
    return (
      <section id="properties" className="py-20 bg-gradient-to-b from-[#121212] to-black">
        <div className="container mx-auto px-4 text-center">
          <div className="text-white">Loading properties...</div>
        </div>
      </section>
    );
  }

  // Show error state
  if (error) {
    return (
      <section id="properties" className="py-20 bg-gradient-to-b from-[#121212] to-black">
        <div className="container mx-auto px-4 text-center">
          <div className="text-red-500">Error loading properties. Please try again later.</div>
        </div>
      </section>
    );
  }

  // Function to handle navigation to properties page
  const handleViewAllProperties = () => {
    navigate('/properties');
  };

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
          {properties
            .filter(property => property.featured)
            .slice(0, 3)
            .map((property) => (
            <div 
              key={property._id} 
              data-aos="fade-up"
              className="bg-background/20 hover:bg-background/40 rounded-xl overflow-hidden border border-primary/10 hover:border-primary/30 transition-all hover:shadow-xl hover:shadow-primary/10 group"
            >
              <div className="relative overflow-hidden h-64">
                {property.images && property.images.length > 0 ? (
                  <img 
                    src={getImageUrl(property.images[0])}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const placeholder = document.createElement('div');
                      target.parentNode?.insertBefore(placeholder, target);
                      const placeholderComponent = document.createElement('div');
                      placeholder.className = 'w-full h-full';
                      placeholderComponent.innerHTML = '<div class="w-full h-full bg-gray-700 flex items-center justify-center"><FaHome className="w-12 h-12 text-gray-500" /></div>';
                      placeholder.appendChild(placeholderComponent);
                    }}
                  />
                ) : (
                  <PlaceholderImage className="w-full h-full" />
                )}
                
                {property.featured && (
                  <div className="absolute top-4 left-4 bg-primary text-black px-3 py-1 rounded-full text-sm font-bold">
                    Featured
                  </div>
                )}
                
                <div className="absolute top-4 right-4 bg-background/70 backdrop-blur-sm text-primary px-3 py-1 rounded-full text-sm font-bold">
                  ₹{property.price?.toLocaleString() || 0}/mo
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{property.title}</h3>
                <p className="text-white/70 mb-4">
                  {property.location?.city}, {property.location?.state}
                </p>
                
                <div className="flex justify-between items-center text-sm text-white/60 mb-4">
                  <div>
                    <span className="font-semibold">{property.bedrooms}</span> Beds
                  </div>
                  <div>
                    <span className="font-semibold">{property.bathrooms}</span> Baths
                  </div>
                  <div>
                    <span className="font-semibold">{property.size}</span> sqft
                  </div>
                </div>

                <button
                  onClick={() => setSelectedProperty(property)}
                  className="w-full bg-transparent border border-primary text-primary py-2 rounded-lg font-semibold hover:bg-primary hover:text-black transition-colors"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center" data-aos="fade-up">
          <button 
            onClick={handleViewAllProperties}
            className="bg-transparent border-2 border-primary text-primary py-3 px-8 rounded-full font-bold hover:bg-primary hover:text-black transition-colors"
          >
            View All Properties
          </button>
        </div>
      </div>

      {selectedProperty && (
        <PropertySidebar 
          property={selectedProperty} 
          onClose={() => setSelectedProperty(null)} 
          onImageClick={(imageUrl) => setSelectedImage(imageUrl)}
        />
      )}

      {/* Image Popup Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 text-white/70 hover:text-white"
            onClick={() => setSelectedImage(null)}
          >
            <FaTimes className="w-8 h-8" />
          </button>
          <img 
            src={selectedImage} 
            alt="Property" 
            className="max-w-full max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}