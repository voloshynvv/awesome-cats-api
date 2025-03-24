import { Button, Image } from '@chakra-ui/react';

interface UploadedImageProps {
  url: string;
  onClick: () => void;
  isPending: boolean;
}

export const UploadedImage = ({ url, onClick, isPending }: UploadedImageProps) => {
  return (
    <Button
      unstyled
      onClick={onClick}
      disabled={isPending}
      aspectRatio="landscape"
      textAlign="left"
      rounded="sm"
      overflow="hidden"
      w="full"
    >
      <Image src={url} alt="uploaded cat image" w="full" h="full" />
    </Button>
  );
};
