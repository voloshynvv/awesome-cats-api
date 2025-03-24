import { Image } from '@chakra-ui/react';
import { Button } from '@/components/ui/button';
import { useMousePosition } from '@/hooks/use-mouse-position';
import { CustomCursor } from './custom-cursor';
import { useState } from 'react';

interface FavouriteImageProps {
  url: string;
  onClick: () => void;
}

export const FavouriteImage = ({ url, onClick }: FavouriteImageProps) => {
  const [active, setActive] = useState(false);
  const { position, hasHover } = useMousePosition();

  return (
    <>
      <Button
        unstyled
        onClick={onClick}
        onMouseEnter={() => setActive(true)}
        onMouseOut={() => setActive(false)}
        rounded="sm"
        overflow="hidden"
        position="relative"
        _hover={{ cursor: 'none' }}
      >
        <Image src={url} w="full" alt="favourite cat image" aspectRatio="landscape" />
      </Button>

      {hasHover && <CustomCursor x={position.x} y={position.y} active={active} />}
    </>
  );
};
