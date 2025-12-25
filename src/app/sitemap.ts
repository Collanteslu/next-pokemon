import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pokedex.example.com'

  // Generate URLs for all 151 original Pokemon
  const pokemonUrls = Array.from({ length: 151 }, (_, i) => ({
    url: `${baseUrl}/pokemon/${i + 1}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...pokemonUrls,
  ]
}
