import { useCat } from '@/api/queries/cats';
import { Heading, Image, Text, Box, Button, HStack, Link, DialogCloseTrigger } from '@chakra-ui/react';
import { DialogRoot, DialogContent } from '../ui/dialog';
import { CloseButton } from '../ui/close-button';
import { Link as RouterLink } from 'react-router';

interface CatDialogProps {
  catId: string;
  breedIds: string[];
  onClose: () => void;
}

export const CatDialog = ({ catId, breedIds, onClose }: CatDialogProps) => {
  const { data: cat, isSuccess } = useCat(catId, breedIds);

  if (!cat || !isSuccess) return null;

  return (
    <DialogRoot placement="center" open={Boolean(catId)} onOpenChange={onClose}>
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

          <HStack>
            <Button>Like</Button>
            <Button>Dislike</Button>
          </HStack>
        </Box>
      </DialogContent>
    </DialogRoot>
  );
};
