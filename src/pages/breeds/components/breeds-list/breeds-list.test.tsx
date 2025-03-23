import { http, HttpResponse } from 'msw';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/testing/test-utils';
import { mswBaseURL } from '@/testing/mocks/handlers';
import { server } from '@/testing/mocks/node';

import { BreedsList } from './breeds-list';

describe('BreedsList', () => {
  describe('without search', () => {
    it('successful breeds query', async () => {
      renderWithProviders(<BreedsList />);

      expect(screen.getByTestId('skeletons')).toBeInTheDocument();

      const breedLink = await screen.findByRole('link', { name: 'breed name 1' });

      expect(breedLink).toBeInTheDocument();
      expect(breedLink).toHaveAttribute('href', '/breeds/id1');

      expect(screen.queryByText(/found results/)).not.toBeInTheDocument();
    });

    it('failed breed query', async () => {
      server.use(
        http.get(mswBaseURL('/breeds'), () => {
          return new HttpResponse(null, { status: 500 });
        }),
      );

      renderWithProviders(<BreedsList />);

      const error = await screen.findByText(/something went wrong/i);

      expect(error).toBeInTheDocument();

      expect(screen.queryByText(/found results/)).not.toBeInTheDocument();
    });
  });

  describe('with search', () => {
    it.only('renders results count', async () => {
      renderWithProviders(<BreedsList search="breeds" />);

      const foundResultsCount = await screen.findByText(/found results/i);

      expect(foundResultsCount).toBeInTheDocument();
    });
  });
});
