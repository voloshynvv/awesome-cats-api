import { Image, Tag } from '@chakra-ui/react';
import { Button } from '@/components/ui/button';

interface CatImageProps {
  src: string;
  onClick: () => void;
  isLiked: boolean;
}

export const CatImage = ({ src, onClick, isLiked }: CatImageProps) => {
  return (
    <Button unstyled onClick={onClick} className="group" rounded="sm" overflow="hidden" position="relative">
      <Image
        _groupHover={{ scale: '1.05' }}
        _groupFocusVisible={{ scale: '1.05' }}
        transition="scale 250ms ease"
        w="full"
        aspectRatio="landscape"
        src={src}
        alt="cat image"
      />

      {isLiked && (
        <Tag.Root size="sm" colorPalette="green" position="absolute" top="1" right="2">
          <Tag.Label>Liked</Tag.Label>
        </Tag.Root>
      )}
    </Button>
  );
};
