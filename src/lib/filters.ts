import type { Pokemon } from '@/types'

/**
 * Tipos de Pokémon disponibles
 */
export const POKEMON_TYPES = [
  'normal', 'fire', 'water', 'electric', 'grass', 'ice',
  'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
  'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
] as const

export type PokemonType = typeof POKEMON_TYPES[number]

/**
 * Generaciones de Pokémon con sus rangos de ID
 */
export const GENERATIONS = [
  { id: 1, name: 'Kanto', range: [1, 151] },
  { id: 2, name: 'Johto', range: [152, 251] },
  { id: 3, name: 'Hoenn', range: [252, 386] },
  { id: 4, name: 'Sinnoh', range: [387, 493] },
  { id: 5, name: 'Unova', range: [494, 649] },
  { id: 6, name: 'Kalos', range: [650, 721] },
  { id: 7, name: 'Alola', range: [722, 809] },
  { id: 8, name: 'Galar', range: [810, 905] },
] as const

export interface PokemonFilters {
  type?: PokemonType
  generation?: number
  search?: string
  favorites?: boolean
}

/**
 * Obtiene el ID de un Pokémon desde su URL
 */
export function getPokemonId(pokemon: Pokemon): number {
  const id = pokemon.url.split('/').filter(Boolean).pop()
  return id ? parseInt(id, 10) : 0
}

/**
 * Filtra Pokémon por generación
 */
export function filterByGeneration(pokemons: Pokemon[], generation: number): Pokemon[] {
  const gen = GENERATIONS.find(g => g.id === generation)
  if (!gen) return pokemons

  return pokemons.filter(pokemon => {
    const id = getPokemonId(pokemon)
    return id >= gen.range[0] && id <= gen.range[1]
  })
}

/**
 * Filtra Pokémon por nombre
 */
export function filterByName(pokemons: Pokemon[], search: string): Pokemon[] {
  if (!search.trim()) return pokemons

  const query = search.toLowerCase().trim()
  return pokemons.filter(pokemon =>
    pokemon.name.toLowerCase().includes(query)
  )
}

/**
 * Filtra Pokémon por favoritos
 */
export function filterByFavorites(pokemons: Pokemon[], favorites: number[]): Pokemon[] {
  return pokemons.filter(pokemon => {
    const id = getPokemonId(pokemon)
    return favorites.includes(id)
  })
}

/**
 * Aplica todos los filtros a una lista de Pokémon
 */
export function applyFilters(
  pokemons: Pokemon[],
  filters: PokemonFilters,
  favoriteIds: number[] = []
): Pokemon[] {
  let filtered = [...pokemons]

  if (filters.search) {
    filtered = filterByName(filtered, filters.search)
  }

  if (filters.generation) {
    filtered = filterByGeneration(filtered, filters.generation)
  }

  if (filters.favorites) {
    filtered = filterByFavorites(filtered, favoriteIds)
  }

  return filtered
}

/**
 * Obtiene el nombre de una generación por ID
 */
export function getGenerationName(id: number): string {
  const gen = GENERATIONS.find(g => g.id === id)
  return gen ? `Gen ${gen.id} - ${gen.name}` : ''
}
