import { getRequestConfig } from 'next-intl/server'
import { notFound } from 'next/navigation'

// Idiomas soportados
export const locales = ['es', 'en'] as const
export type Locale = typeof locales[number]

export const defaultLocale: Locale = 'es'

export default getRequestConfig(async ({ locale }) => {
  // Validar que el locale sea válido
  if (!locale || !locales.includes(locale as Locale)) {
    notFound()
  }

  const validLocale = locale as Locale

  return {
    locale: validLocale,
    messages: (await import(`./messages/${validLocale}.json`)).default
  }
})
