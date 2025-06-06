// sanity.js
import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// This client is for public data only and doesn't use a token
// It's safe to use in the browser

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'ogyoe0hr',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2025-04-03',
  useCdn: false, // Use CDN for better performance
  // Add these options to help with CORS issues
  withCredentials: false,
  token: import.meta.env.VITE_SANITY_TOKEN, // Use import.meta.env for browser client
  // Use the correct Sanity API URL format
  apiHost: 'https://api.sanity.io',
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

// Fetch properties with error handling - using publicClient for browser safety
export const getProperties = async (): Promise<any[]> => {
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
};

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

// Merged functions from sanity.ts
export const createInterest = async (userId: string, propertyId: string) => {
  try {
    const interest = await sanityClient.create({
      _type: 'interest',
      user: {
        _type: 'reference',
        _ref: userId,
      },
      property: {
        _type: 'reference',
        _ref: propertyId,
      },
      status: 'pending',
    });

    // Update the property's interests array
    await sanityClient
      .patch(propertyId)
      .setIfMissing({ interests: [] })
      .insert('after', 'interests[-1]', [{
        _type: 'reference',
        _ref: interest._id,
      }])
      .commit();

    // Update the user's interests array
    await sanityClient
      .patch(userId)
      .setIfMissing({ interests: [] })
      .insert('after', 'interests[-1]', [{
        _type: 'reference',
        _ref: interest._id,
      }])
      .commit();

    // Notify backend to send email
    try {
      await fetch('/api/notify-interest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ propertyId, userId }),
      });
    } catch (notifyError) {
      console.error('Failed to notify backend for email:', notifyError);
    }

    return interest;
  } catch (error) {
    console.error('Error creating interest:', error);
    throw error;
  }
};

export const checkExistingInterest = async (userId: string, propertyId: string) => {
  const query = `*[_type == "interest" && user._ref == $userId && property._ref == $propertyId][0]`;
  return await sanityClient.fetch(query, { userId, propertyId });
};

export const getPropertyInterests = async (propertyId: string) => {
  const query = `*[_type == "interest" && property._ref == $propertyId]{
    _id,
    status,
    createdAt,
    user->{
      _id,
      name,
      email,
      phone,
      profileImage
    }
  }`;
  return await sanityClient.fetch(query, { propertyId });
};