import { useSearchParams } from 'react-router';
import { Box, Heading } from '@chakra-ui/react';

import { Cats } from './components/cats/cats';
import { AppAsyncSelect } from '@/components/app-async-select/app-async-select';

import { getBreedsQueryOptions } from '@/api/breeds/get-breeds';

export const Gallery = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const breedId = searchParams.get('breed');
  const breedIds = breedId ? [breedId] : [];

  const handleSelectValueChange = (breeds: string[]) => {
    if (breeds.length > 0) {
      searchParams.set('breed', breeds[0]);
    } else {
      searchParams.delete('breed');
    }

    setSearchParams(searchParams);
  };

  return (
    <>
      <Heading mb="8" textStyle="2xl">
        Explore <span role="img">✨</span>
      </Heading>

      <Box mb="4">
        <AppAsyncSelect
          placeholder="Pick a breed"
          value={breedIds}
          onValueChange={handleSelectValueChange}
          queryOptions={getBreedsQueryOptions()}
          itemToValue={(breed) => breed.id}
          itemToString={(breed) => breed.name}
        />
      </Box>

      <Cats breedIds={breedIds} />
    </>
  );
};
