import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemon } from '../pages';

describe('Favorite Pokémon', () => {
  test('mensagem caso não tenha favorito', () => {
    renderWithRouter(<FavoritePokemon pokemonList={ [] } />);

    expect(screen.getByText('No favorite Pokémon found')).toBeInTheDocument();
  });

  test('Apenas Pokémon favoritados', () => {
  });
});

// npx stryker run ./stryker/FavoritePokemon.conf.json
// test('', () => {});
