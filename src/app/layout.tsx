import type { Metadata } from 'next'
import './globals.css'

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  )
}
