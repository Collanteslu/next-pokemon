declare module 'next-pwa' {
  import { NextConfig } from 'next'

  interface RuntimeCaching {
    urlPattern: RegExp | string
    handler: string
    options?: {
      cacheName?: string
      expiration?: {
        maxEntries?: number
        maxAgeSeconds?: number
      }
      cacheableResponse?: {
        statuses?: number[]
      }
      backgroundSync?: {
        name: string
        options?: {
          maxRetentionTime?: number
        }
      }
    }
  }

  interface PWAConfig {
    dest: string
    disable?: boolean
    register?: boolean
    skipWaiting?: boolean
    runtimeCaching?: RuntimeCaching[]
  }

  export default function withPWA(config: PWAConfig): (nextConfig: NextConfig) => NextConfig
}
