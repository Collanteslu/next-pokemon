import { useEffect, useRef, useCallback } from 'react'

interface UseInfiniteScrollOptions {
  onLoadMore: () => void
  hasMore: boolean
  isLoading: boolean
  threshold?: number
  rootMargin?: string
}

/**
 * Hook for implementing infinite scroll using Intersection Observer
 *
 * @param onLoadMore - Callback function to load more items
 * @param hasMore - Whether there are more items to load
 * @param isLoading - Whether items are currently being loaded
 * @param threshold - Intersection threshold (0-1), defaults to 1.0
 * @param rootMargin - Root margin for intersection observer, defaults to '100px'
 * @returns ref to attach to the sentinel element
 */
export function useInfiniteScroll({
  onLoadMore,
  hasMore,
  isLoading,
  threshold = 1.0,
  rootMargin = '100px',
}: UseInfiniteScrollOptions) {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0]
      if (target.isIntersecting && hasMore && !isLoading) {
        onLoadMore()
      }
    },
    [hasMore, isLoading, onLoadMore]
  )

  useEffect(() => {
    // Cleanup previous observer
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    // Create new observer
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin,
      threshold,
    }

    observerRef.current = new IntersectionObserver(handleIntersection, options)

    // Observe the sentinel element
    if (sentinelRef.current) {
      observerRef.current.observe(sentinelRef.current)
    }

    // Cleanup on unmount
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [handleIntersection, rootMargin, threshold])

  return sentinelRef
}
