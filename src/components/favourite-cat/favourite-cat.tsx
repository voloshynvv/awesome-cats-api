import { Box, Button, Center, Spinner, Image } from '@chakra-ui/react';

import { useDeleteFavourite } from '@/api/mutation/use-delete-favourite';

interface FavouriteCatProps {
  cat: any;
  onMouseEnter: () => void;
  onMouseOut: () => void;
}

export const FavouriteCat = ({ cat, onMouseOut, onMouseEnter }: FavouriteCatProps) => {
  const deleteFavourite = useDeleteFavourite();

  return (
    <Button
      unstyled
      rounded="sm"
      overflow="hidden"
      w="full"
      position="relative"
      _hover={{ cursor: 'none' }}
      disabled={deleteFavourite.isPending}
      onMouseOut={onMouseOut}
      onMouseEnter={onMouseEnter}
      onClick={() => deleteFavourite.mutate(cat.id)}
    >
      {deleteFavourite.isPending && (
        <Box pos="absolute" inset="0" bg="bg/80">
          <Center h="full">
            <Spinner />
          </Center>
        </Box>
      )}

      <Image src={cat.image.url} aspectRatio="landscape" alt="" />
    </Button>
  );
};
