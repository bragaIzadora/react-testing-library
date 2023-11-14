import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('App', () => {
  test('texto nos links', () => {
    renderWithRouter(<App />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Favorite Pokémon')).toBeInTheDocument();
  });

  test('redireciona para about ao clicar no link home', async () => {
    const { user } = renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', { name: /home/i });
    await user.click(linkHome);
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  test('redireciona para about ao clicar no link about', async () => {
    const { user } = renderWithRouter(<App />);

    const linkAbout = screen.getByRole('link', { name: /about/i });
    await user.click(linkAbout);
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  test('redireciona para about ao clicar no link favorite', async () => {
    const { user } = renderWithRouter(<App />);

    const favoriteLink = screen.getByRole('link', { name: /favorite pokémon/i });
    await user.click(favoriteLink);
    expect(favoriteLink).toBeInTheDocument();
  });

  test('redireciona para about ao clicar no link notfound', () => {
    renderWithRouter(<App />, { route: '/notfound' });

    expect(screen.getByText('Page requested not found')).toBeInTheDocument();
  });
});
// npx stryker run ./stryker/App.conf.json
// test('', () => {

// });
