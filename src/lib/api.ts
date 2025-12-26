import { Pokemon, PokemonListResponse, PokemonDetails, PokemonSpecies, PaginationInfo } from '@/types';
import { getPokemonListFromCache, savePokemonListToCache, searchPokemonInCache } from './cache';
import { TIMEOUT_CONFIG } from './constants';

const POKEAPI_BASE_URL = process.env.NEXT_PUBLIC_POKEAPI_BASE_URL || 'https://pokeapi.co/api/v2';
const REQUEST_TIMEOUT = process.env.NEXT_PUBLIC_REQUEST_TIMEOUT
  ? parseInt(process.env.NEXT_PUBLIC_REQUEST_TIMEOUT, 10)
  : TIMEOUT_CONFIG.API_REQUEST;

export class PokemonAPI {
  private static async fetchWithErrorHandling<T>(url: string, timeout: number = REQUEST_TIMEOUT): Promise<T> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('Request timeout - Please try again');
        }
      }
      console.error('API Error:', error);
      throw error;
    }
  }

  static async getPokemonList(page: number = 1, limit: number = 20): Promise<{
    pokemons: Pokemon[];
    pagination: PaginationInfo;
  }> {
    const offset = (page - 1) * limit;
    const url = `${POKEAPI_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`;
    
    const data = await this.fetchWithErrorHandling<PokemonListResponse>(url);
    
    const totalPokemons = data.count;
    const totalPages = Math.ceil(totalPokemons / limit);
    
    return {
      pokemons: data.results,
      pagination: {
        currentPage: page,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  }

  /**
   * Búsqueda optimizada de Pokémon por nombre
   * Estrategia:
   * 1. Intenta búsqueda directa si el nombre es exacto
   * 2. Usa caché local si está disponible
   * 3. Descarga lista completa solo si no hay caché (y la guarda)
   */
  static async searchPokemonByName(name: string): Promise<Pokemon[]> {
    if (!name.trim()) return [];

    const searchQuery = name.toLowerCase().trim();

    try {
      // Estrategia 1: Intenta búsqueda directa (para nombres exactos)
      try {
        const directResult = await this.fetchWithErrorHandling<PokemonDetails>(
          `${POKEAPI_BASE_URL}/pokemon/${searchQuery}`
        );
        // Si encontró coincidencia exacta, retorna como lista
        return [{
          id: directResult.id,
          name: directResult.name,
          url: `${POKEAPI_BASE_URL}/pokemon/${directResult.id}/`
        }];
      } catch {
        // No es una coincidencia exacta, continúa con búsqueda parcial
      }

      // Estrategia 2: Busca en caché local
      const cachedResults = searchPokemonInCache(searchQuery);
      if (cachedResults) {
        return cachedResults.slice(0, 20); // Limita a 20 resultados
      }

      // Estrategia 3: Descarga lista completa y guarda en caché
      const url = `${POKEAPI_BASE_URL}/pokemon?limit=1000`;
      const data = await this.fetchWithErrorHandling<PokemonListResponse>(url);

      // Guarda en caché para futuras búsquedas
      savePokemonListToCache(data.results);

      // Filtra y retorna resultados
      const filtered = data.results.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchQuery)
      );

      return filtered.slice(0, 20); // Limita a 20 resultados
    } catch (error) {
      console.error('Search error:', error);
      return [];
    }
  }

  static async getPokemonDetails(id: number | string): Promise<PokemonDetails> {
    const url = `${POKEAPI_BASE_URL}/pokemon/${id}`;
    return this.fetchWithErrorHandling<PokemonDetails>(url);
  }

  static async getPokemonSpecies(id: number | string): Promise<PokemonSpecies> {
    const url = `${POKEAPI_BASE_URL}/pokemon-species/${id}`;
    return this.fetchWithErrorHandling<PokemonSpecies>(url);
  }

  static async getPokemonWithSpecies(id: number | string): Promise<{
    details: PokemonDetails;
    species: PokemonSpecies;
  }> {
    const [details, species] = await Promise.all([
      this.getPokemonDetails(id),
      this.getPokemonSpecies(id),
    ]);

    return { details, species };
  }
}

export const pokemonAPI = PokemonAPI;