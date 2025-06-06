// import { createClient } from '@sanity/client';
// import dotenv from 'dotenv';
// dotenv.config(); // Loads .env file// Ensure environment variables are loaded on the server

// // Temporary logging to verify environment variables are loaded

// console.log('Sanity Project ID (Server): ', process.env.VITE_SANITY_PROJECT_ID);
// console.log('Sanity Dataset (Server): ', process.env.VITE_SANITY_DATASET);
// console.log('Sanity Token (Server): ', process.env.VITE_SANITY_TOKEN ? '[REDACTED]' : '[NOT SET]'); // Redact token for safety

// // Create a client that uses the token only on the server side
// // This should be used in API routes, not in the browser
// export const serverClient = createClient({
//   projectId: process.env.VITE_SANITY_PROJECT_ID || 'ogyoe0hr', // Use environment variable or fallback
//   dataset: process.env.VITE_SANITY_DATASET || 'production', // Use environment variable or fallback
//   apiVersion: '2025-04-03',
//   // Editor token for full permissions
//   token: process.env.VITE_SANITY_TOKEN, // Use environment variable for token
//   useCdn: false,
// }); 