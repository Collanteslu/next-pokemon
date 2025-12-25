'use client'

import { useState, useEffect, useMemo } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { pokemonAPI } from '@/lib/api'
import { Pokemon, PaginationInfo } from '@/types'
import { useDebounce } from '@/hooks/useDebounce'
import { useFavorites } from '@/hooks/useFavorites'
import { applyFilters } from '@/lib/filters'
import SearchBar from '@/components/SearchBar'
import PokemonGrid from '@/components/PokemonGrid'
import Pagination from '@/components/Pagination'
import FilterBar from '@/components/FilterBar'

export default function HomePage() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [pagination, setPagination] = useState<PaginationInfo | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<{ generation?: number; favorites?: boolean; search?: string }>({})

  const searchParams = useSearchParams()
  const router = useRouter()
  const { favorites, count } = useFavorites()

  // Debounce de la búsqueda para evitar llamadas excesivas al API
  const debouncedSearchQuery = useDebounce(searchQuery, 300)

  // Aplicar filtros a los pokemons
  const filteredPokemons = useMemo(() => {
    return applyFilters(pokemons, filters, favorites)
  }, [pokemons, filters, favorites])

  const loadPokemons = async (page: number = 1, search: string = '') => {
    setIsLoading(true)
    setError(null)

    try {
      if (search.trim()) {
        const searchResults = await pokemonAPI.searchPokemonByName(search)
        setPokemons(searchResults)
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
      const errorMessage = error instanceof Error ? error.message : 'Error al cargar los Pokémon'
      console.error('Error loading pokemons:', error)
      setError(errorMessage)
      setPokemons([])
      setPagination(null)
    } finally {
      setIsLoading(false)
    }
  }

  // Efecto para URL params (inicial y cambio de página)
  useEffect(() => {
    const pageParam = searchParams.get('page')
    const searchParam = searchParams.get('search')
    const page = pageParam ? parseInt(pageParam, 10) : 1

    setSearchQuery(searchParam || '')

    // Solo carga si no hay búsqueda activa (la búsqueda se maneja con el debounce)
    if (!searchParam) {
      loadPokemons(page, '')
    }
  }, [searchParams])

  // Efecto para búsqueda con debounce
  useEffect(() => {
    if (debouncedSearchQuery) {
      loadPokemons(1, debouncedSearchQuery)
    }
  }, [debouncedSearchQuery])

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

      <SearchBar onSearch={handleSearch} initialValue={searchQuery} />

      <FilterBar
        filters={filters}
        onFilterChange={setFilters}
        favoritesCount={count}
      />

      {error && (
        <div className="max-w-2xl mx-auto bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
          <svg className="w-5 h-5 text-red-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-red-800">Error al cargar</h3>
            <p className="text-sm text-red-600 mt-1">{error}</p>
          </div>
        </div>
      )}

      <main>
        {searchQuery && isLoading && (
          <div className="text-center py-4 text-gray-500 text-sm">
            Buscando &quot;{searchQuery}&quot;...
          </div>
        )}

        <PokemonGrid
          pokemons={filteredPokemons}
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

        {searchQuery && filteredPokemons.length > 0 && !isLoading && (
          <div className="text-center mt-8 text-gray-600 dark:text-gray-300">
            Se encontraron <span className="font-semibold text-blue-600 dark:text-blue-400">{filteredPokemons.length}</span> Pokémon para &quot;{searchQuery}&quot;
          </div>
        )}

        {(filters.generation || filters.favorites) && !searchQuery && filteredPokemons.length > 0 && !isLoading && (
          <div className="text-center mt-8 text-gray-600 dark:text-gray-300">
            Se encontraron <span className="font-semibold text-blue-600 dark:text-blue-400">{filteredPokemons.length}</span> Pokémon con los filtros aplicados
          </div>
        )}
      </main>
    </div>
  )
}