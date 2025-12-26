/**
 * Type effectiveness multipliers for Pokemon battles
 * Based on official Pokemon type chart
 */

export type PokemonType =
  | 'normal' | 'fire' | 'water' | 'electric' | 'grass' | 'ice'
  | 'fighting' | 'poison' | 'ground' | 'flying' | 'psychic' | 'bug'
  | 'rock' | 'ghost' | 'dragon' | 'dark' | 'steel' | 'fairy'

export type Effectiveness = 0 | 0.5 | 1 | 2

/**
 * Type effectiveness chart
 * Key: attacking type, Value: map of defending types to effectiveness multiplier
 */
export const TYPE_EFFECTIVENESS: Record<PokemonType, Partial<Record<PokemonType, Effectiveness>>> = {
  normal: {
    rock: 0.5,
    ghost: 0,
    steel: 0.5,
  },
  fire: {
    fire: 0.5,
    water: 0.5,
    grass: 2,
    ice: 2,
    bug: 2,
    rock: 0.5,
    dragon: 0.5,
    steel: 2,
  },
  water: {
    fire: 2,
    water: 0.5,
    grass: 0.5,
    ground: 2,
    rock: 2,
    dragon: 0.5,
  },
  electric: {
    water: 2,
    electric: 0.5,
    grass: 0.5,
    ground: 0,
    flying: 2,
    dragon: 0.5,
  },
  grass: {
    fire: 0.5,
    water: 2,
    grass: 0.5,
    poison: 0.5,
    ground: 2,
    flying: 0.5,
    bug: 0.5,
    rock: 2,
    dragon: 0.5,
    steel: 0.5,
  },
  ice: {
    fire: 0.5,
    water: 0.5,
    grass: 2,
    ice: 0.5,
    ground: 2,
    flying: 2,
    dragon: 2,
    steel: 0.5,
  },
  fighting: {
    normal: 2,
    ice: 2,
    poison: 0.5,
    flying: 0.5,
    psychic: 0.5,
    bug: 0.5,
    rock: 2,
    ghost: 0,
    dark: 2,
    steel: 2,
    fairy: 0.5,
  },
  poison: {
    grass: 2,
    poison: 0.5,
    ground: 0.5,
    rock: 0.5,
    ghost: 0.5,
    steel: 0,
    fairy: 2,
  },
  ground: {
    fire: 2,
    electric: 2,
    grass: 0.5,
    poison: 2,
    flying: 0,
    bug: 0.5,
    rock: 2,
    steel: 2,
  },
  flying: {
    electric: 0.5,
    grass: 2,
    fighting: 2,
    bug: 2,
    rock: 0.5,
    steel: 0.5,
  },
  psychic: {
    fighting: 2,
    poison: 2,
    psychic: 0.5,
    dark: 0,
    steel: 0.5,
  },
  bug: {
    fire: 0.5,
    grass: 2,
    fighting: 0.5,
    poison: 0.5,
    flying: 0.5,
    psychic: 2,
    ghost: 0.5,
    dark: 2,
    steel: 0.5,
    fairy: 0.5,
  },
  rock: {
    fire: 2,
    ice: 2,
    fighting: 0.5,
    ground: 0.5,
    flying: 2,
    bug: 2,
    steel: 0.5,
  },
  ghost: {
    normal: 0,
    psychic: 2,
    ghost: 2,
    dark: 0.5,
  },
  dragon: {
    dragon: 2,
    steel: 0.5,
    fairy: 0,
  },
  dark: {
    fighting: 0.5,
    psychic: 2,
    ghost: 2,
    dark: 0.5,
    fairy: 0.5,
  },
  steel: {
    fire: 0.5,
    water: 0.5,
    electric: 0.5,
    ice: 2,
    rock: 2,
    steel: 0.5,
    fairy: 2,
  },
  fairy: {
    fire: 0.5,
    fighting: 2,
    poison: 0.5,
    dragon: 2,
    dark: 2,
    steel: 0.5,
  },
}

/**
 * Get effectiveness of an attacking type against defending types
 */
export function getTypeEffectiveness(
  attackingType: string,
  defendingTypes: string[]
): number {
  const attacking = attackingType.toLowerCase() as PokemonType
  let effectiveness = 1

  for (const defendingType of defendingTypes) {
    const defending = defendingType.toLowerCase() as PokemonType
    const multiplier = TYPE_EFFECTIVENESS[attacking]?.[defending] ?? 1
    effectiveness *= multiplier
  }

  return effectiveness
}

/**
 * Get weaknesses for given types (types that deal 2x or more damage)
 */
export function getWeaknesses(types: string[]): PokemonType[] {
  const weaknesses: Set<PokemonType> = new Set()

  const allTypes: PokemonType[] = [
    'normal', 'fire', 'water', 'electric', 'grass', 'ice',
    'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
    'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
  ]

  for (const attackingType of allTypes) {
    const effectiveness = getTypeEffectiveness(attackingType, types)
    if (effectiveness >= 2) {
      weaknesses.add(attackingType)
    }
  }

  return Array.from(weaknesses)
}

/**
 * Get resistances for given types (types that deal 0.5x or less damage)
 */
export function getResistances(types: string[]): PokemonType[] {
  const resistances: Set<PokemonType> = new Set()

  const allTypes: PokemonType[] = [
    'normal', 'fire', 'water', 'electric', 'grass', 'ice',
    'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
    'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
  ]

  for (const attackingType of allTypes) {
    const effectiveness = getTypeEffectiveness(attackingType, types)
    if (effectiveness > 0 && effectiveness <= 0.5) {
      resistances.add(attackingType)
    }
  }

  return Array.from(resistances)
}

/**
 * Get immunities for given types (types that deal 0x damage)
 */
export function getImmunities(types: string[]): PokemonType[] {
  const immunities: Set<PokemonType> = new Set()

  const allTypes: PokemonType[] = [
    'normal', 'fire', 'water', 'electric', 'grass', 'ice',
    'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
    'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
  ]

  for (const attackingType of allTypes) {
    const effectiveness = getTypeEffectiveness(attackingType, types)
    if (effectiveness === 0) {
      immunities.add(attackingType)
    }
  }

  return Array.from(immunities)
}
