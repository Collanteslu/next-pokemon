import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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

export default nextConfig;
