import { Link as RouterLink } from 'react-router';
import {
  Image,
  Box,
  Heading,
  Text,
  Link,
  Spinner,
  IconButton,
  useBreakpointValue,
  DialogRootProps,
} from '@chakra-ui/react';
import { LuHeart, LuHeartCrack } from 'react-icons/lu';

import { DialogRoot, DialogContent, DialogCloseTrigger } from '@/components/ui/dialog';

import { useAddFavourite } from '@/api/favourites/add-favourite';
import { useDeleteFavourite } from '@/api/favourites/delete-favourite';
import { Cat } from '@/api/types';

interface CatDialogProps {
  open: boolean;
  cat: Cat;
  onClose: () => void;
}

export const CatDialog = ({ cat, open, onClose }: CatDialogProps) => {
  const addFavourite = useAddFavourite();
  const deleteFavourite = useDeleteFavourite();

  const dialogSize = useBreakpointValue({ base: 'full', sm: 'sm' }) as DialogRootProps['size'];

  const isPending = addFavourite.isPending || deleteFavourite.isPending;

  const favouriteId = cat.favourite?.id;

  const handleClick = () => {
    if (favouriteId) {
      deleteFavourite.mutate(favouriteId, {
        onSuccess: () => {
          onClose();
        },
      });
    } else {
      addFavourite.mutate(cat?.id ?? '', {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  return (
    <DialogRoot size={dialogSize} placement={'center'} open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogCloseTrigger
          top="2"
          variant={{ base: 'surface', md: 'ghost' }}
          md={{
            top: '0',
            insetEnd: '-12',
          }}
        />

        <Image src={cat.url} alt="cat image" aspectRatio="landscape" />

        <Box p="5" spaceY="4">
          <Heading lineHeight="1" as="h2">
            {cat.breeds[0].name}
          </Heading>

          <Text lineClamp="2">{cat.breeds[0].description}</Text>

          <Link asChild>
            <RouterLink to={`/breeds/${cat.breeds[0].id}`}>Read more</RouterLink>
          </Link>

          <IconButton display="flex" variant="outline" onClick={handleClick} disabled={isPending}>
            {isPending && <Spinner color="fg.muted" />}
            {!isPending && (favouriteId ? <LuHeartCrack /> : <LuHeart />)}
          </IconButton>
        </Box>
      </DialogContent>
    </DialogRoot>
  );
};
