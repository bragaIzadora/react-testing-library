import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { About } from '../pages';

describe('About', () => {
  test('Heading', () => {
    renderWithRouter(<About />);

    expect(screen.getByRole('heading', { name: /about pokédex/i })).toBeInTheDocument();
  });
  test('Paragráfo', () => {
    renderWithRouter(<About />);

    const paragraph1 = screen.getByText(
      'This application simulates a Pokédex, a digital encyclopedia containing all Pokémon.',
    );
    const paragraph2 = screen.getByText(
      'One can filter Pokémon by type, and see more details for each one of them.',
    );

    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
  });
  test('Imagem', () => {
    renderWithRouter(<About />);

    expect(screen.getByAltText('Pokédex')).toHaveAttribute(
      'src',
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
// npx stryker run ./stryker/About.conf.json
