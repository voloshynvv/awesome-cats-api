import { Link as RouterLink } from 'react-router';
import { Image, Box, Heading, Text, Link, Button, Spinner } from '@chakra-ui/react';
import { CloseButton } from '@/components/ui/close-button';

import { DialogRoot, DialogContent, DialogCloseTrigger } from '@/components/ui/dialog';

import { Cat } from '@/api/types';
import { useAddFavourite } from '@/api/mutation/use-add-favourite';
import { useDeleteFavourite } from '@/api/mutation/use-delete-favourite';

interface CatDialogProps {
  open: boolean;
  cat: Cat | undefined;
  onClose: () => void;
}

export const CatDialog = ({ cat, open, onClose }: CatDialogProps) => {
  const addFavourite = useAddFavourite();
  const deleteFavourite = useDeleteFavourite();

  if (!cat) return null;

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
      addFavourite.mutate(cat.id, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  return (
    <DialogRoot placement="center" open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogCloseTrigger top="0" insetEnd="-12" asChild>
          <CloseButton variant="plain" />
        </DialogCloseTrigger>

        <Image src={cat.url} alt="" aspectRatio="landscape" />

        <Box p="4" spaceY="4">
          <Heading lineHeight="1" as="h2">
            {cat.breeds[0].name}
          </Heading>

          <Text lineClamp="2">{cat.breeds[0].description}</Text>

          <Link asChild>
            <RouterLink to={`/breeds/${cat.breeds[0].id}`}>Read more</RouterLink>
          </Link>

          <div>
            <Button onClick={handleClick}>{favouriteId ? 'remove' : 'add'}</Button>
            {isPending && <Spinner />}
          </div>
        </Box>
      </DialogContent>
    </DialogRoot>
  );
};
