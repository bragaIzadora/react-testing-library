import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Pokemon Details', () => {
  test('Verifica Título, Summary e Location', async () => {
    const { user } = renderWithRouter(<App />);

    const nextButton = screen.getByRole('button', { name: /Próximo pokémon/i });
    await user.click(nextButton);

    const moreDetails = screen.getByText('More details');
    await user.click(moreDetails);

    const paragrafo = screen.getByText(/The flame on its tail shows the strength of its life force. If it is weak, the flame also burns weakly./i);

    expect(screen.getByRole('heading', { name: /Charmander Details/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Summary/i })).toBeInTheDocument();
    expect(paragrafo).toBeInTheDocument();
    expect(moreDetails).not.toBeInTheDocument();

    const locationImages = screen.getAllByAltText(/Charmander location/i);
    const imgOne = locationImages[0];

    expect(screen.getByRole('heading', { name: /Game Locations of Charmander/i })).toBeInTheDocument();
    expect(imgOne).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/9/93/Alola_Route_3_Map.png');
  });
  test('Verifica checkbox favoritar', async () => {
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
// npx stryker run ./stryker/PokemonDetails.conf.json
