import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/testing/test-utils';
import { InfiniteListing, InfiniteListingProps } from './infinite-listing';

const renderComponent = (props: Omit<InfiniteListingProps<unknown>, 'entities' | 'render'>) => {
  renderWithProviders(
    <InfiniteListing
      {...props}
      entities={[
        { id: 1, name: 'entity 1' },
        { id: 2, name: 'entity 2' },
        { id: 3, name: 'entity 3' },
      ]}
      render={(obj) => (
        <article data-testid="item" key={obj.id}>
          {obj.name}
        </article>
      )}
    />,
  );
};

describe('InfiniteListing', () => {
  it('renders the default button label when no custom label is provided', () => {
    renderComponent({ hasNextPage: true, onNextPageClick: () => {} });

    expect(screen.getByRole('button', { name: /show more/i })).toBeInTheDocument();
  });

  it('renders a custom button label when provided', () => {
    renderComponent({ hasNextPage: true, onNextPageClick: () => {}, buttonName: 'Load More' });

    expect(screen.getByRole('button', { name: /load more/i })).toBeInTheDocument();
  });

  it('does not render the button if there are no more pages to load', () => {
    renderComponent({ hasNextPage: false, onNextPageClick: () => {} });

    expect(screen.queryByRole('button', { name: /show more/i })).not.toBeInTheDocument();
  });

  it('renders all provided entities', () => {
    renderComponent({ hasNextPage: true, onNextPageClick: () => {} });

    expect(screen.getAllByTestId('item')).toHaveLength(3);
  });

  it('disables the button while loading the next page', () => {
    renderComponent({ hasNextPage: true, isFetchingNextPage: true, onNextPageClick: () => {} });

    expect(screen.getByRole('button', { name: /show more/i })).toBeDisabled();
  });
});
