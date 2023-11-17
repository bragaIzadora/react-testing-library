import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Pokemon', () => {
  test('Verifica renderização do card', async () => {
    const { user } = renderWithRouter(<App />);

    const nextButton = screen.getByRole('button', { name: /Próximo pokémon/i });
    await user.click(nextButton);
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonName.textContent).toContain('Charmander');
    expect(pokemonType.textContent).toContain('Fire');
    expect(pokemonWeight.textContent).toContain('Average weight: 8.5 kg');
    expect(screen.getByAltText('Charmander sprite')).toHaveAttribute(
      'src',
      'https://archives.bulbagarden.net/media/upload/0/0a/Spr_5b_004.png',
    );
  });
  test('Verifica link more datails se existe e se ao clicar redireciona', async () => {
    const { user } = renderWithRouter(<App />);

    const nextButton = screen.getByRole('button', { name: /Próximo pokémon/i });
    // manda pro Charmander
    await user.click(nextButton);

    const moreDetails = screen.getByText('More details');
    expect(moreDetails).toHaveAttribute('href', '/pokemon/4');

    await user.click(moreDetails);
    expect(screen.getByRole('checkbox', { name: /Pokémon favoritado?/i })).toBeInTheDocument();
  });
  test('Verifica favorito', async () => {
    const { user } = renderWithRouter(<App />);

    const moreDetails = screen.getByText('More details');
    await user.click(moreDetails);

    const favorite = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
    await user.click(favorite);

    expect(screen.getByAltText('Pikachu is marked as favorite')).toHaveAttribute(
      'src',
      '/star-icon.png',
    );
  });
});
// npx stryker run ./stryker/Pokemon.conf.json
