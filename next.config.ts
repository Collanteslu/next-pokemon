import type { NextConfig } from "next";
import withPWA from 'next-pwa'

const nextConfig: NextConfig = {
  // Turbopack configuration (Next.js 16 default)
  // Empty config acknowledges we're aware of Turbopack with webpack plugins
  turbopack: {},
  images: {
    // Usar remotePatterns en lugar de domains (deprecated)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/PokeAPI/sprites/**',
      },
    ],
    // Formatos modernos para mejor compresión
    formats: ['image/avif', 'image/webp'],
    // Tamaños de dispositivos optimizados
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    // Tamaños de imágenes optimizados
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Tiempo de caché para imágenes optimizadas (1 año)
    minimumCacheTTL: 31536000,
  },
  // Comprimir respuestas
  compress: true,
  // Optimizaciones de producción
  productionBrowserSourceMaps: false,
  // Configuración de compilación
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
};

// Configuración de PWA
const pwaConfig = withPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/pokeapi\.co\/api\/v2\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'pokeapi-cache',
        expiration: {
          maxEntries: 200,
          maxAgeSeconds: 24 * 60 * 60 // 24 hours
        },
        cacheableResponse: {
          statuses: [0, 200]
        }
      }
    },
    {
      urlPattern: /^https:\/\/raw\.githubusercontent\.com\/PokeAPI\/sprites\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'pokemon-sprites',
        expiration: {
          maxEntries: 500,
          maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
        },
        cacheableResponse: {
          statuses: [0, 200]
        }
      }
    }
  ]
})

export default pwaConfig(nextConfig);
