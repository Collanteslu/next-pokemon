'use client'

import { useState, useEffect } from 'react'

type Theme = 'light' | 'dark'

const THEME_KEY = 'pokedex_theme'

/**
 * Hook para manejar dark mode con persistencia en localStorage
 * @returns [theme, toggleTheme, setTheme]
 */
export function useDarkMode(): [Theme, () => void, (theme: Theme) => void] {
  // Inicializar con tema del sistema o guardado
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'light'

    const savedTheme = localStorage.getItem(THEME_KEY) as Theme | null
    if (savedTheme) return savedTheme

    // Detectar preferencia del sistema
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  // Aplicar tema al documento
  useEffect(() => {
    const root = document.documentElement

    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }

    // Guardar en localStorage
    localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  // Escuchar cambios del sistema
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = (e: MediaQueryListEvent) => {
      // Solo cambiar si no hay preferencia guardada
      const savedTheme = localStorage.getItem(THEME_KEY)
      if (!savedTheme) {
        setTheme(e.matches ? 'dark' : 'light')
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return [theme, toggleTheme, setTheme]
}
