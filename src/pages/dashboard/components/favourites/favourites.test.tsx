import { renderWithProviders } from '@/testing/test-utils';
import { Favourites } from './favourites';

describe('Favourites tab', () => {
  describe('with empty data', () => {});

  describe('with data', () => {
    it.todo('notifies user with a friendly message that cat will be immediately deleted', () => {
      renderWithProviders(<Favourites />);
    });

    it.todo('renders "show more" button if there is a next page');

    it.todo('hides "show more" button when there is NO next page');

    it.todo('disables all button while mutation is running');

    it.todo('loads additional cats on "show more" button click');
  });

  it.todo('deletes cat on image click');

  it.todo('loads more cats', () => {
    renderWithProviders(<Favourites />);
  });
  // renderWithProviders(<Favourites />);
});
