import { useState } from 'react';
import { Button, Center, Image, Spinner, Box } from '@chakra-ui/react';

import { CustomCursor } from './custom-cursor';

import { useMousePosition } from '@/hooks/use-mouse-position';

type ButtonProps = Omit<React.ComponentPropsWithoutRef<'button'>, 'onClick' | 'onMouseEnter' | 'onMouseOut'>;

interface UploadedImageProps extends ButtonProps {
  imageSrc: string;
  source: 'favourite' | 'uploaded';
  isPending: boolean;
  onClick: () => void;
}

export const ImageWithCursor = ({ imageSrc, source, isPending, onClick, ...props }: UploadedImageProps) => {
  const [hover, setHover] = useState(false);
  const position = useMousePosition();

  const cursorActive = hover && position.x !== null && position.y !== null && !isPending;

  return (
    <>
      <Button
        unstyled
        onMouseEnter={() => setHover(true)}
        onMouseOut={() => setHover(false)}
        onClick={onClick}
        rounded="2xl"
        overflow="hidden"
        position="relative"
        _hover={{ cursor: 'none' }}
        disabled={isPending}
        {...props}
      >
        <Image src={imageSrc} w="full" alt={`${source} cat image`} aspectRatio="landscape" />

        {isPending && (
          <Box pos="absolute" inset="0" bg="bg/80">
            <Center h="full">
              <Spinner color="fg.muted" />
            </Center>
          </Box>
        )}
      </Button>

      <CustomCursor x={position.x} y={position.y} active={cursorActive} />
    </>
  );
};
