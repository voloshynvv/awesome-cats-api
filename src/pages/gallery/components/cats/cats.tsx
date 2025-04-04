import { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Spinner } from '@chakra-ui/react';

import { CatImage } from './cat-image';
import { CatDialog } from '../cat-dialog/cat-dialog';

import { getCatsInfiniteQueryOptions } from '@/api/cats/get-cats';
import { InfiniteListing } from '@/components/infinite-listing/infinite-listing';

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
      <InfiniteListing
        entities={cats}
        hasNextPage={catsQuery.hasNextPage}
        isFetchingNextPage={catsQuery.isFetchingNextPage}
        onNextPageClick={() => catsQuery.fetchNextPage()}
        render={(cat) => (
          <CatImage
            key={cat.id}
            src={cat.url}
            isPlaceholderData={catsQuery.isPlaceholderData}
            isLiked={Boolean(cat.favourite?.id)}
            onClick={() => setCatId(cat.id)}
          />
        )}
      />

      {selectedCat && <CatDialog cat={selectedCat} onClose={() => setCatId(null)} open={Boolean(catId)} />}
    </>
  );
};
