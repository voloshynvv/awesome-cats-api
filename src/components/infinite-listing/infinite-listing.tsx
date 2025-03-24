import { Grid } from '@chakra-ui/react';
import { Button } from '@/components/ui/button';

interface InfiniteListingProps<T> {
  entities: T[];
  render: (item: T) => React.ReactElement;
  isFetchingNextPage: boolean;
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
      <Grid gridTemplateColumns="repeat(2, 1fr)" gap="4">
        {entities.map(render)}
      </Grid>

      {hasNextPage && (
        <Button
          onClick={onNextPageClick}
          loading={isFetchingNextPage}
          disabled={isFetchingNextPage}
          display="flex"
          gap="2"
          mt="6"
          mx="auto"
        >
          {buttonName}
        </Button>
      )}
    </>
  );
};
