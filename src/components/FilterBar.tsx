import { memo } from 'react'
import { GENERATIONS } from '@/lib/filters'
import type { PokemonFilters } from '@/lib/filters'

interface FilterBarProps {
  filters: PokemonFilters
  onFilterChange: (filters: PokemonFilters) => void
  favoritesCount: number
}

function FilterBar({ filters, onFilterChange, favoritesCount }: FilterBarProps) {
  return (
    <div className="w-full max-w-6xl mx-auto mb-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          Filtros
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Filtro por Generación */}
          <div>
            <label
              htmlFor="generation-filter"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Generación
            </label>
            <select
              id="generation-filter"
              value={filters.generation || ''}
              onChange={(e) =>
                onFilterChange({
                  ...filters,
                  generation: e.target.value ? parseInt(e.target.value) : undefined,
                })
              }
              className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
            >
              <option value="">Todas las generaciones</option>
              {GENERATIONS.map((gen) => (
                <option key={gen.id} value={gen.id}>
                  Gen {gen.id} - {gen.name} (#{gen.range[0]}-{gen.range[1]})
                </option>
              ))}
            </select>
          </div>

          {/* Toggle Favoritos */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Favoritos ({favoritesCount})
            </label>
            <button
              onClick={() =>
                onFilterChange({
                  ...filters,
                  favorites: !filters.favorites,
                })
              }
              className={`w-full px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                filters.favorites
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
              aria-pressed={filters.favorites}
            >
              {filters.favorites ? (
                <span className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                  Solo Favoritos
                </span>
              ) : (
                'Mostrar Favoritos'
              )}
            </button>
          </div>

          {/* Botón Limpiar Filtros */}
          <div className="flex items-end">
            <button
              onClick={() =>
                onFilterChange({
                  search: filters.search,
                })
              }
              disabled={!filters.generation && !filters.favorites}
              className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              Limpiar Filtros
            </button>
          </div>
        </div>

        {/* Indicadores de filtros activos */}
        {(filters.generation || filters.favorites) && (
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Filtros activos:</span>
            {filters.generation && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                {GENERATIONS.find(g => g.id === filters.generation)?.name}
                <button
                  onClick={() => onFilterChange({ ...filters, generation: undefined })}
                  className="ml-2 hover:text-blue-600 dark:hover:text-blue-300"
                  aria-label="Quitar filtro de generación"
                >
                  ×
                </button>
              </span>
            )}
            {filters.favorites && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200">
                Favoritos
                <button
                  onClick={() => onFilterChange({ ...filters, favorites: false })}
                  className="ml-2 hover:text-red-600 dark:hover:text-red-300"
                  aria-label="Quitar filtro de favoritos"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default memo(FilterBar)
