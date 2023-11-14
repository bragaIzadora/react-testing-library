import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemon } from '../pages';
import App from '../App';

describe('Favorite Pokémon', () => {
  test('mensagem caso não tenha favorito', () => {
    renderWithRouter(<FavoritePokemon pokemonList={ [] } />);

    expect(screen.getByText('No favorite Pokémon found')).toBeInTheDocument();
  });

  test('Apenas Pokémon favoritados', async () => {
    const { user } = renderWithRouter(<App />);

    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    await user.click(moreDetailsLink);

    const checkbox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    await user.click(checkbox);

    const favoriteLink = screen.getByRole('link', { name: /favorite pokémon/i });
    await user.click(favoriteLink);

    const pokemonNameElement = screen.getByTestId('pokemon-name');
    expect(pokemonNameElement.textContent).toContain('Pikachu');
  });
});

// npx stryker run ./stryker/FavoritePokemon.conf.json
// test('', () => {});
