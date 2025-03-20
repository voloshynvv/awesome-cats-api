import { Button, Image } from '@chakra-ui/react';
import { Cat } from '@/api/types';

interface CatImageProps {
  cat: Cat;
  onClick: () => void;
}

export const CatImage = ({ cat, onClick }: CatImageProps) => {
  return (
    <Button unstyled onClick={onClick} className="group" rounded="lg" overflow="hidden" cursor="pointer">
      <Image
        _groupHover={{ scale: '1.05' }}
        _groupFocus={{ scale: '1.05' }}
        transition="scale 250ms ease"
        w="full"
        aspectRatio="landscape"
        src={cat.url}
        alt={cat.breeds[0].name}
      />
    </Button>
  );
};
