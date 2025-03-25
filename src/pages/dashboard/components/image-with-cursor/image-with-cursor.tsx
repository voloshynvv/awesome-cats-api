import { useMousePosition } from '@/hooks/use-mouse-position';
import { Button, Image } from '@chakra-ui/react';
import { useState } from 'react';
import { CustomCursor } from './custom-cursor';

type ButtonProps = Omit<React.ComponentPropsWithoutRef<'button'>, 'onClick' | 'onMouseEnter' | 'onMouseOut'>;

interface UploadedImageProps extends ButtonProps {
  imageSrc: string;
  source: 'favourite' | 'uploaded';
  onClick: () => void;
}

export const ImageWithCursor = ({ imageSrc, source, onClick, ...props }: UploadedImageProps) => {
  const [active, setActive] = useState(false);
  const { position, hasHover } = useMousePosition();

  return (
    <>
      <Button
        unstyled
        onMouseEnter={() => setActive(true)}
        onMouseOut={() => setActive(false)}
        onClick={onClick}
        rounded="2xl"
        overflow="hidden"
        position="relative"
        _hover={{ cursor: 'none' }}
        {...props}
      >
        <Image src={imageSrc} w="full" alt={`${source} cat image`} aspectRatio="landscape" />
      </Button>

      {hasHover && <CustomCursor x={position.x} y={position.y} active={active} />}
    </>
  );
};
