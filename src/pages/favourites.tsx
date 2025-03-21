import { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

import { Box, Button, Heading, Grid, Text } from '@chakra-ui/react';
import { Cursor } from '@/components/cursor/cursor';
import { FavouriteCat } from '@/components/favourite-cat/favourite-cat';

import { useMousePosition } from '@/hooks/use-mouse-position';
import { getFavouritesQueryOptions } from '@/api/queries/cats';

export const Favourites = () => {
  const [activeId, setActiveId] = useState<number | null>(null);
  const position = useMousePosition();

  const favouritesQuery = useInfiniteQuery(getFavouritesQueryOptions());

  if (favouritesQuery.isPending) {
    return (
      <FavouritesLayout>
        <p>Loading...</p>
      </FavouritesLayout>
    );
  }

  if (favouritesQuery.isError) {
    return (
      <FavouritesLayout>
        <p>err...</p>
      </FavouritesLayout>
    );
  }

  const favourites = favouritesQuery.data.pages.flat();

  return (
    <FavouritesLayout>
      <Grid gridTemplateColumns="repeat(2, 1fr)" gap="10">
        {favourites.map((cat) => (
          <Box key={cat.id}>
            <FavouriteCat cat={cat} onMouseEnter={() => setActiveId(cat.id)} onMouseOut={() => setActiveId(null)} />
          </Box>
        ))}
      </Grid>

      <Button display="block" mx="auto" mt="5" onClick={() => favouritesQuery.fetchNextPage()}>
        Go next
      </Button>

      <Cursor x={position.x} y={position.y} active={Boolean(activeId)} />
    </FavouritesLayout>
  );
};

const FavouritesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box>
      <Heading as="h1">
        Your favourite <span role="img">⭐️</span>
      </Heading>
      <Text>Click in order to delete</Text>

      {children}
    </Box>
  );
};
