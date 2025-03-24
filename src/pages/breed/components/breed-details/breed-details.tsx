import { Box, Heading, Text, Badge, List, Skeleton, Spinner, Flex } from '@chakra-ui/react';

import { useBreed } from '@/api/breeds/get-breed';

interface BreedDetails {
  breedId: string;
}

export const BreedDetails = ({ breedId }: BreedDetails) => {
  const { data: breed, isPending, isError } = useBreed(breedId);

  if (isPending) {
    return (
      <Flex height="11" alignItems="center">
        <Spinner />
      </Flex>
    );
    return <Skeleton h="44px" />;
  }

  if (isError) {
    return <p>error</p>;
  }

  console.log(breed);

  return (
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
  );
};
