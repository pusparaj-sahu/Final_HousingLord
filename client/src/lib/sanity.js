import {createClient} from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Initialize Sanity client
export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || '',
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: '2023-05-03', // use current date in YYYY-MM-DD format
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN
});

// Initialize image URL builder
const builder = imageUrlBuilder(client);

// Helper function to generate image URLs from Sanity image references
export function urlFor(source) {
  return builder.image(source);
}

/*
Example property structure from Sanity:
{
  _id: string,
  title: string,
  description: string,
  price: number,
  location: {
    city: string,
    state: string,
    address: string,
  },
  features: {
    bedrooms: number,
    bathrooms: number,
    area: number, // in sq. ft.
    furnished: boolean,
  },
  propertyType: 'apartment' | 'house' | 'villa' | 'commercial',
  isAvailable: boolean,
  mainImage: {}, // Sanity image reference
  images: [], // Array of Sanity image references
  amenities: [],
  ownerContact: {
    name: string,
    email: string,
    phone: string,
  },
  createdAt: string,
}
*/