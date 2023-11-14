import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Not Found', () => {
  test('Verifica se existe h2', () => {
    renderWithRouter(<App />, { route: '/notfound' });

    expect(screen.getByRole('heading', { name: /page requested not found/i })).toBeInTheDocument();
  });
  test('Verifica se tem imagem', () => {
    renderWithRouter(<App />, { route: '/notfound' });

    const phrase = "Clefairy pushing buttons randomly with text I have no idea what i'm doing";

    expect(screen.getByAltText(phrase)).toHaveAttribute('src', '/404.gif');
  });
});
// npx stryker run ./stryker/NotFound.conf.json
