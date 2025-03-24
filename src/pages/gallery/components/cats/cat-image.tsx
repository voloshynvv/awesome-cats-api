import { Button, Image } from '@chakra-ui/react';

interface CatImageProps {
  url: string;
  onClick: () => void;
}

export const CatImage = ({ url, onClick }: CatImageProps) => {
  return (
    <Button unstyled onClick={onClick} className="group" rounded="lg" overflow="hidden" cursor="pointer">
      <Image
        _groupHover={{ scale: '1.05' }}
        _groupFocus={{ scale: '1.05' }}
        transition="scale 250ms ease"
        w="full"
        aspectRatio="landscape"
        src={url}
        alt="cat image"
      />
    </Button>
  );
};
