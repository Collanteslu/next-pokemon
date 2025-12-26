import { memo } from 'react'
import type { Pokemon } from '@/types'
import Image from 'next/image'
import { SPRITE_URLS } from '@/lib/constants'
import { getShimmerPlaceholder } from '@/lib/imagePlaceholder'
import FavoriteButton from './FavoriteButton'

interface PokemonCardProps {
  pokemon: Pokemon
  onClick?: () => void
  isSelected?: boolean
}

function PokemonCard({ pokemon, onClick, isSelected = false }: PokemonCardProps) {
  const pokemonId = pokemon.url.split('/').filter(Boolean).pop()
  const imageUrl = `${SPRITE_URLS.BASE}/${pokemonId}.png`

  return (
    <div
      onClick={onClick}
      className={`group relative bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden w-full cursor-pointer ${
        isSelected ? 'ring-4 ring-purple-500 ring-offset-2 dark:ring-offset-gray-900' : ''
      }`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick?.()
        }
      }}
      aria-label={`Ver detalles de ${pokemon.name}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-blue-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />

      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute top-2 left-2 z-10 bg-purple-500 rounded-full p-1 shadow-lg">
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      )}

      <div className="absolute top-2 right-2 z-10">
        <FavoriteButton pokemonId={Number(pokemonId)} />
      </div>

      <div className="p-4 flex flex-col items-center">
        <div className="relative w-24 h-24 sm:w-32 sm:h-32 mb-4">
          <Image
            src={imageUrl}
            alt={pokemon.name}
            fill
            sizes="(max-width: 640px) 96px, 128px"
            className="object-contain"
            loading="lazy"
            placeholder="blur"
            blurDataURL={getShimmerPlaceholder(128, 128)}
          />
        </div>
        
        <div className="text-center">
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 capitalize mb-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
            {pokemon.name}
          </h3>

          <div className="flex items-center justify-center space-x-2">
            <span className="text-xs text-gray-500 dark:text-gray-400">#{String(pokemonId).padStart(3, '0')}</span>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
    </div>
  )
}

// Memoizar el componente para evitar re-renders innecesarios
export default memo(PokemonCard)