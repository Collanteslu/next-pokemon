import type { Metadata } from 'next'
import { ReactNode } from 'react'
import ThemeToggle from '@/components/ThemeToggle'
import ErrorBoundary from '@/components/ErrorBoundary'
import '../globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Pokédex',
    template: '%s | Pokédex'
  },
  description: 'Explora el mundo de los Pokémon con nuestra Pokédex interactiva. Busca, filtra y descubre información detallada sobre todos los Pokémon.',
  keywords: ['pokemon', 'pokedex', 'pokemon go', 'pokemon cards', 'pokemon types'],
  authors: [{ name: 'Pokédex Team' }],
  openGraph: {
    title: 'Pokédex - Explora el Mundo Pokémon',
    description: 'Descubre información detallada sobre todos los Pokémon en nuestra Pokédex interactiva.',
    type: 'website',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pokédex - Explora el Mundo Pokémon',
    description: 'Descubre información detallada sobre todos los Pokémon.',
  },
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="font-sans min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 antialiased">
        <ErrorBoundary>
          <ThemeToggle />
          <div className="container mx-auto px-4 py-8">
            {children}
          </div>
        </ErrorBoundary>
      </body>
    </html>
  )
}
