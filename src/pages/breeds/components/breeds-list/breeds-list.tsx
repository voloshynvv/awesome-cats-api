import { Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { Button, HStack, Skeleton, Text } from '@chakra-ui/react';

import { getBreedsQueryOptions } from '@/api/breeds/get-breeds';
import { getRandomInteger } from '@/utils/get-random-interger';

const MIN_SKELETON_WIDTH = 85;
const MAX_SKELETON_WIDTH = 160;

interface BreedsListProps {
  search?: string;
}

export const BreedsList = ({ search = '' }: BreedsListProps) => {
  const { data: breeds, isPending, isError, isSuccess } = useQuery(getBreedsQueryOptions(search));

  const skeleton = Array.from({ length: 56 }, (_, i) => (
    <Skeleton
      data-testid="skeleton"
      key={i}
      w={getRandomInteger(MIN_SKELETON_WIDTH, MAX_SKELETON_WIDTH) + 'px'}
      h="9"
    />
  ));

  if (isError) {
    return <p>Something went wrong</p>;
  }

  return (
    <>
      {search && isSuccess && (
        <Text textStyle="sm" mb="2">
          Found results: {breeds?.length}
        </Text>
      )}

      <HStack wrap="wrap">
        {isPending && skeleton}

        {breeds?.map((breed) => (
          <Button key={breed.id} _hover={{ transform: 'translateY(-1px)' }} transition="transform" size="sm" asChild>
            <Link to={`/breeds/${breed.id}`}>{breed.name}</Link>
          </Button>
        ))}
      </HStack>
    </>
  );
};
