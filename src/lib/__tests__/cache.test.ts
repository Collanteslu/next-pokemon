import { describe, it, expect, beforeEach, vi } from 'vitest'
import {
  savePokemonListToCache,
  getPokemonListFromCache,
  clearPokemonCache,
  searchPokemonInCache,
} from '../cache'
import type { Pokemon } from '@/types'

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value
    },
    removeItem: (key: string) => {
      delete store[key]
    },
    clear: () => {
      store = {}
    },
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

describe('Cache utilities', () => {
  const mockPokemons: Pokemon[] = [
    { id: 1, name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { id: 4, name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
    { id: 7, name: 'squirtle', url: 'https://pokeapi.co/api/v2/pokemon/7/' },
  ]

  beforeEach(() => {
    localStorageMock.clear()
  })

  describe('savePokemonListToCache', () => {
    it('should save pokemon list to localStorage', () => {
      savePokemonListToCache(mockPokemons)
      const stored = localStorageMock.getItem('pokedex_list')
      expect(stored).toBeTruthy()

      const parsed = JSON.parse(stored!)
      expect(parsed.data).toEqual(mockPokemons)
      expect(parsed.timestamp).toBeDefined()
    })
  })

  describe('getPokemonListFromCache', () => {
    it('should return null if no cache exists', () => {
      const result = getPokemonListFromCache()
      expect(result).toBeNull()
    })

    it('should return cached data if not expired', () => {
      savePokemonListToCache(mockPokemons)
      const result = getPokemonListFromCache()
      expect(result).toEqual(mockPokemons)
    })

    it('should return null if cache is expired', () => {
      const expiredCache = {
        data: mockPokemons,
        timestamp: Date.now() - (25 * 60 * 60 * 1000), // 25 hours ago
      }
      localStorageMock.setItem('pokedex_list', JSON.stringify(expiredCache))

      const result = getPokemonListFromCache()
      expect(result).toBeNull()
    })
  })

  describe('clearPokemonCache', () => {
    it('should clear the cache', () => {
      savePokemonListToCache(mockPokemons)
      expect(localStorageMock.getItem('pokedex_list')).toBeTruthy()

      clearPokemonCache()
      expect(localStorageMock.getItem('pokedex_list')).toBeNull()
    })
  })

  describe('searchPokemonInCache', () => {
    beforeEach(() => {
      savePokemonListToCache(mockPokemons)
    })

    it('should return null if no cache exists', () => {
      clearPokemonCache()
      const result = searchPokemonInCache('bulba')
      expect(result).toBeNull()
    })

    it('should return empty array for empty query', () => {
      const result = searchPokemonInCache('')
      expect(result).toEqual([])
    })

    it('should find pokemon by partial name', () => {
      const result = searchPokemonInCache('char')
      expect(result).toHaveLength(1)
      expect(result![0].name).toBe('charmander')
    })

    it('should be case insensitive', () => {
      const result = searchPokemonInCache('BULBA')
      expect(result).toHaveLength(1)
      expect(result![0].name).toBe('bulbasaur')
    })

    it('should return multiple matches', () => {
      const allPokemons: Pokemon[] = [
        ...mockPokemons,
        { id: 143, name: 'snorlax', url: 'https://pokeapi.co/api/v2/pokemon/143/' },
      ]
      savePokemonListToCache(allPokemons)

      const result = searchPokemonInCache('s')
      expect(result!.length).toBeGreaterThanOrEqual(2) // squirtle y snorlax
    })
  })
})
