import type { Pokemon } from '@/types'
import Image from 'next/image'

interface PokemonCardProps {
  pokemon: Pokemon
  onClick?: () => void
}

export default function PokemonCard({ pokemon, onClick }: PokemonCardProps) {
  const pokemonId = pokemon.url.split('/').filter(Boolean).pop()
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`

  return (
    <div
      onClick={onClick}
      className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-blue-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
      
      <div className="p-4 flex flex-col items-center">
        <div className="relative w-24 h-24 sm:w-32 sm:h-32 mb-4">
          <Image
            src={imageUrl}
            alt={pokemon.name}
            fill
            sizes="(max-width: 640px) 96px, 128px"
            className="object-contain"
            loading="lazy"
          />
        </div>
        
        <div className="text-center">
          <h3 className="text-lg font-bold text-gray-800 capitalize mb-2 group-hover:text-red-600 transition-colors">
            {pokemon.name}
          </h3>
          
          <div className="flex items-center justify-center space-x-2">
            <span className="text-xs text-gray-500">#{String(pokemonId).padStart(3, '0')}</span>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
    </div>
  )
}