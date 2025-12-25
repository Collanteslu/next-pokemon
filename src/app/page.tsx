'use client'

import { useState, useEffect, useMemo } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { pokemonAPI } from '@/lib/api'
import { Pokemon, PaginationInfo, PokemonDetails } from '@/types'
import { useDebounce } from '@/hooks/useDebounce'
import { useFavorites } from '@/hooks/useFavorites'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { applyFilters } from '@/lib/filters'
import { sortPokemons, type SortOption } from '@/lib/sort'
import SearchBar from '@/components/SearchBar'
import PokemonGrid from '@/components/PokemonGrid'
import Pagination from '@/components/Pagination'
import FilterBar from '@/components/FilterBar'
import SortDropdown from '@/components/SortDropdown'
import ShareFavoritesButton from '@/components/ShareFavoritesButton'
import PokemonCardSkeleton from '@/components/PokemonCardSkeleton'
import PokemonComparator from '@/components/PokemonComparator'

export default function HomePage() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [pagination, setPagination] = useState<PaginationInfo | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<{ generation?: number; favorites?: boolean; search?: string }>({})
  const [infiniteScrollMode, setInfiniteScrollMode] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortOption, setSortOption] = useState<SortOption>('default')
  const [compareMode, setCompareMode] = useState(false)
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([])
  const [comparePokemon1, setComparePokemon1] = useState<PokemonDetails | null>(null)
  const [comparePokemon2, setComparePokemon2] = useState<PokemonDetails | null>(null)
  const [showComparator, setShowComparator] = useState(false)

  const searchParams = useSearchParams()
  const router = useRouter()
  const { favorites, count, importFromURL } = useFavorites()

  // Debounce de la búsqueda para evitar llamadas excesivas al API
  const debouncedSearchQuery = useDebounce(searchQuery, 300)

  // Aplicar filtros y ordenamiento a los pokemons
  const filteredPokemons = useMemo(() => {
    const filtered = applyFilters(pokemons, filters, favorites)
    return sortPokemons(filtered, sortOption)
  }, [pokemons, filters, favorites, sortOption])

  const loadPokemons = async (page: number = 1, search: string = '', append: boolean = false) => {
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
        if (append) {
          setPokemons((prev) => [...prev, ...result.pokemons])
        } else {
          setPokemons(result.pokemons)
        }
        setPagination(result.pagination)
        setCurrentPage(page)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al cargar los Pokémon'
      console.error('Error loading pokemons:', error)
      setError(errorMessage)
      if (!append) {
        setPokemons([])
        setPagination(null)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const loadMore = () => {
    if (pagination?.hasNextPage && !isLoading && !searchQuery) {
      loadPokemons(currentPage + 1, '', true)
    }
  }

  // Efecto para cargar favoritos desde URL (solo una vez al montar)
  useEffect(() => {
    const favoritesParam = searchParams.get('favorites')
    if (favoritesParam) {
      const ids = favoritesParam.split(',').map(id => parseInt(id.trim(), 10)).filter(id => !isNaN(id))
      if (ids.length > 0) {
        importFromURL(ids)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

    if (!pokemonId) return

    if (compareMode) {
      // In compare mode, select/deselect for comparison
      setSelectedForCompare(prev => {
        if (prev.includes(pokemonId)) {
          // Deselect
          return prev.filter(id => id !== pokemonId)
        } else if (prev.length < 2) {
          // Select (max 2)
          return [...prev, pokemonId]
        }
        return prev
      })
    } else {
      // Normal mode, navigate to detail
      router.push(`/pokemon/${pokemonId}`)
    }
  }

  const handleToggleCompareMode = () => {
    setCompareMode(!compareMode)
    if (compareMode) {
      // Exiting compare mode, reset selections
      setSelectedForCompare([])
      setComparePokemon1(null)
      setComparePokemon2(null)
      setShowComparator(false)
    }
  }

  const handleCloseComparator = () => {
    setShowComparator(false)
    setSelectedForCompare([])
    setComparePokemon1(null)
    setComparePokemon2(null)
    setCompareMode(false)
  }

  // Effect to load Pokemon details when 2 are selected
  useEffect(() => {
    const loadComparePokemons = async () => {
      if (selectedForCompare.length === 2) {
        try {
          const [details1, details2] = await Promise.all([
            pokemonAPI.getPokemonDetails(selectedForCompare[0]),
            pokemonAPI.getPokemonDetails(selectedForCompare[1]),
          ])
          setComparePokemon1(details1)
          setComparePokemon2(details2)
          setShowComparator(true)
        } catch (error) {
          console.error('Error loading Pokemon for comparison:', error)
        }
      }
    }

    loadComparePokemons()
  }, [selectedForCompare])

  const handlePageChange = (page: number) => {
    loadPokemons(page, searchQuery)
  }

  const handleToggleScrollMode = () => {
    setInfiniteScrollMode(!infiniteScrollMode)
    if (!infiniteScrollMode) {
      // Switching to infinite scroll: reset to page 1
      setPokemons([])
      setCurrentPage(1)
      loadPokemons(1, searchQuery)
    }
  }

  // Use infinite scroll hook
  const sentinelRef = useInfiniteScroll({
    onLoadMore: loadMore,
    hasMore: pagination?.hasNextPage ?? false,
    isLoading,
    threshold: 0.5,
    rootMargin: '200px',
  })

  return (
    <div className="space-y-8">
      <header className="text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-blue-500">
          Pokédex
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Explora el fascinante mundo de los Pokémon. Descubre información detallada sobre todas las criaturas.
        </p>
        <div className="flex justify-center">
          <ShareFavoritesButton />
        </div>
      </header>

      <SearchBar onSearch={handleSearch} initialValue={searchQuery} />

      <FilterBar
        filters={filters}
        onFilterChange={setFilters}
        favoritesCount={count}
      />

      <SortDropdown
        currentSort={sortOption}
        onSortChange={setSortOption}
      />

      {/* Toggle buttons */}
      <div className="flex justify-center gap-4 flex-wrap">
        {/* Compare mode toggle */}
        <button
          onClick={handleToggleCompareMode}
          className={`inline-flex items-center px-4 py-2 border-2 rounded-lg transition-all font-medium ${
            compareMode
              ? 'bg-purple-500 border-purple-500 text-white shadow-lg'
              : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:border-purple-500 dark:hover:border-purple-400 text-gray-700 dark:text-gray-300'
          }`}
          aria-label={compareMode ? 'Salir del modo comparación' : 'Activar modo comparación'}
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
          {compareMode ? `Comparar (${selectedForCompare.length}/2)` : 'Modo Comparación'}
        </button>

        {/* Infinite scroll toggle */}
        {!searchQuery && (
          <button
            onClick={handleToggleScrollMode}
            className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors text-gray-700 dark:text-gray-300 font-medium"
            aria-label={infiniteScrollMode ? 'Cambiar a paginación' : 'Cambiar a scroll infinito'}
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {infiniteScrollMode ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              )}
            </svg>
            {infiniteScrollMode ? 'Modo Paginación' : 'Modo Scroll Infinito'}
          </button>
        )}
      </div>

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
          isLoading={isLoading && !infiniteScrollMode}
          compareMode={compareMode}
          selectedForCompare={selectedForCompare}
        />

        {/* Infinite scroll sentinel and loading indicator */}
        {infiniteScrollMode && !searchQuery && (
          <>
            <div ref={sentinelRef} className="h-20" aria-hidden="true" />
            {isLoading && pagination?.hasNextPage && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6">
                {Array.from({ length: 10 }).map((_, index) => (
                  <PokemonCardSkeleton key={`loading-more-${index}`} />
                ))}
              </div>
            )}
            {!pagination?.hasNextPage && pokemons.length > 0 && (
              <div className="text-center mt-8 py-4 text-gray-600 dark:text-gray-400">
                <svg
                  className="w-12 h-12 mx-auto mb-2 text-gray-400 dark:text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="font-medium">¡Has visto todos los Pokémon!</p>
              </div>
            )}
          </>
        )}

        {/* Regular pagination */}
        {!infiniteScrollMode && pagination && !searchQuery && pokemons.length > 0 && (
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

      {/* Pokemon Comparator Modal */}
      {showComparator && (
        <PokemonComparator
          pokemon1={comparePokemon1}
          pokemon2={comparePokemon2}
          onClose={handleCloseComparator}
        />
      )}
    </div>
  )
}