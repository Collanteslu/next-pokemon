import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import PokemonCard from '../PokemonCard'
import type { Pokemon } from '@/types'

describe('PokemonCard', () => {
  const mockPokemon: Pokemon = {
    id: 25,
    name: 'pikachu',
    url: 'https://pokeapi.co/api/v2/pokemon/25/',
  }

  it('should render pokemon name', () => {
    render(<PokemonCard pokemon={mockPokemon} />)
    expect(screen.getByText('pikachu')).toBeInTheDocument()
  })

  it('should render pokemon ID with leading zeros', () => {
    render(<PokemonCard pokemon={mockPokemon} />)
    expect(screen.getByText('#025')).toBeInTheDocument()
  })

  it('should have accessible button with aria-label', () => {
    render(<PokemonCard pokemon={mockPokemon} />)
    const button = screen.getByRole('button', { name: /ver detalles de pikachu/i })
    expect(button).toBeInTheDocument()
  })

  it('should call onClick when clicked', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()

    render(<PokemonCard pokemon={mockPokemon} onClick={handleClick} />)

    const button = screen.getByRole('button', { name: /ver detalles de pikachu/i })
    await user.click(button)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should handle pokemon with ID from URL', () => {
    const pokemon = {
      id: 1,
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon/1/',
    }

    render(<PokemonCard pokemon={pokemon} />)
    expect(screen.getByText('#001')).toBeInTheDocument()
  })
})
