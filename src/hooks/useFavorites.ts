import { useState, useEffect, useCallback } from 'react'

const FAVORITES_KEY = 'pokedex_favorites'

/**
 * Hook para manejar favoritos con persistencia en localStorage
 * @returns objeto con favoritos y funciones para manipularlos
 */
export function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>(() => {
    if (typeof window === 'undefined') return []

    try {
      const saved = localStorage.getItem(FAVORITES_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  // Sincronizar con localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
  }, [favorites])

  const addFavorite = useCallback((pokemonId: number) => {
    setFavorites(prev => {
      if (prev.includes(pokemonId)) return prev
      return [...prev, pokemonId]
    })
  }, [])

  const removeFavorite = useCallback((pokemonId: number) => {
    setFavorites(prev => prev.filter(id => id !== pokemonId))
  }, [])

  const toggleFavorite = useCallback((pokemonId: number) => {
    setFavorites(prev => {
      if (prev.includes(pokemonId)) {
        return prev.filter(id => id !== pokemonId)
      }
      return [...prev, pokemonId]
    })
  }, [])

  const isFavorite = useCallback((pokemonId: number) => {
    return favorites.includes(pokemonId)
  }, [favorites])

  const clearFavorites = useCallback(() => {
    setFavorites([])
  }, [])

  return {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    count: favorites.length
  }
}
