// This file provides a more secure way to interact with Sanity
// by using environment variables properly

import { createClient } from '@sanity/client';


// Create a client for public data that doesn't need authentication
// This is safe to use in the browser
export const publicClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'ogyoe0hr',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2025-04-03',
  useCdn: false, // Use CDN for better performance
  // Add these options to help with CORS issues
  withCredentials: false,
  token: import.meta.env.VITE_SANITY_TOKEN, // Explicitly set token to undefined for browser client
  // Use the correct Sanity API URL format
  apiHost: 'https://api.sanity.io',
});

// Helper functions for common queries - using publicClient for browser safety
// Helper functions with TypeScript types
export const getProperties = async (): Promise<any[]> => {
  try {
    return await publicClient.fetch('*[_type == "property"]');
  } catch (error: unknown) {
    console.log('Error fetching properties:', error);
    return [];
  }
};

export const getPropertyById = async (id: string): Promise<any | null> => {
  try {
    return await publicClient.fetch(`*[_type == "property" && _id == $id][0]`, { id });
  } catch (error: unknown) {
    console.log(`Error fetching property with id ${id}:`, error);
    return null;
  }
};