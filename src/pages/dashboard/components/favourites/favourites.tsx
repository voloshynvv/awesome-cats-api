import { useInfiniteQuery } from '@tanstack/react-query';
import { Box, Spinner, Text } from '@chakra-ui/react';

import { InfiniteListing } from '@/components/infinite-listing/infinite-listing';
import { EmptyScreen } from '@/components/ui/empty-screen';

import { getFavouritesQueryOptions } from '@/api/favourites/get-favourites';
import { useDeleteFavourite } from '@/api/favourites/delete-favourite';
import { ImageWithCursor } from '../image-with-cursor/image-with-cursor';

export const Favourites = () => {
  const favouritesQuery = useInfiniteQuery(getFavouritesQueryOptions());
  const deleteFavouriteMutation = useDeleteFavourite();

  if (favouritesQuery.isPending) {
    return <Spinner color="fg.muted" />;
  }

  if (favouritesQuery.isError) {
    return <p>error</p>;
  }

  const favouriteCats = favouritesQuery.data.pages.flat();

  if (!favouriteCats.length) {
    return <EmptyScreen title="No Favorites Yet" description="Your favorite cats will show up here!" />;
  }

  return (
    <Box>
      <Text mb="2" fontStyle="italic" color="gray.200">
        Oops! Be careful — clicking on the cat image will remove it instantly
        <span aria-hidden role="img">
          🐱💨
        </span>
      </Text>

      <InfiniteListing
        entities={favouriteCats}
        hasNextPage={favouritesQuery.hasNextPage}
        isFetchingNextPage={favouritesQuery.isFetchingNextPage}
        onNextPageClick={() => favouritesQuery.fetchNextPage()}
        render={(cat) => (
          <ImageWithCursor
            key={cat.id}
            imageSrc={cat.image.url}
            source="favourite"
            disabled={deleteFavouriteMutation.isPending}
            isPending={deleteFavouriteMutation.isPending && cat.id === deleteFavouriteMutation.variables}
            onClick={() => deleteFavouriteMutation.mutate(cat.id)}
          />
        )}
      />
    </Box>
  );
};
