import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Pokedex', () => {
  test('Verifica se tem H2', () => {
    renderWithRouter(<App />);

    expect(screen.getByRole('heading', { name: /Encountered Pokémon/i }));
  });
  test('Verifica botão de passar próximo pokémon', async () => {
    const { user } = renderWithRouter(<App />);

    const pokemonName = screen.getByTestId('pokemon-name');
    const button = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(pokemonName.textContent).toContain('Pikachu');
    await user.click(button);
    expect(pokemonName.textContent).toContain('Charmander');
    await user.click(button);
  });
  test('Verifa se só tem um pokemon por vez', async () => {
    const { user } = renderWithRouter(<App />);

    const pokemonName = screen.getByTestId('pokemon-name');
    const button = screen.getByRole('button', { name: /Próximo pokémon/i });

    expect(pokemonName.textContent).toContain('Pikachu');
    await user.click(button);
    expect(pokemonName.textContent).not.toContain('Pikachu');
  });
  test('Verifica se tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const filterButtons = screen.getAllByTestId('pokemon-type-button');

    expect(filterButtons.length).toBe(7);
  });
  test('Verifica se tem botão reset', async () => {
    const { user } = renderWithRouter(<App />);

    const reset = screen.getByRole('button', { name: /all/i });
    const fire = screen.getByRole('button', { name: /fire/i });

    await user.click(fire);
    const firePokemon = await screen.findByText(/charmander/i);
    expect(firePokemon).toBeInTheDocument();

    await user.click(reset);
    const electricPokemon = await screen.findByText(/pikachu/i);
    expect(electricPokemon).toBeInTheDocument();
  });
});
// npx stryker run ./stryker/Pokedex.conf.json
