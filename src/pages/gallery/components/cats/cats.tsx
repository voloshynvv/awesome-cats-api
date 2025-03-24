import { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Spinner, Grid } from '@chakra-ui/react';

import { CatImage } from './cat-image';
import { CatDialog } from '../cat-dialog/cat-dialog';
import { Button } from '@/components/ui/button';

import { getCatsInfiniteQueryOptions } from '@/api/cats/get-cats';

interface CatsProps {
  breedIds: string[];
}

export const Cats = ({ breedIds }: CatsProps) => {
  const [catId, setCatId] = useState<string | null>(null);

  const catsQuery = useInfiniteQuery(getCatsInfiniteQueryOptions(breedIds));

  if (catsQuery.isPending) {
    return <Spinner color="fg.muted" />;
  }

  if (catsQuery.isError) {
    return <p>Error</p>;
  }

  const cats = catsQuery.data.pages.flat();
  const selectedCat = cats.find((cat) => cat.id === catId);

  return (
    <>
      <Grid gridTemplateColumns={{ sm: 'repeat(2, 1fr)' }} gap="4">
        {cats.map((cat) => (
          <CatImage key={cat.id} src={cat.url} isLiked={Boolean(cat.favourite?.id)} onClick={() => setCatId(cat.id)} />
        ))}
      </Grid>

      <Button
        onClick={() => catsQuery.fetchNextPage()}
        disabled={!catsQuery.hasNextPage || catsQuery.isFetchingNextPage}
        loading={catsQuery.isFetchingNextPage}
        mx="auto"
        display="flex"
        mt="4"
      >
        Load More
      </Button>

      <CatDialog cat={selectedCat} onClose={() => setCatId(null)} open={Boolean(catId)} />
    </>
  );
};
