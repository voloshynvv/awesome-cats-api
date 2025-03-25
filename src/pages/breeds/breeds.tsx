import { useState } from 'react';
import { Heading, HStack } from '@chakra-ui/react';

import { SearchPopover } from './components/search-popover/search-popover';
import { BreedsList } from './components/breeds-list/breeds-list';

export const Breeds = () => {
  const [search, setSearch] = useState('');

  return (
    <>
      <HStack mb="8">
        <Heading pt="2px" alignSelf="flex-start" textStyle="2xl">
          Breeds
        </Heading>

        <SearchPopover onSubmit={setSearch} />
      </HStack>

      <BreedsList search={search} />
    </>
  );
};
