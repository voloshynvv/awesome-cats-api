import { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { CATS_QUERY_LIMIT, getCatsInfiniteQueryOptions } from '@/api/queries/cats';
import { Button, Grid, Spinner } from '@chakra-ui/react';

import { CatDialog } from '@/components/cat-dialog/cat-dialog';
import { CatImage } from './cat-image';

interface CatsListingProps {
  perColumn: string;
  breedIds: string[];
}

export const CatsListing = ({ perColumn, breedIds }: CatsListingProps) => {
  const [catId, setCatId] = useState<string | null>(null);

  const catsQuery = useInfiniteQuery(getCatsInfiniteQueryOptions(breedIds));

  if (catsQuery.isPending) {
    return <p>loading...</p>;
  }

  if (catsQuery.isError) {
    return <p>Error!</p>;
  }

  const cats = catsQuery.data.pages.flat();

  const selectedCat = cats.find((cat) => cat.id === catId);

  const lastPage = catsQuery.data.pages[catsQuery.data.pages.length - 1];

  const shouldShowLoadMore = lastPage.length >= CATS_QUERY_LIMIT;

  return (
    <div>
      <Grid
        gridTemplateColumns={`repeat(${perColumn}, 1fr)`}
        gap="3"
        opacity={catsQuery.isPlaceholderData ? '0.5' : '1'}
      >
        {cats.map((cat) => (
          <CatImage
            key={cat.id}
            cat={cat}
            onClick={() => {
              setCatId(cat.id);
            }}
          />
        ))}
      </Grid>

      {shouldShowLoadMore && (
        <Button
          display="flex"
          alignItems="center"
          mt="4"
          mx="auto"
          disabled={!catsQuery.hasNextPage || catsQuery.isFetchingNextPage}
          onClick={() => catsQuery.fetchNextPage()}
        >
          Load more
          {catsQuery.isFetchingNextPage && <Spinner />}
        </Button>
      )}

      <CatDialog open={Boolean(selectedCat)} cat={selectedCat} onClose={() => setCatId(null)} />
    </div>
  );
};
