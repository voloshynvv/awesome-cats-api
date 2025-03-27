import { Grid } from '@chakra-ui/react';
import { Button } from '@/components/ui/button';

export interface InfiniteListingProps<T> {
  entities: T[];
  render: (item: T) => React.ReactElement;
  isFetchingNextPage?: boolean;
  buttonName?: string;
  onNextPageClick: () => void;
  hasNextPage: boolean;
}

export const InfiniteListing = <T,>({
  entities,
  render,
  isFetchingNextPage,
  buttonName = 'Show more',
  onNextPageClick,
  hasNextPage,
}: InfiniteListingProps<T>) => {
  return (
    <>
      <Grid gridTemplateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap="4" px={{ base: '4', md: '0' }}>
        {entities.map(render)}
      </Grid>

      {hasNextPage && (
        <Button
          onClick={onNextPageClick}
          loading={isFetchingNextPage}
          disabled={isFetchingNextPage}
          display="flex"
          gap="2"
          mt="4"
          mx="auto"
        >
          {buttonName}
        </Button>
      )}
    </>
  );
};
