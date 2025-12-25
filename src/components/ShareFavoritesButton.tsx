'use client'

import { memo, useState } from 'react'
import { useFavorites } from '@/hooks/useFavorites'

function ShareFavoritesButton() {
  const { exportToURL, count } = useFavorites()
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const favoritesIds = exportToURL()
    if (!favoritesIds) {
      alert('No tienes favoritos para compartir')
      return
    }

    const shareURL = `${window.location.origin}/?favorites=${favoritesIds}`

    // Try Web Share API first (mobile)
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Mis Pokémon Favoritos',
          text: `¡Mira mis ${count} Pokémon favoritos!`,
          url: shareURL,
        })
        return
      } catch (err) {
        // User cancelled or error, fall through to clipboard
        if ((err as Error).name !== 'AbortError') {
          console.error('Error sharing:', err)
        }
      }
    }

    // Fallback: Copy to clipboard
    try {
      await navigator.clipboard.writeText(shareURL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Error copying to clipboard:', err)
      // Final fallback: show URL in alert
      alert(`Copia este enlace para compartir:\n${shareURL}`)
    }
  }

  if (count === 0) return null

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-md hover:shadow-lg"
      aria-label="Compartir favoritos"
    >
      <svg
        className="w-5 h-5 mr-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        {copied ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
          />
        )}
      </svg>
      {copied ? '¡Enlace copiado!' : `Compartir Favoritos (${count})`}
    </button>
  )
}

export default memo(ShareFavoritesButton)
