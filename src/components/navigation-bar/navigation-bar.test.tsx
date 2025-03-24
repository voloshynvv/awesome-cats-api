import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/testing/test-utils';

import { NavigationBar } from './navigation-bar';

describe('NavigationBar', () => {
  it('renders navigation bar with 3 main links', () => {
    renderWithProviders(<NavigationBar />);

    expect(screen.getAllByRole('link')).toHaveLength(3);
  });

  it('highlighs active navigation link', () => {
    renderWithProviders(<NavigationBar />, { initialEntries: '/breeds' });

    const activeLink = screen.getByRole('link', { current: 'page' });

    expect(activeLink).toHaveTextContent(/breeds/i);
  });
});
