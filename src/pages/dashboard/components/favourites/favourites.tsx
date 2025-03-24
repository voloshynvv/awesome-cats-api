import { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Box, HStack, Spinner, Text } from '@chakra-ui/react';

import { InfiniteListing } from '@/components/infinite-listing/infinite-listing';
import { FavouriteImage } from './favourite-image';
import { CustomCursor } from './custom-cursor';
import { EmptyScreen } from '@/components/ui/empty-screen';

import { useMousePosition } from '@/hooks/use-mouse-position';
import { getFavouritesQueryOptions } from '@/api/favourites/get-favourites';
import { useDeleteFavourite } from '@/api/favourites/delete-favourite';

export const Favourites = () => {
  const [activeId, setActiveId] = useState<number | null>(null);
  const position = useMousePosition();

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
      <HStack mb="2" gap="4">
        <Text fontStyle="italic" color="gray.200">
          Oops! Be careful — clicking on the cat image will remove it instantly <span role="img">🐱💨</span>
        </Text>

        {deleteFavouriteMutation.isPending && <Spinner color="fg.muted" />}
      </HStack>

      <InfiniteListing
        entities={favouriteCats}
        hasNextPage={favouritesQuery.hasNextPage}
        isFetchingNextPage={favouritesQuery.isFetchingNextPage}
        onNextPageClick={() => favouritesQuery.fetchNextPage()}
        render={(cat) => (
          <FavouriteImage
            key={cat.id}
            url={cat.image.url}
            onMouseEnter={() => setActiveId(cat.id)}
            onMouseOut={() => setActiveId(null)}
            isPending={deleteFavouriteMutation.isPending}
            onClick={() => deleteFavouriteMutation.mutate(cat.id)}
          />
        )}
      />

      <CustomCursor x={position.x} y={position.y} active={Boolean(activeId)} />
    </Box>
  );
};
