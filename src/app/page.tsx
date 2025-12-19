'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { pokemonAPI } from '@/lib/api'
import { Pokemon, PaginationInfo } from '@/types'
import SearchBar from '@/components/SearchBar'
import PokemonGrid from '@/components/PokemonGrid'
import Pagination from '@/components/Pagination'

export default function HomePage() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [pagination, setPagination] = useState<PaginationInfo | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const searchParams = useSearchParams()
  const router = useRouter()

  const loadPokemons = async (page: number = 1, search: string = '') => {
    setIsLoading(true)
    try {
      if (search.trim()) {
        const searchResults = await pokemonAPI.searchPokemonByName(search)
        setPokemons(searchResults.slice(0, 20))
        setPagination({
          currentPage: 1,
          totalPages: 1,
          hasNextPage: false,
          hasPrevPage: false,
        })
      } else {
        const result = await pokemonAPI.getPokemonList(page, 20)
        setPokemons(result.pokemons)
        setPagination(result.pagination)
      }
    } catch (error) {
      console.error('Error loading pokemons:', error)
      setPokemons([])
      setPagination(null)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const pageParam = searchParams.get('page')
    const searchParam = searchParams.get('search')
    const page = pageParam ? parseInt(pageParam, 10) : 1
    
    setSearchQuery(searchParam || '')
    loadPokemons(page, searchParam || '')
  }, [searchParams])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handlePokemonClick = (pokemon: Pokemon) => {
    const pokemonId = pokemon.url.split('/').filter(Boolean).pop()
    router.push(`/pokemon/${pokemonId}`)
  }

  const handlePageChange = (page: number) => {
    loadPokemons(page, searchQuery)
  }

  return (
    <div className="space-y-8">
      <header className="text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-blue-500">
          Pokédex
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explora el fascinante mundo de los Pokémon. Descubre información detallada sobre todas las criaturas.
        </p>
      </header>

      <SearchBar onSearch={handleSearch} />

      <main>
        <PokemonGrid
          pokemons={pokemons}
          onPokemonClick={handlePokemonClick}
          isLoading={isLoading}
        />

        {pagination && !searchQuery && pokemons.length > 0 && (
          <Pagination
            pagination={pagination}
            currentPage={pagination.currentPage}
            onPageChange={handlePageChange}
          />
        )}

        {searchQuery && pokemons.length > 0 && (
          <div className="text-center mt-8 text-gray-600">
            Se encontraron <span className="font-semibold text-blue-600">{pokemons.length}</span> Pokémon para &quot;{searchQuery}&quot;
          </div>
        )}
      </main>
    </div>
  )
}