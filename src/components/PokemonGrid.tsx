import { memo } from 'react'
import PokemonCard from './PokemonCard'
import type { Pokemon } from '@/types'

interface PokemonGridProps {
  pokemons: Pokemon[]
  onPokemonClick: (pokemon: Pokemon) => void
  isLoading?: boolean
}

function PokemonGrid({ pokemons, onPokemonClick, isLoading }: PokemonGridProps) {
  if (isLoading) {
    return (
      <div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
        role="status"
        aria-label="Cargando Pokémon"
      >
        {Array.from({ length: 20 }).map((_, index) => (
          <div
            key={`skeleton-${index}`}
            className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse"
            aria-hidden="true"
          >
            <div className="p-4 flex flex-col items-center">
              <div className="w-24 h-24 sm:w-32 sm:h-32 mb-4 bg-gray-200 rounded-lg" />
              <div className="h-6 w-3/4 bg-gray-200 rounded mb-2" />
              <div className="h-4 w-1/4 bg-gray-200 rounded" />
            </div>
          </div>
        ))}
        <span className="sr-only">Cargando lista de Pokémon...</span>
      </div>
    )
  }

  if (pokemons.length === 0) {
    return (
      <div className="text-center py-16" role="status">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
          <svg
            className="w-8 h-8 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No se encontraron Pokémon</h3>
        <p className="text-gray-500">Intenta con otra búsqueda</p>
      </div>
    )
  }

  return (
    <div
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
      role="list"
      aria-label="Lista de Pokémon"
    >
      {pokemons.map((pokemon) => (
        <div key={pokemon.name} role="listitem">
          <PokemonCard
            pokemon={pokemon}
            onClick={() => onPokemonClick(pokemon)}
          />
        </div>
      ))}
    </div>
  )
}

// Memoizar el componente para evitar re-renders innecesarios
export default memo(PokemonGrid)