import type { Pokemon } from '@/types'

export type SortOption =
  | 'id-asc'
  | 'id-desc'
  | 'name-asc'
  | 'name-desc'
  | 'default'

export interface SortConfig {
  value: SortOption
  label: string
  icon?: string
}

export const SORT_OPTIONS: SortConfig[] = [
  { value: 'default', label: 'Por defecto' },
  { value: 'id-asc', label: 'ID: Menor a Mayor' },
  { value: 'id-desc', label: 'ID: Mayor a Menor' },
  { value: 'name-asc', label: 'Nombre: A-Z' },
  { value: 'name-desc', label: 'Nombre: Z-A' },
]

/**
 * Obtiene el ID de un Pokémon desde su URL
 */
function getPokemonId(pokemon: Pokemon): number {
  const id = pokemon.url.split('/').filter(Boolean).pop()
  return id ? parseInt(id, 10) : 0
}

/**
 * Ordena una lista de Pokémon según la opción seleccionada
 */
export function sortPokemons(pokemons: Pokemon[], sortOption: SortOption): Pokemon[] {
  if (sortOption === 'default' || !sortOption) {
    return pokemons
  }

  const sorted = [...pokemons]

  switch (sortOption) {
    case 'id-asc':
      return sorted.sort((a, b) => getPokemonId(a) - getPokemonId(b))

    case 'id-desc':
      return sorted.sort((a, b) => getPokemonId(b) - getPokemonId(a))

    case 'name-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name))

    case 'name-desc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name))

    default:
      return sorted
  }
}

/**
 * Obtiene la configuración de ordenamiento por su valor
 */
export function getSortConfig(value: SortOption): SortConfig | undefined {
  return SORT_OPTIONS.find(option => option.value === value)
}
