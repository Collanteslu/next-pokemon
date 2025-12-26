import createMiddleware from 'next-intl/middleware'
import { locales, defaultLocale } from './src/i18n'

export default createMiddleware({
  // Lista de locales soportados
  locales,

  // Locale por defecto
  defaultLocale,

  // Estrategia de detección de locale
  localeDetection: true,
})

export const config = {
  // Coincidir con todas las rutas excepto archivos estáticos y APIs
  matcher: ['/', '/(es|en)/:path*']
}
