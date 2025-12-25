'use client'

import { useEffect } from 'react'
import type { PokemonDetails, PokemonSpecies } from '@/types'

interface PokemonSEOProps {
  details: PokemonDetails
  species: PokemonSpecies
}

/**
 * Component to handle dynamic SEO for Pokemon detail pages
 * Updates document title, meta tags, and adds JSON-LD structured data
 */
export default function PokemonSEO({ details, species }: PokemonSEOProps) {
  useEffect(() => {
    const pokemonName = details.name.charAt(0).toUpperCase() + details.name.slice(1)
    const pokemonId = String(details.id).padStart(3, '0')

    // Get English description
    const englishFlavorText = species.flavor_text_entries
      .find(entry => entry.language.name === 'en')
      ?.flavor_text.replace(/\f/g, ' ') || `Pokémon #${pokemonId}`

    const englishGenus = species.genera
      .find(entry => entry.language.name === 'en')
      ?.genus || 'Pokémon'

    // Update document title
    document.title = `${pokemonName} #${pokemonId} | Pokédex`

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const attribute = property ? 'property' : 'name'
      let meta = document.querySelector(`meta[${attribute}="${name}"]`)

      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute(attribute, name)
        document.head.appendChild(meta)
      }

      meta.setAttribute('content', content)
    }

    // Standard meta tags
    updateMetaTag('description', `${pokemonName} - ${englishGenus}. ${englishFlavorText}`)
    updateMetaTag('keywords', `${pokemonName}, pokemon, pokedex, ${details.types.map(t => t.type.name).join(', ')}`)

    // Open Graph tags
    updateMetaTag('og:title', `${pokemonName} #${pokemonId}`, true)
    updateMetaTag('og:description', `${englishGenus}: ${englishFlavorText}`, true)
    updateMetaTag('og:image', details.sprites.other['official-artwork'].front_default, true)
    updateMetaTag('og:type', 'website', true)
    updateMetaTag('og:url', `${window.location.origin}/pokemon/${details.id}`, true)

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image')
    updateMetaTag('twitter:title', `${pokemonName} #${pokemonId}`)
    updateMetaTag('twitter:description', `${englishGenus}: ${englishFlavorText}`)
    updateMetaTag('twitter:image', details.sprites.other['official-artwork'].front_default)

    // Create or update JSON-LD structured data
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Thing',
      name: pokemonName,
      description: englishFlavorText,
      image: details.sprites.other['official-artwork'].front_default,
      identifier: pokemonId,
      additionalType: englishGenus,
      url: `${window.location.origin}/pokemon/${details.id}`,
      subjectOf: {
        '@type': 'WebPage',
        name: `${pokemonName} - Pokédex`,
        url: `${window.location.origin}/pokemon/${details.id}`,
      },
    }

    let scriptTag = document.querySelector('script[type="application/ld+json"][data-pokemon-seo]')

    if (!scriptTag) {
      scriptTag = document.createElement('script')
      scriptTag.setAttribute('type', 'application/ld+json')
      scriptTag.setAttribute('data-pokemon-seo', 'true')
      document.head.appendChild(scriptTag)
    }

    scriptTag.textContent = JSON.stringify(structuredData)

    // Cleanup on unmount
    return () => {
      document.title = 'Pokédex'
    }
  }, [details, species])

  return null
}
