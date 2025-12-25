import { useState, useEffect } from 'react'
import { pokemonAPI } from '@/lib/api'
import type { PokemonDetails, PokemonSpecies } from '@/types'

interface UsePokemonDetailsResult {
  data: {
    details: PokemonDetails
    species: PokemonSpecies
  } | null
  isLoading: boolean
  error: string | null
}

/**
 * Hook personalizado para cargar detalles de un Pokémon
 * @param id - ID o nombre del Pokémon
 * @returns Estado de carga, datos y error
 */
export function usePokemonDetails(id: string | number | null): UsePokemonDetailsResult {
  const [data, setData] = useState<{
    details: PokemonDetails
    species: PokemonSpecies
  } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) {
      setIsLoading(false)
      return
    }

    const loadPokemonDetails = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const pokemonData = await pokemonAPI.getPokemonWithSpecies(id)
        setData(pokemonData)
      } catch (err) {
        const errorMessage = err instanceof Error
          ? err.message
          : 'No se pudo cargar la información del Pokémon'
        setError(errorMessage)
        console.error('Error loading pokemon details:', err)
      } finally {
        setIsLoading(false)
      }
    }

    loadPokemonDetails()
  }, [id])

  return { data, isLoading, error }
}
