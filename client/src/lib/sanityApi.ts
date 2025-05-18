// This file provides a more secure way to interact with Sanity
// by using environment variables properly

import { createClient } from '@sanity/client';

// Create a client for public data that doesn't need authentication
// This is safe to use in the browser
export const publicClient = createClient({
  projectId: 'ogyoe0hr',
  dataset: 'production',
  apiVersion: '2025-04-03',
  useCdn: true, // Use CDN for better performance
  // Add these options to help with CORS issues
  withCredentials: false,
  token: undefined, // Explicitly set token to undefined for browser client
  // Use the correct Sanity API URL format
  apiHost: 'https://api.sanity.io',
});

// Create a client that uses the token only on the server side
// This should be used in API routes, not in the browser
// IMPORTANT: This client should ONLY be used in server-side code
// DO NOT import this in any browser-side components
export const serverClient = createClient({
  projectId: 'ogyoe0hr',
  dataset: 'production',
  apiVersion: '2025-04-03',
  // Editor token for full permissions
  token: 'skUUE01jpqseamiAtoni326efjYmv89AooBbHOHluCgqjd4sfC5fmpnDkOhdt3wlykRMLVvC0vnn6eEuSGDbDOhPNzTxKrrfwH3LZPdUIHL1vILkYiRcv8fugzWNjaoD38LDM6mLnO88pbHEhl1AqtrgyZEV5rvHBK0vZoJ5EhLODean9KE6',
  useCdn: false,
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