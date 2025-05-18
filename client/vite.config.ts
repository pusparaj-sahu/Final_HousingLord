import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    // Make sure environment variables are properly loaded
    envDir: path.resolve(__dirname),
    define: {
      // Make env variables available globally
      'process.env': env
    },
    server: {
      // Ensure server can access env variables
      watch: {
        usePolling: true,
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  };
});