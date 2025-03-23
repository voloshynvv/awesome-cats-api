import { Box, Image, Heading, Text, Badge, List, Skeleton } from '@chakra-ui/react';

import { useBreed } from '@/api/breeds/get-breed';

interface BreedDetails {
  breedId: string;
}

const imageSrc = 'https://cdn2.thecatapi.com/images/ozEvzdVM-.jpg';

export const BreedDetails = ({ breedId }: BreedDetails) => {
  const { data: breed, isPending, isError } = useBreed(breedId);

  if (isPending) {
    return (
      <Box spaceY="4">
        <Skeleton aspectRatio="golden" rounded="2xl" />
        <Skeleton maxW="80" h="11" />
        <Skeleton h="7.5rem" w="full" />
      </Box>
    );
  }

  if (isError) {
    return <p>error</p>;
  }

  return (
    <Box spaceY="4">
      <Image width="100%" aspectRatio="golden" rounded="2xl" src={imageSrc} alt="todo" />

      <Box flex="1" spaceY="4">
        <Heading as="h1" textStyle="4xl">
          {breed.name}
        </Heading>

        <Text color="gray.200">{breed.description}</Text>

        <Badge>{breed.origin}</Badge>

        <List.Root variant="plain" flexDirection="row" gap="1.5" flexWrap="wrap">
          {breed.temperament.split(', ').map((trait) => (
            <List.Item key={trait}>
              <Badge colorPalette="blue">{trait}</Badge>
            </List.Item>
          ))}
        </List.Root>
      </Box>
    </Box>
  );
};
