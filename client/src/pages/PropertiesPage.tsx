import React, { useEffect, useState } from 'react';
import { client } from '../lib/sanityClient';
import { getImageUrl } from '../lib/imageUtils';
import { FaBed, FaBath, FaRulerCombined, FaSearch, FaTimes } from 'react-icons/fa';
import PlaceholderImage from '../components/PlaceholderImage';
import { sanityClient } from '../lib/sanityClient';
import PropertyCard from '../components/PropertyCard';
import { InterestButton } from '../components/InterestButton';

interface Property {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  location: {
    city: string;
    state: string;
    country: string;
  };
  price: number;
  bedrooms: number;
  bathrooms: number;
  size: number;
  images: {
    _key: string;
    asset: {
      _ref: string;
      url?: string;
    };
  }[];
  available: boolean;
  propertyType: string;
  description: string;
  featured: boolean;
  owner: {
    _id: string;
    name: string;
    email: string;
  };
  amenities?: string[];
  targetAudience?: string[];
}

interface Filters {
  location: string;
  propertyType: string;
  bedrooms: string;
  priceRange: string;
  furnishing: string;
  amenity?: string;
  targetAudience?: string;
}

const PropertiesPage = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>({
    location: '',
    propertyType: '',
    bedrooms: '',
    priceRange: '',
    furnishing: '',
    amenity: '',
    targetAudience: ''
  });
  const [error, setError] = useState<string | null>(null);

  const locations = ['Bhubaneswar', 'Puri', 'Cuttack'];
  const propertyTypes = ['apartment', 'house', 'villa', 'commercial'];
  const bedroomOptions = ['1', '2', '3', '4+'];
  const priceRanges = [
    { label: '₹0 - ₹10,000', min: 0, max: 10000 },
    { label: '₹10,000 - ₹25,000', min: 10000, max: 25000 },
    { label: '₹25,000 - ₹50,000', min: 25000, max: 50000 },
    { label: '₹50,000+', min: 50000, max: Infinity }
  ];

  const allAmenities = [
    'Parking', 'Security', 'Lift', 'Power Backup', 'Water Supply', 'Gym', 'Swimming Pool', 'Garden', 'Play Area', '24/7 Water Supply', 'Furnished', 'Semi-Furnished', 'Unfurnished', 'Air Conditioning', 'Heating', 'Internet', 'Pet Friendly'
  ];
  const allTargetAudiences = ['bachelor', 'family', 'both'];

  // Mock currentUser for demonstration - replace with your actual auth context
  const currentUser = { id: '1', role: 'tenant' }; // Use string for id

  useEffect(() => {
    const fetchApproved = async () => {
      setLoading(true);
      try {
        const result = await sanityClient.fetch(`*[_type == 'property' && location->approved == true && !(_id in path('drafts.**'))]{
          _id,
          title,
          location->{city, state, country},
          owner->{name, email, _id},
          price,
          images,
          description,
          bedrooms,
          bathrooms,
          propertyType,
          size,
          available,
          featured,
          amenities,
          targetAudience
        }`);
        // Deduplicate by _id
        const unique = Array.from(new Map((result as Property[]).map((item: Property) => [item._id, item])).values()) as Property[];
        setProperties(unique);
        setFilteredProperties(unique);
        setError(null);
      } catch (err) {
        setError('Failed to fetch properties.');
      } finally {
        setLoading(false);
      }
    };
    fetchApproved();
  }, []);

  useEffect(() => {
    let filtered = [...properties];

    if (filters.location) {
      filtered = filtered.filter(p => p.location?.city === filters.location);
    }

    if (filters.propertyType) {
      filtered = filtered.filter(p => p.propertyType === filters.propertyType);
    }

    if (filters.bedrooms) {
      const bedroomCount = parseInt(filters.bedrooms);
      filtered = filtered.filter(p => {
        if (filters.bedrooms === '4+') {
          return p.bedrooms >= 4;
        }
        return p.bedrooms === bedroomCount;
      });
    }

    if (filters.priceRange) {
      const range = priceRanges.find(r => r.label === filters.priceRange);
      if (range) {
        filtered = filtered.filter(p => p.price >= range.min && p.price <= range.max);
      }
    }

    if (filters.amenity) {
      filtered = filtered.filter(p => p.amenities && p.amenities.includes(filters.amenity!));
    }

    if (filters.targetAudience) {
      filtered = filtered.filter(p => p.targetAudience && p.targetAudience.includes(filters.targetAudience!));
    }

    setFilteredProperties(filtered);
  }, [filters, properties]);

  const handleSearch = () => {
    // The filtering is already handled by the useEffect above
    // This function can be used for additional search functionality if needed
  };

  const resetFilters = () => {
    setFilters({
      location: '',
      propertyType: '',
      bedrooms: '',
      priceRange: '',
      furnishing: '',
      amenity: '',
      targetAudience: ''
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Search Section */}
      <div className="bg-[#0a0a0a] p-8 border-b border-primary/10">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-white mb-6">Find Your Perfect Rental</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
            <select
              value={filters.location}
              onChange={(e) => setFilters({...filters, location: e.target.value})}
              className="bg-background text-white border border-primary/20 rounded-lg p-3 focus:border-primary outline-none"
            >
              <option value="">Select Location</option>
              {locations.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>

            <select
              value={filters.propertyType}
              onChange={(e) => setFilters({...filters, propertyType: e.target.value})}
              className="bg-background text-white border border-primary/20 rounded-lg p-3 focus:border-primary outline-none"
            >
              <option value="">Select Type</option>
              {propertyTypes.map(type => (
                <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
              ))}
            </select>

            <select
              value={filters.bedrooms}
              onChange={(e) => setFilters({...filters, bedrooms: e.target.value})}
              className="bg-background text-white border border-primary/20 rounded-lg p-3 focus:border-primary outline-none"
            >
              <option value="">Bedrooms</option>
              {bedroomOptions.map(bed => (
                <option key={bed} value={bed}>{bed} {bed === '4+' ? '' : 'Beds'}</option>
              ))}
            </select>

            <select
              value={filters.priceRange}
              onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
              className="bg-background text-white border border-primary/20 rounded-lg p-3 focus:border-primary outline-none"
            >
              <option value="">Budget (₹)</option>
              {priceRanges.map(range => (
                <option key={range.label} value={range.label}>{range.label}</option>
              ))}
            </select>

            <select
              value={filters.amenity || ''}
              onChange={(e) => setFilters({ ...filters, amenity: e.target.value })}
              className="bg-background text-white border border-primary/20 rounded-lg p-3 focus:border-primary outline-none"
            >
              <option value="">Select Amenity</option>
              {allAmenities.map(amenity => (
                <option key={amenity} value={amenity}>{amenity}</option>
              ))}
            </select>

            <select
              value={filters.targetAudience || ''}
              onChange={(e) => setFilters({ ...filters, targetAudience: e.target.value })}
              className="bg-background text-white border border-primary/20 rounded-lg p-3 focus:border-primary outline-none"
            >
              <option value="">Target Audience</option>
              {allTargetAudiences.map(aud => (
                <option key={aud} value={aud}>{aud.charAt(0).toUpperCase() + aud.slice(1)}</option>
              ))}
            </select>

            <div className="flex gap-2">
              <button
                onClick={handleSearch}
                className="flex-1 bg-primary text-black font-semibold py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors"
              >
                <FaSearch className="inline-block mr-2" />
                Search
              </button>
              <button
                onClick={resetFilters}
                className="bg-background border border-primary/20 text-white px-4 rounded-lg hover:border-primary transition-colors"
              >
                <FaTimes />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 text-sm text-white/70">
            <span>Popular:</span>
            <button className="hover:text-primary">2BHK in Bhubaneswar</button>
            <span>•</span>
            <button className="hover:text-primary">Sea View Apartment in Puri</button>
            <span>•</span>
            <button className="hover:text-primary">Luxury Villas</button>
            <span>•</span>
            <button className="hover:text-primary">Office Space in Cuttack</button>
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">
            {filteredProperties.length} Properties Found
          </h2>
          <select className="bg-background text-white border border-primary/20 rounded-lg p-2 focus:border-primary outline-none">
            <option value="newest">Newest First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>

        {error && <p className="text-red-500">{error}</p>}
        {properties.length === 0 && !loading ? <p>No approved properties available.</p> : null}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property) => (
            <div 
              key={property._id}
              className="bg-background/20 rounded-xl overflow-hidden border border-primary/10 hover:border-primary/30 transition-all hover:shadow-xl hover:shadow-primary/10 group"
            >
              <div className="relative overflow-hidden h-64">
                {property.images && property.images.length > 0 ? (
                  <img 
                    src={getImageUrl(property.images[0])}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
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
                  ₹{property.price?.toLocaleString()}/mo
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{property.title}</h3>
                <p className="text-white/70 mb-4">
                  {property.location?.city}, {property.location?.state}, {property.location?.country}
                </p>
                
                <div className="flex justify-between items-center text-sm text-white/60 mb-4">
                  <div className="flex items-center">
                    <FaBed className="mr-2" />
                    <span>{property.bedrooms} Bedroom{property.bedrooms > 1 ? 's' : ''}</span>
                  </div>
                  <div className="flex items-center">
                    <FaBath className="mr-2" />
                    <span>{property.bathrooms} Bathroom{property.bathrooms > 1 ? 's' : ''}</span>
                  </div>
                  <div className="flex items-center">
                    <FaRulerCombined className="mr-2" />
                    <span>{property.size} sqft</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-white/50 mb-2">
                  <span className="bg-background/30 px-2 py-1 rounded">Type: {property.propertyType}</span>
                  <span className="bg-background/30 px-2 py-1 rounded">Available: {property.available ? 'Yes' : 'No'}</span>
                  {property.featured && <span className="bg-primary/80 text-black px-2 py-1 rounded">Featured</span>}
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

        {filteredProperties.length === 0 && (
          <div className="text-center text-white/70 mt-8">
            No properties found matching your criteria.
          </div>
        )}
      </div>

      {/* Property Details Sidebar */}
      {selectedProperty && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
          <div className="w-full max-w-2xl bg-background overflow-y-auto">
            <div className="p-6">
              <button 
                onClick={() => setSelectedProperty(null)}
                className="absolute top-4 right-4 text-white/70 hover:text-white"
              >
                <FaTimes className="w-6 h-6" />
              </button>

              {/* Property Details Content */}
              <div className="mt-8">
                <div className="mb-6">
                  <img 
                    src={selectedProperty.images && selectedProperty.images.length > 0 
                      ? getImageUrl(selectedProperty.images[0]) 
                      : "/placeholder-property.jpg"} 
                    alt={selectedProperty.title}
                    className="w-full h-64 object-contain rounded-lg mb-4 cursor-pointer"
                    onClick={() => selectedProperty.images && selectedProperty.images.length > 0 && 
                      setSelectedImage(getImageUrl(selectedProperty.images[0]))}
                  />
                  
                  {selectedProperty.images && selectedProperty.images.length > 1 && (
                    <div className="grid grid-cols-4 gap-2">
                      {selectedProperty.images.slice(1).map((image: any, index: number) => (
                        <img 
                          key={index}
                          src={getImageUrl(image)}
                          alt={`${selectedProperty.title} - ${index + 2}`}
                          className="w-full h-20 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
                          onClick={() => setSelectedImage(getImageUrl(image))}
                        />
                      ))}
                    </div>
                  )}
                </div>

                <h2 className="text-2xl font-bold text-white mb-2">{selectedProperty.title}</h2>
                <p className="text-primary font-bold text-xl mb-4">₹{selectedProperty.price?.toLocaleString()}/mo</p>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-3 bg-background/40 rounded-lg">
                    <FaBed className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <span className="text-white/70">{selectedProperty.bedrooms} Bedroom{selectedProperty.bedrooms > 1 ? 's' : ''}</span>
                  </div>
                  <div className="text-center p-3 bg-background/40 rounded-lg">
                    <FaBath className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <span className="text-white/70">{selectedProperty.bathrooms} Bathroom{selectedProperty.bathrooms > 1 ? 's' : ''}</span>
                  </div>
                  <div className="text-center p-3 bg-background/40 rounded-lg">
                    <FaRulerCombined className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <span className="text-white/70">{selectedProperty.size} sqft</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-white/50 mb-6">
                  <span className="bg-background/30 px-2 py-1 rounded">Type: {selectedProperty.propertyType}</span>
                  <span className="bg-background/30 px-2 py-1 rounded">Available: {selectedProperty.available ? 'Yes' : 'No'}</span>
                  {selectedProperty.featured && <span className="bg-primary/80 text-black px-2 py-1 rounded">Featured</span>}
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-2">Location</h3>
                  <p className="text-white/70">{selectedProperty.location?.city}, {selectedProperty.location?.state}, {selectedProperty.location?.country}</p>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
                  <p className="text-white/70">{selectedProperty.description}</p>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-2">Owner</h3>
                  <p className="text-white/70">{selectedProperty.owner?.name}</p>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-2">Amenities</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProperty.amenities && selectedProperty.amenities.length > 0 ? (
                      selectedProperty.amenities.map((amenity, idx) => (
                        <span key={idx} className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-semibold">
                          {amenity}
                        </span>
                      ))
                    ) : (
                      <span className="text-white/50">No amenities listed</span>
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-2">Target Audience</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProperty.targetAudience && selectedProperty.targetAudience.length > 0 ? (
                      selectedProperty.targetAudience.map((aud, idx) => (
                        <span key={idx} className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-semibold">
                          {aud.charAt(0).toUpperCase() + aud.slice(1)}
                        </span>
                      ))
                    ) : (
                      <span className="text-white/50">No target audience specified</span>
                    )}
                  </div>
                </div>

                {/* Add Interest and View on Map buttons directly in the property details */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <InterestButton 
                    propertyId={selectedProperty._id} 
                    ownerId={selectedProperty.owner._id} 
                  />
                  <button
                    onClick={() => {
                      window.open(`/map?property=${selectedProperty._id}`, '_blank');
                    }}
                    className="w-full bg-transparent border border-primary text-primary py-3 rounded-lg font-semibold hover:bg-primary hover:text-black transition-colors"
                  >
                    View on Map
                  </button>
                </div>

                {/* You can keep the PropertyCard component if it has other functionality you need */}
                {/* Removed PropertyCard from modal to avoid duplicate InterestButton */}

              </div>
            </div>
          </div>
        </div>
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
    </div>
  );
};

export default PropertiesPage;