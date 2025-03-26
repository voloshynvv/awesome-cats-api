import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/testing/test-utils';
import userEvent from '@testing-library/user-event';

import { Dashboard } from './dashboard';

describe('Dashboard page', () => {
  it('renders tabs with default selected state correctly', async () => {
    renderWithProviders(<Dashboard />);

    const favTabTrigger = screen.getByRole('tab', {
      name: /favourites/i,
      selected: true,
    });
    const uploadsTabTrigger = screen.getByRole('tab', {
      name: /your uploads/i,
    });
    const uploadTabTrigger = screen.getByRole('tab', {
      name: 'Upload',
    });

    expect(favTabTrigger).toBeInTheDocument();
    expect(uploadsTabTrigger).toBeInTheDocument();
    expect(uploadTabTrigger).toBeInTheDocument();
  });

  it('can navigate through all tabs', async () => {
    renderWithProviders(<Dashboard />);

    const favTabTrigger = screen.getByRole('tab', {
      name: /favourites/i,
      selected: true,
    });
    const uploadsTabTrigger = screen.getByRole('tab', {
      name: /your uploads/i,
    });
    const uploadTabTrigger = screen.getByRole('tab', {
      name: 'Upload',
    });

    await userEvent.click(uploadsTabTrigger);
    expect(uploadsTabTrigger).toHaveAttribute('aria-selected', 'true');

    await userEvent.click(uploadTabTrigger);
    expect(uploadTabTrigger).toHaveAttribute('aria-selected', 'true');

    await userEvent.click(favTabTrigger);
    expect(favTabTrigger).toHaveAttribute('aria-selected', 'true');
  });
});
