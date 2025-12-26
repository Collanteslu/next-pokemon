import { memo } from 'react'
import { useFavorites } from '@/hooks/useFavorites'

interface FavoriteButtonProps {
  pokemonId: number
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeClasses = {
  sm: 'w-5 h-5',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
}

function FavoriteButton({ pokemonId, size = 'md', className = '' }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const isCurrentFavorite = isFavorite(pokemonId)

  return (
    <button
      onClick={(e) => {
        e.stopPropagation()
        toggleFavorite(pokemonId)
      }}
      className={`p-2 rounded-full transition-all duration-300 hover:scale-110 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg ${className}`}
      aria-label={isCurrentFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
      title={isCurrentFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
    >
      {isCurrentFavorite ? (
        // Filled heart
        <svg
          className={`${sizeClasses[size]} text-red-500`}
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      ) : (
        // Outlined heart
        <svg
          className={`${sizeClasses[size]} text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      )}
    </button>
  )
}

export default memo(FavoriteButton)
