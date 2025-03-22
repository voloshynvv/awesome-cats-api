import { useState } from 'react';
import { Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';

import { Button, Heading, HStack, Text, Skeleton } from '@chakra-ui/react';
import { SearchPopover } from './components/search-popover/search-popover';

import { getRandomInteger } from '@/utils/get-random-interger';
import { getBreedsQueryOptions } from '@/api/queries/breeds';

const MIN_SKELETON_WIDTH = 60;
const MAX_SKELETON_WIDTH = 140;

export const Breeds = () => {
  const [search, setSearch] = useState('');

  const { data: breeds, isPending, isError, isSuccess } = useQuery(getBreedsQueryOptions(search));

  const skeleton = Array.from({ length: 56 }, (_, i) => (
    <Skeleton key={i} w={getRandomInteger(MIN_SKELETON_WIDTH, MAX_SKELETON_WIDTH) + 'px'} h="32px" />
  ));

  return (
    <>
      <HStack mb="8">
        <Heading alignSelf="flex-start">Breeds</Heading>
        <SearchPopover onSubmit={setSearch} />
      </HStack>

      {search && isSuccess && (
        <Text textStyle="sm" mb="2">
          Found results: {breeds?.length}
        </Text>
      )}

      <HStack wrap="wrap">
        {isPending && skeleton}

        {isError && <p>Something went wrong</p>}

        {breeds?.map((breed) => (
          <Button key={breed.id} _hover={{ transform: 'translateY(-1px)' }} transition="transform" size="xs" asChild>
            <Link to={`/breeds/${breed.id}`}>{breed.name}</Link>
          </Button>
        ))}
      </HStack>
    </>
  );
};
