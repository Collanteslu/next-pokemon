import { renderHook, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { useDebounce } from '../useDebounce'

describe('useDebounce', () => {
  it('should return initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('test', 500))
    expect(result.current).toBe('test')
  })

  it('should debounce value changes', async () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: 'initial' } }
    )

    expect(result.current).toBe('initial')

    // Cambiar el valor
    rerender({ value: 'updated' })

    // El valor no debe cambiar inmediatamente
    expect(result.current).toBe('initial')

    // Después del delay, debe actualizarse
    await waitFor(() => {
      expect(result.current).toBe('updated')
    }, { timeout: 500 })
  })

  it('should handle multiple rapid changes', async () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 200),
      { initialProps: { value: 'first' } }
    )

    // Cambios rápidos
    rerender({ value: 'second' })
    rerender({ value: 'third' })
    rerender({ value: 'fourth' })

    // Solo el último valor debe persistir después del debounce
    await waitFor(() => {
      expect(result.current).toBe('fourth')
    }, { timeout: 400 })
  })

  it('should work with different types', async () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 200),
      { initialProps: { value: 123 } }
    )

    expect(result.current).toBe(123)

    rerender({ value: 456 })

    await waitFor(() => {
      expect(result.current).toBe(456)
    }, { timeout: 400 })
  })
})
