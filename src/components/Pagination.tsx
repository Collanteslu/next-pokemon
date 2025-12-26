'use client'

import { memo } from 'react'
import { useRouter } from 'next/navigation'
import type { PaginationInfo } from '@/types'

interface PaginationProps {
  pagination: PaginationInfo
  currentPage: number
  onPageChange: (page: number) => void
}

function Pagination({ pagination, currentPage, onPageChange }: PaginationProps) {
  const router = useRouter()

  const handlePageChange = (page: number) => {
    const url = new URL(window.location.href)
    if (page === 1) {
      url.searchParams.delete('page')
    } else {
      url.searchParams.set('page', page.toString())
    }
    router.push(url.toString())
    onPageChange(page)
  }

  const renderPageNumbers = () => {
    const { totalPages } = pagination
    const pages = []
    
    let startPage = Math.max(1, currentPage - 2)
    const endPage = Math.min(totalPages, startPage + 4)
    
    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4)
    }

    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50"
          aria-label="Ir a la página 1"
        >
          1
        </button>
      )
      
      if (startPage > 2) {
        pages.push(
          <span key="ellipsis-start" className="px-3 py-2 text-sm text-gray-500">
            ...
          </span>
        )
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      const isCurrentPage = i === currentPage
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-2 text-sm font-medium ${
            isCurrentPage
              ? 'z-10 bg-blue-500 text-white border-blue-500'
              : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-50'
          } border`}
          aria-label={`Ir a la página ${i}`}
          aria-current={isCurrentPage ? 'page' : undefined}
        >
          {i}
        </button>
      )
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="ellipsis-end" className="px-3 py-2 text-sm text-gray-500">
            ...
          </span>
        )
      }
      
      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50"
          aria-label={`Ir a la página ${totalPages}`}
        >
          {totalPages}
        </button>
      )
    }

    return pages
  }

  return (
    <nav className="flex items-center justify-center space-x-2 mt-8" aria-label="Paginación">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={!pagination.hasPrevPage}
        className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Página anterior"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {renderPageNumbers()}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={!pagination.hasNextPage}
        className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Página siguiente"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </nav>
  )
}

// Memoizar el componente para evitar re-renders innecesarios
export default memo(Pagination)