import type { Metadata } from 'next'
import { pokemonAPI } from '@/lib/api'

interface PokemonPageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({ params }: PokemonPageProps): Promise<Metadata> {
  const { id } = await params
  try {
    const { details, species } = await pokemonAPI.getPokemonWithSpecies(id)
    const englishGenus = species.genera.find(
      entry => entry.language.name === 'en'
    )?.genus || 'Pokémon'

    return {
      title: `${details.name} | Pokédex`,
      description: `Descubre todo sobre ${details.name}, el ${englishGenus}. Altura: ${details.height / 10}m, Peso: ${details.weight / 10}kg, Tipos: ${details.types.map(t => t.type.name).join(', ')}.`,
      keywords: [
        details.name,
        englishGenus,
        'pokemon',
        'pokedex',
        ...details.types.map(t => `${t.type.name} type`)
      ],
      openGraph: {
        title: `${details.name} - Pokédex`,
        description: `Todo sobre ${details.name}: altura, peso, tipos, habilidades y estadísticas.`,
        images: [
          {
            url: details.sprites.other['official-artwork'].front_default,
            width: 475,
            height: 475,
            alt: `${details.name} artwork`,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${details.name} - Pokédex`,
        description: `Todo sobre ${details.name}: altura, peso, tipos, habilidades.`,
        images: [details.sprites.other['official-artwork'].front_default],
      },
    }
  } catch {
    return {
      title: 'Pokémon no encontrado | Pokédex',
      description: 'Este Pokémon no fue encontrado en nuestra Pokédex.',
    }
  }
}
