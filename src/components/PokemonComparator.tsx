import { memo, useState } from 'react'
import type { PokemonDetails } from '@/types'
import Image from 'next/image'
import { TYPE_COLORS } from '@/lib/constants'

interface PokemonComparatorProps {
  pokemon1: PokemonDetails | null
  pokemon2: PokemonDetails | null
  onClose: () => void
}

function PokemonComparator({ pokemon1, pokemon2, onClose }: PokemonComparatorProps) {
  if (!pokemon1 && !pokemon2) return null

  const getStatValue = (pokemon: PokemonDetails | null, statName: string): number => {
    if (!pokemon) return 0
    const stat = pokemon.stats.find(s => s.stat.name === statName)
    return stat?.base_stat || 0
  }

  const statNames = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed']

  const getStatColor = (value1: number, value2: number): string => {
    if (value1 > value2) return 'text-green-600 dark:text-green-400'
    if (value1 < value2) return 'text-red-600 dark:text-red-400'
    return 'text-gray-600 dark:text-gray-400'
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex justify-between items-center z-10">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Comparador de Pokémon
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            aria-label="Cerrar comparador"
          >
            <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Pokemon 1 */}
            <div className="space-y-4">
              {pokemon1 ? (
                <>
                  <div className="text-center">
                    <div className="relative w-48 h-48 mx-auto mb-4">
                      <Image
                        src={pokemon1.sprites.other['official-artwork'].front_default}
                        alt={pokemon1.name}
                        fill
                        sizes="192px"
                        className="object-contain"
                      />
                    </div>
                    <h3 className="text-2xl font-bold capitalize text-gray-800 dark:text-gray-100">
                      {pokemon1.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">#{String(pokemon1.id).padStart(3, '0')}</p>
                  </div>

                  {/* Types */}
                  <div className="flex justify-center gap-2">
                    {pokemon1.types.map((typeInfo) => (
                      <span
                        key={typeInfo.type.name}
                        className={`px-4 py-2 rounded-full text-white text-sm font-semibold capitalize ${TYPE_COLORS[typeInfo.type.name] || TYPE_COLORS.normal}`}
                      >
                        {typeInfo.type.name}
                      </span>
                    ))}
                  </div>

                  {/* Basic Info */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Altura:</span>
                      <span className="font-semibold text-gray-800 dark:text-gray-100">
                        {pokemon1.height / 10} m
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Peso:</span>
                      <span className="font-semibold text-gray-800 dark:text-gray-100">
                        {pokemon1.weight / 10} kg
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
                  Selecciona un Pokémon
                </div>
              )}
            </div>

            {/* Pokemon 2 */}
            <div className="space-y-4">
              {pokemon2 ? (
                <>
                  <div className="text-center">
                    <div className="relative w-48 h-48 mx-auto mb-4">
                      <Image
                        src={pokemon2.sprites.other['official-artwork'].front_default}
                        alt={pokemon2.name}
                        fill
                        sizes="192px"
                        className="object-contain"
                      />
                    </div>
                    <h3 className="text-2xl font-bold capitalize text-gray-800 dark:text-gray-100">
                      {pokemon2.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">#{String(pokemon2.id).padStart(3, '0')}</p>
                  </div>

                  {/* Types */}
                  <div className="flex justify-center gap-2">
                    {pokemon2.types.map((typeInfo) => (
                      <span
                        key={typeInfo.type.name}
                        className={`px-4 py-2 rounded-full text-white text-sm font-semibold capitalize ${TYPE_COLORS[typeInfo.type.name] || TYPE_COLORS.normal}`}
                      >
                        {typeInfo.type.name}
                      </span>
                    ))}
                  </div>

                  {/* Basic Info */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Altura:</span>
                      <span className="font-semibold text-gray-800 dark:text-gray-100">
                        {pokemon2.height / 10} m
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Peso:</span>
                      <span className="font-semibold text-gray-800 dark:text-gray-100">
                        {pokemon2.weight / 10} kg
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
                  Selecciona un Pokémon
                </div>
              )}
            </div>
          </div>

          {/* Stats Comparison */}
          {pokemon1 && pokemon2 && (
            <div className="mt-8">
              <h4 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 text-center">
                Comparación de Estadísticas
              </h4>
              <div className="space-y-4">
                {statNames.map((statName) => {
                  const value1 = getStatValue(pokemon1, statName)
                  const value2 = getStatValue(pokemon2, statName)
                  const max = Math.max(value1, value2, 255)

                  return (
                    <div key={statName} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className={`text-sm font-semibold capitalize w-32 ${getStatColor(value1, value2)}`}>
                          {value1}
                        </span>
                        <span className="text-gray-600 dark:text-gray-400 capitalize">
                          {statName.replace('-', ' ')}
                        </span>
                        <span className={`text-sm font-semibold capitalize w-32 text-right ${getStatColor(value2, value1)}`}>
                          {value2}
                        </span>
                      </div>
                      <div className="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="absolute left-0 h-full bg-blue-500 rounded-full transition-all duration-500"
                          style={{ width: `${(value1 / max) * 50}%` }}
                        />
                        <div
                          className="absolute right-0 h-full bg-red-500 rounded-full transition-all duration-500"
                          style={{ width: `${(value2 / max) * 50}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Total Stats */}
              <div className="mt-6 bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className={`text-lg font-bold ${getStatColor(
                    pokemon1.stats.reduce((sum, s) => sum + s.base_stat, 0),
                    pokemon2.stats.reduce((sum, s) => sum + s.base_stat, 0)
                  )}`}>
                    Total: {pokemon1.stats.reduce((sum, s) => sum + s.base_stat, 0)}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400 font-semibold">
                    Estadísticas Totales
                  </span>
                  <span className={`text-lg font-bold ${getStatColor(
                    pokemon2.stats.reduce((sum, s) => sum + s.base_stat, 0),
                    pokemon1.stats.reduce((sum, s) => sum + s.base_stat, 0)
                  )}`}>
                    Total: {pokemon2.stats.reduce((sum, s) => sum + s.base_stat, 0)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default memo(PokemonComparator)
