import {createClient} from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// For debugging
console.log('Sanity Config:', {
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET
});

// Initialize Sanity client with hardcoded values for now
// We'll use a more robust solution later
export const client = createClient({
  projectId: '123abc', // Temporary value to prevent errors
  dataset: 'production',
  apiVersion: '2023-05-03', // use current date in YYYY-MM-DD format
  useCdn: false,
  token: import.meta.env.VITE_SANITY_API_TOKEN
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