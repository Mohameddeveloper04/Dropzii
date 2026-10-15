import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/postcss'
import autoprefixer from 'autoprefixer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  css: {
    postcss: {
      plugins: [
        tailwindcss(),
        autoprefixer(),
      ],
    },
  },
  server: {
    proxy: {
      '/api/distance': {
        target: 'https://routes.googleapis.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/distance/, '/directions/v2:computeRoutes'),
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            // Add Google API headers
            const apiKey = process.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyAhjq8HpKcxRhTGHpp0Ti02q-9vwA1OLJ4';
            proxyReq.setHeader('X-Goog-Api-Key', apiKey);
            proxyReq.setHeader('X-Goog-FieldMask', 'routes.distanceMeters,routes.duration');
            proxyReq.setHeader('Content-Type', 'application/json');
          });
        },
      },
    },
  },
})
