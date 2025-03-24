import { Image } from '@chakra-ui/react';
import { Button } from '@/components/ui/button';

interface FavouriteImageProps extends React.ComponentProps<'button'> {
  url: string;
  isPending: boolean;
}

export const FavouriteImage = ({ url, isPending, ...props }: FavouriteImageProps) => {
  return (
    <Button
      unstyled
      rounded="sm"
      overflow="hidden"
      w="full"
      position="relative"
      _hover={{ cursor: 'none' }}
      disabled={isPending}
      {...props}
    >
      <Image src={url} alt="favourite cat image" aspectRatio="landscape" />
    </Button>
  );
};
