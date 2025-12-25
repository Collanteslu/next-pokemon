'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { pokemonAPI } from '@/lib/api'
import { TYPE_COLORS } from '@/lib/constants'
import type { PokemonDetails, PokemonSpecies } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import FavoriteButton from '@/components/FavoriteButton'

export default function PokemonDetailPage() {
  const params = useParams()
  const [pokemonDetails, setPokemonDetails] = useState<{
    details: PokemonDetails
    species: PokemonSpecies
  } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadPokemonDetails = async () => {
      if (!params.id) return

      setIsLoading(true)
      setError(null)

      try {
        const data = await pokemonAPI.getPokemonWithSpecies(params.id as string)
        setPokemonDetails(data)
      } catch (err) {
        setError('No se pudo cargar la información del Pokémon')
        console.error('Error loading pokemon details:', err)
      } finally {
        setIsLoading(false)
      }
    }

    loadPokemonDetails()
  }, [params.id])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-gray-600 dark:text-gray-300">Cargando información del Pokémon...</p>
        </div>
      </div>
    )
  }

  if (error || !pokemonDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-red-500 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Error</h2>
          <p className="text-gray-600 dark:text-gray-300">{error}</p>
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver a la Pokédex
          </Link>
        </div>
      </div>
    )
  }

  const { details, species } = pokemonDetails
  const pokemonId = String(details.id).padStart(3, '0')
  
  const englishFlavorText = species.flavor_text_entries.find(
    entry => entry.language.name === 'en'
  )?.flavor_text || 'No description available.'
  
  const englishGenus = species.genera.find(
    entry => entry.language.name === 'en'
  )?.genus || 'Pokémon'

  const mainType = details.types[0]?.type.name || 'unknown'
  const typeBgColor = TYPE_COLORS[mainType] || TYPE_COLORS.normal

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Link
          href="/"
          className="inline-flex items-center text-blue-500 hover:text-blue-700 mb-6 transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver a la Pokédex
        </Link>

        <div className="max-w-4xl mx-auto">
          <div className={`${typeBgColor} rounded-t-2xl p-8 text-white text-center relative overflow-hidden`}>
            <div className="absolute inset-0 bg-black bg-opacity-20" />

            <div className="absolute top-4 right-4 z-20">
              <FavoriteButton pokemonId={details.id} size="lg" />
            </div>

            <div className="relative z-10">
              <div className="relative w-48 h-48 mx-auto mb-4">
                <Image
                  src={details.sprites.other['official-artwork'].front_default}
                  alt={details.name}
                  fill
                  sizes="192px"
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </div>
              <h1 className="text-4xl font-bold capitalize mb-2">{details.name}</h1>
              <p className="text-xl opacity-90">#{pokemonId} • {englishGenus}</p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-b-2xl shadow-xl p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Información Básica</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b dark:border-gray-700">
                      <span className="font-semibold text-gray-600 dark:text-gray-400">Altura</span>
                      <span className="text-gray-800 dark:text-gray-100">{details.height / 10} m</span>
                    </div>
                    <div className="flex justify-between py-2 border-b dark:border-gray-700">
                      <span className="font-semibold text-gray-600 dark:text-gray-400">Peso</span>
                      <span className="text-gray-800 dark:text-gray-100">{details.weight / 10} kg</span>
                    </div>
                    <div className="flex justify-between py-2 border-b dark:border-gray-700">
                      <span className="font-semibold text-gray-600 dark:text-gray-400">ID</span>
                      <span className="text-gray-800 dark:text-gray-100">#{pokemonId}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Tipos</h2>
                  <div className="flex space-x-3">
                    {details.types.map((typeInfo) => (
                      <span
                        key={typeInfo.type.name}
                        className={`px-4 py-2 rounded-full text-white text-sm font-semibold capitalize ${TYPE_COLORS[typeInfo.type.name] || TYPE_COLORS.normal}`}
                      >
                        {typeInfo.type.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Habilidades</h2>
                  <div className="space-y-2">
                    {details.abilities.map((abilityInfo) => (
                      <div
                        key={abilityInfo.ability.name}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                      >
                        <span className="font-medium capitalize text-gray-800 dark:text-gray-100">
                          {abilityInfo.ability.name.replace('-', ' ')}
                        </span>
                        {abilityInfo.is_hidden && (
                          <span className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-full">
                            Oculta
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Estadísticas Base</h2>
                  <div className="space-y-3">
                    {details.stats.map((statInfo) => (
                      <div key={statInfo.stat.name} className="space-y-1">
                        <div className="flex justify-between">
                          <span className="font-semibold text-gray-600 dark:text-gray-400 capitalize">
                            {statInfo.stat.name.replace('-', ' ')}
                          </span>
                          <span className="text-gray-800 dark:text-gray-100 font-medium">{statInfo.base_stat}</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-blue-400 to-blue-600 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${Math.min((statInfo.base_stat / 255) * 100, 100)}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Descripción</h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    {englishFlavorText}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}