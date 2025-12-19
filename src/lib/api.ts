import { Pokemon, PokemonListResponse, PokemonDetails, PokemonSpecies, PaginationInfo } from '@/types';

const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';

export class PokemonAPI {
  private static async fetchWithErrorHandling<T>(url: string): Promise<T> {
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
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

  static async searchPokemonByName(name: string): Promise<Pokemon[]> {
    if (!name.trim()) return [];
    
    try {
      const url = `${POKEAPI_BASE_URL}/pokemon?limit=1000`;
      const data = await this.fetchWithErrorHandling<PokemonListResponse>(url);
      
      return data.results.filter(pokemon =>
        pokemon.name.toLowerCase().includes(name.toLowerCase())
      );
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