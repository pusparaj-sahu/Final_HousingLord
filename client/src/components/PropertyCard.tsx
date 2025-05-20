import React, { useState, useEffect } from 'react';
import { FaBed, FaBath } from 'react-icons/fa';
import { BsGrid3X3 } from 'react-icons/bs';
import { MdLocationOn } from 'react-icons/md';
import { Link } from 'react-router-dom';
// @ts-ignore
import axios from 'axios';

// Add hideButtons to your props interface
interface PropertyCardProps {
  title: string;
  location: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  imageUrl: string;
  amenities: string[];
  slug: string;
  available: boolean;
  propertyId: string;
  ownerId: string;
  currentUser?: { id: string; role: string } | null;
  hideButtons?: boolean;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  title,
  location,
  price,
  beds,
  baths,
  sqft,
  imageUrl,
  amenities,
  slug,
  available,
  propertyId,
  ownerId,
  currentUser,
}) => {
  const [interested, setInterested] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser && currentUser.id !== ownerId) {
      axios
        .get(`/api/properties/${propertyId}/interested-users`)
        .then((res: any) => {
          setInterested(res.data.some((u: any) => u.id === currentUser.id));
        })
        .catch(() => setInterested(false));
    }
  }, [propertyId, currentUser, ownerId]);

  const handleInterest = async () => {
    setLoading(true);
    try {
      await axios.post(`/api/properties/${propertyId}/interested`);
      setInterested(true);
    } catch (e) {
      // handle error
    }
    setLoading(false);
  };

  const showInterestButton =
    currentUser && currentUser.id !== ownerId;

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <Link to={`/property/${slug}`}>
        <div className="relative">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-64 object-cover"
          />
          <div className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 rounded-full font-medium">
            ₹{price.toLocaleString()}/mo
          </div>
          {available && (
            <div className="absolute bottom-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm">
              Available Now
            </div>
          )}
        </div>
        
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-2">{title}</h2>
          <div className="flex items-center text-gray-600 mb-4">
            <MdLocationOn className="mr-1" />
            <span>{location}</span>
          </div>
          
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <FaBed className="mr-2" />
              <span>{beds} Beds</span>
            </div>
            <div className="flex items-center">
              <FaBath className="mr-2" />
              <span>{baths} Baths</span>
            </div>
            <div className="flex items-center">
              <BsGrid3X3 className="mr-2" />
              <span>{sqft} Sq.ft</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {amenities.slice(0, 3).map((amenity, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm"
              >
                {amenity}
              </span>
            ))}
            {amenities.length > 3 && (
              <span className="text-gray-600 text-sm">+{amenities.length - 3} more</span>
            )}
          </div>
          {showInterestButton && (
            <button
              className={`mt-4 w-full py-2 rounded ${interested ? 'bg-gray-300 text-gray-600' : 'bg-yellow-400 text-black hover:bg-yellow-500'} font-semibold`}
              onClick={handleInterest}
              disabled={interested || loading}
            >
              {interested ? "Already Interested" : loading ? "Submitting..." : "I'm Interested"}
            </button>
          )}
        </div>
      </Link>
    </div>
  );
};

export default PropertyCard;