import { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

import { CatDialog } from '@/components/cat-dialog/cat-dialog';
import { CatImage } from './cat-image';
import { InfiniteListing } from '@/components/infinite-listing/infinite-listing';
import { getCatsInfiniteQueryOptions } from '@/api/cats/get-cats';

interface CatsListingProps {
  // perColumn: string;
  breedIds: string[];
}

export const CatsListing = ({ breedIds }: CatsListingProps) => {
  const [catId, setCatId] = useState<string | null>(null);

  const catsQuery = useInfiniteQuery(getCatsInfiniteQueryOptions(breedIds));

  if (catsQuery.isPending) {
    return <p>loading...</p>;
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
        render={(cat) => <CatImage key={cat.id} url={cat.url} onClick={() => setCatId(cat.id)} />}
        hasNextPage={catsQuery.hasNextPage}
        isFetchingNextPage={catsQuery.isFetchingNextPage}
        onNextPageClick={() => catsQuery.fetchNextPage()}
      />

      <CatDialog open={Boolean(selectedCat)} cat={selectedCat} onClose={() => setCatId(null)} />
    </>
  );
};
