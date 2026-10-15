import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/postcss'
import autoprefixer from 'autoprefixer'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiKey = env.VITE_GOOGLE_MAPS_API_KEY

  return {
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
              proxyReq.setHeader('X-Goog-Api-Key', apiKey)
              proxyReq.setHeader('X-Goog-FieldMask', 'routes.distanceMeters,routes.duration')
            })
          },
        },
      },
    },
  }
})
