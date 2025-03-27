import { Box, Text } from '@chakra-ui/react';

interface CursorProps {
  x: number | null;
  y: number | null;
  active: boolean;
}

export const CustomCursor = ({ x, y, active }: CursorProps) => {
  console.log('cursor', active);

  return (
    <Box
      w="fit"
      display="flex"
      flexDir="column"
      position="fixed"
      transform="translate(-50%, -50%)"
      transformOrigin="center"
      top={`${y}px`}
      left={`${x}px`}
      scale={active ? 1 : 0}
      transition="scale 0.25s"
      alignItems="center"
      pointerEvents="none"
      zIndex="docked"
      data-testid="cursor"
    >
      <img src="/sticker.webp" width="40px" height="40px" alt="" />
      <Text color="gray.100">why?</Text>
    </Box>
  );
};
