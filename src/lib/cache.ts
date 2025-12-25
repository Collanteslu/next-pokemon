import type { Pokemon } from '@/types'
import { CACHE_CONFIG } from './constants'

const CACHE_KEY = `${CACHE_CONFIG.KEY_PREFIX}list`
const CACHE_EXPIRY_KEY = `${CACHE_CONFIG.KEY_PREFIX}list_expiry`
const CACHE_DURATION = process.env.NEXT_PUBLIC_CACHE_DURATION
  ? parseInt(process.env.NEXT_PUBLIC_CACHE_DURATION, 10)
  : CACHE_CONFIG.POKEMON_LIST_DURATION

interface PokemonCache {
  data: Pokemon[]
  timestamp: number
}

/**
 * Guarda la lista completa de Pokémon en localStorage
 */
export function savePokemonListToCache(pokemons: Pokemon[]): void {
  if (typeof window === 'undefined') return

  try {
    const cache: PokemonCache = {
      data: pokemons,
      timestamp: Date.now()
    }
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache))
  } catch (error) {
    console.warn('Failed to save to cache:', error)
  }
}

/**
 * Obtiene la lista de Pokémon del caché si está disponible y no ha expirado
 */
export function getPokemonListFromCache(): Pokemon[] | null {
  if (typeof window === 'undefined') return null

  try {
    const cached = localStorage.getItem(CACHE_KEY)
    if (!cached) return null

    const cache: PokemonCache = JSON.parse(cached)
    const isExpired = Date.now() - cache.timestamp > CACHE_DURATION

    if (isExpired) {
      localStorage.removeItem(CACHE_KEY)
      return null
    }

    return cache.data
  } catch (error) {
    console.warn('Failed to read from cache:', error)
    return null
  }
}

/**
 * Limpia el caché de Pokémon
 */
export function clearPokemonCache(): void {
  if (typeof window === 'undefined') return

  try {
    localStorage.removeItem(CACHE_KEY)
    localStorage.removeItem(CACHE_EXPIRY_KEY)
  } catch (error) {
    console.warn('Failed to clear cache:', error)
  }
}

/**
 * Filtra Pokémon por nombre desde una lista en caché
 */
export function searchPokemonInCache(query: string): Pokemon[] | null {
  const cached = getPokemonListFromCache()
  if (!cached) return null

  if (!query.trim()) return []

  return cached.filter(pokemon =>
    pokemon.name.toLowerCase().includes(query.toLowerCase())
  )
}
