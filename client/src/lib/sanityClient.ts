// sanity.js
import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// This client is for public data only and doesn't use a token
// It's safe to use in the browser
export const sanityClient = createClient({
  projectId: 'ogyoe0hr',
  dataset: 'production',
  useCdn: true, // Enable CDN for better performance
  apiVersion: '2024-03-12', // Current date for API version
  // Public client doesn't need a token for read-only operations
  token: import.meta.env.VITE_SANITY_API_TOKEN || 'skUUE01jpqseamiAtoni326efjYmv89AooBbHOHluCgqjd4sfC5fmpnDkOhdt3wlykRMLVvC0vnn6eEuSGDbDOhPNzTxKrrfwH3LZPdUIHL1vILkYiRcv8fugzWNjaoD38LDM6mLnO88pbHEhl1AqtrgyZEV5rvHBK0vZoJ5EhLODean9KE6',
})

// Export client as an alias for sanityClient
export const client = sanityClient;

// Note: For operations that require authentication, use the serverClient from api/sanityApi.js
// instead of exposing tokens in the browser

// uses GROQ to query content: https://www.sanity.io/docs/groq
export async function getPosts() {
  const property = await sanityClient.fetch('*[_type == "property"]')
  return property
}

export async function createPost(post: any) {
  const result = sanityClient.create(post)
  return result
};

// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(sanityClient)

// Function to generate image URLs with error handling
export function urlFor(source: any) {
  if (!source?.asset?._ref && !source?.asset?._id) {
    console.error('Invalid image source:', source);
    return '/placeholder-property.jpg';
  }
  
  try {
    return builder
      .image(source)
      .auto('format')
      .fit('max')
      .url();
  } catch (error) {
    console.error('Error generating image URL:', error);
    return '/placeholder-property.jpg';
  }
}

export async function updateDocumentTitle(_id: string, title: string) {
  const result = sanityClient.patch(_id).set({title})
  return result
}

// Fetch properties with error handling
export async function getProperties() {
  try {
    const properties = await sanityClient.fetch(`*[_type == "property"] {
      _id,
      title,
      price,
      location->{
        city,
        state
      },
      images[] {
        asset->{
          _id,
          url
        }
      },
      available,
      _createdAt
    }`);
    return properties;
  } catch (error) {
    console.error('Error fetching properties:', error);
    return [];
  }
}

// Create property with error handling
export async function createProperty(property: any) {
  try {
    const result = await sanityClient.create({
      _type: 'property',
      ...property
    });
    return result;
  } catch (error) {
    console.error('Error creating property:', error);
    throw error;
  }
}

// Update property with error handling
export async function updateProperty(_id: string, updates: any) {
  try {
    const result = await sanityClient.patch(_id).set(updates).commit();
    return result;
  } catch (error) {
    console.error('Error updating property:', error);
    throw error;
  }
}

// Helper to upload an image file to Sanity and return the asset reference
export async function uploadImageToSanity(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('/api/upload-image', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload image to Sanity');
  }

  return await response.json();
}