import { Image, Tag } from '@chakra-ui/react';
import { Button } from '@/components/ui/button';

interface CatImageProps {
  src: string;
  isLiked: boolean;
  isPlaceholderData: boolean;
  onClick: () => void;
}

export const CatImage = ({ src, onClick, isLiked, isPlaceholderData }: CatImageProps) => {
  return (
    <Button
      unstyled
      onClick={onClick}
      disabled={isPlaceholderData}
      className="group"
      rounded="2xl"
      overflow="hidden"
      position="relative"
      opacity={isPlaceholderData ? '0.5' : '1'}
    >
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
