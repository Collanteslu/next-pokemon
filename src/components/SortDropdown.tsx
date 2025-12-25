import { memo } from 'react'
import { SORT_OPTIONS, type SortOption } from '@/lib/sort'

interface SortDropdownProps {
  currentSort: SortOption
  onSortChange: (sort: SortOption) => void
}

function SortDropdown({ currentSort, onSortChange }: SortDropdownProps) {
  return (
    <div className="w-full max-w-6xl mx-auto mb-4">
      <div className="flex items-center justify-end space-x-3">
        <label
          htmlFor="sort-select"
          className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center"
        >
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
              d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
            />
          </svg>
          Ordenar:
        </label>

        <select
          id="sort-select"
          value={currentSort}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors cursor-pointer"
          aria-label="Ordenar Pokémon"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {currentSort !== 'default' && (
          <button
            onClick={() => onSortChange('default')}
            className="px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            aria-label="Restablecer ordenamiento"
            title="Restablecer"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}

export default memo(SortDropdown)
