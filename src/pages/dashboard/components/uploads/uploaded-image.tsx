import { Button, Image, Tag } from '@chakra-ui/react';

interface UploadedImageProps {
  id: string;
  url: string;
  onClick: () => void;
  isPending: boolean;
}

export const UploadedImage = ({ id, url, onClick, isPending }: UploadedImageProps) => {
  return (
    <article>
      <Button unstyled cursor="pointer" onClick={onClick} disabled={isPending} textAlign="left">
        <Image src={url} alt="uploaded cat image" aspectRatio="landscape" rounded="sm" mb="1" w="full" />
      </Button>

      <Tag.Root>
        <Tag.Label>awesome cat {id}</Tag.Label>
      </Tag.Root>
    </article>
  );
};
