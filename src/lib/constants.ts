/**
 * Constantes compartidas de la aplicación
 */

/**
 * Mapa de colores Tailwind para tipos de Pokémon
 */
export const TYPE_COLORS: Record<string, string> = {
  normal: 'bg-gray-400',
  fire: 'bg-red-500',
  water: 'bg-blue-500',
  electric: 'bg-yellow-400',
  grass: 'bg-green-500',
  ice: 'bg-cyan-400',
  fighting: 'bg-red-700',
  poison: 'bg-purple-600',
  ground: 'bg-yellow-700',
  flying: 'bg-blue-300',
  psychic: 'bg-pink-500',
  bug: 'bg-green-600',
  rock: 'bg-yellow-800',
  ghost: 'bg-purple-700',
  dragon: 'bg-indigo-600',
  dark: 'bg-gray-800',
  steel: 'bg-gray-500',
  fairy: 'bg-pink-400'
} as const

/**
 * Mapa de colores de texto para tipos de Pokémon (para contraste)
 */
export const TYPE_TEXT_COLORS: Record<string, string> = {
  normal: 'text-gray-800',
  fire: 'text-white',
  water: 'text-white',
  electric: 'text-gray-900',
  grass: 'text-white',
  ice: 'text-gray-900',
  fighting: 'text-white',
  poison: 'text-white',
  ground: 'text-white',
  flying: 'text-gray-900',
  psychic: 'text-white',
  bug: 'text-white',
  rock: 'text-white',
  ghost: 'text-white',
  dragon: 'text-white',
  dark: 'text-white',
  steel: 'text-white',
  fairy: 'text-white'
} as const

/**
 * Configuración de paginación
 */
export const PAGINATION_CONFIG = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_BUTTONS: 5
} as const

/**
 * Configuración de caché
 */
export const CACHE_CONFIG = {
  POKEMON_LIST_DURATION: 24 * 60 * 60 * 1000, // 24 horas
  KEY_PREFIX: 'pokedex_'
} as const

/**
 * Configuración de debouncing
 */
export const DEBOUNCE_CONFIG = {
  SEARCH_DELAY: 300, // ms
  INPUT_DELAY: 150 // ms
} as const

/**
 * Configuración de timeouts
 */
export const TIMEOUT_CONFIG = {
  API_REQUEST: 10000, // 10 segundos
  IMAGE_LOAD: 5000 // 5 segundos
} as const

/**
 * Mensajes de error
 */
export const ERROR_MESSAGES = {
  POKEMON_NOT_FOUND: 'No se pudo encontrar el Pokémon',
  NETWORK_ERROR: 'Error de red. Por favor verifica tu conexión',
  TIMEOUT_ERROR: 'La petición tardó demasiado. Intenta de nuevo',
  GENERAL_ERROR: 'Ocurrió un error. Por favor intenta de nuevo'
} as const

/**
 * URLs de sprites
 */
export const SPRITE_URLS = {
  BASE: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon',
  OFFICIAL_ARTWORK: (id: number | string) =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
} as const
