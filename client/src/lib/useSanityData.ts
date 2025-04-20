import { useState, useEffect } from 'react';
import { client } from './sanityClient';

interface SanityImageAsset {
  _ref: string;
}

interface SanityImage {
  asset: SanityImageAsset;
}

export interface SanityProperty {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
  price: number;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  size: number;
  location: { city: string; state: string };
  owner: { name: string; email: string };
  images: SanityImage[];
  featured: boolean;
  available: boolean;
  _createdAt: string;
}

export const useSanityData = () => {
  const [properties, setProperties] = useState<SanityProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const query = `*[_type == "property"] {
          _id,
          title,
          slug,
          description,
          price,
          propertyType,
          bedrooms,
          bathrooms,
          size,
          location->{
            city,
            state
          },
          owner->{
            name,
            email
          },
          images,
          featured,
          available,
          _createdAt
        }`;

        const result = await client.fetch(query);
        setProperties(result);
        setError(null);
      } catch (err) {
        console.error('Error fetching properties:', err);
        setError('Failed to fetch properties. Please try again later.');
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return { properties, loading, error };
};

export default useSanityData; 