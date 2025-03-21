import { Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';

import { Button, Heading, HStack, Skeleton } from '@chakra-ui/react';

import { getRandomInteger } from '@/utils/get-random-interger';
import { getBreedsQueryOptions } from '@/api/queries/breeds';

const MIN_SKELETON_WIDTH = 60;
const MAX_SKELETON_WIDTH = 140;

export const Breeds = () => {
  const { data: breeds, isPending, isError } = useQuery(getBreedsQueryOptions());

  const skeleton = Array.from({ length: 40 }, (_, i) => (
    <Skeleton key={i} w={getRandomInteger(MIN_SKELETON_WIDTH, MAX_SKELETON_WIDTH) + 'px'} h="32px" />
  ));

  return (
    <>
      <Heading mb="8">Breeds</Heading>

      <HStack wrap="wrap">
        {isPending && skeleton}

        {isError && <p>Something went wrong</p>}

        {breeds?.map((breed) => (
          <Button key={breed.id} size="xs" asChild>
            <Link to={`/breeds/${breed.id}`}>{breed.name}</Link>
          </Button>
        ))}
      </HStack>
    </>
  );
};
