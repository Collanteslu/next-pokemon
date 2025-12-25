import { useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

/**
 * Hook para sincronizar estado con URL search params
 * @param key - La key del parámetro en la URL
 * @returns [value, setValue] similar a useState pero sincronizado con URL
 */
export function useURLState(key: string): [string | null, (value: string | null) => void] {
  const router = useRouter()
  const searchParams = useSearchParams()

  const value = searchParams.get(key)

  const setValue = useCallback((newValue: string | null) => {
    const params = new URLSearchParams(searchParams.toString())

    if (newValue === null || newValue === '') {
      params.delete(key)
    } else {
      params.set(key, newValue)
    }

    const queryString = params.toString()
    router.push(queryString ? `?${queryString}` : window.location.pathname)
  }, [key, router, searchParams])

  return [value, setValue]
}

/**
 * Hook para manejar múltiples parámetros de URL
 */
export function useURLParams() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const setParams = useCallback((updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString())

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === '') {
        params.delete(key)
      } else {
        params.set(key, value)
      }
    })

    const queryString = params.toString()
    router.push(queryString ? `?${queryString}` : window.location.pathname)
  }, [router, searchParams])

  const getParam = useCallback((key: string): string | null => {
    return searchParams.get(key)
  }, [searchParams])

  return { setParams, getParam, searchParams }
}
