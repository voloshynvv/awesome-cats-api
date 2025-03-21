import { ButtonGroup, Heading, HStack, IconButton, useStatStyles } from '@chakra-ui/react';
import { LayoutGridIcon } from 'lucide-react';
import { useSearchParams } from 'react-router';

import { AppAsyncSelect } from '@/components/app-async-select/app-async-select';
import { getBreedsQueryOptions } from '@/api/queries/breeds';
import { CatsListing } from '@/components/cats-listing/cats-listing';

export const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const perColumn = searchParams.get('perColumn') ?? '2';
  const breedId = searchParams.get('breed');
  const breedIds = breedId ? [breedId] : [];

  const handlePerColumnClick = (count: string) => {
    searchParams.set('perColumn', count);
    setSearchParams(searchParams);
  };

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
      <Heading mb="8">
        Explore <span role="img">✨</span>
      </Heading>

      <HStack mb="2">
        <AppAsyncSelect
          placeholder="Pick a breed"
          value={breedIds}
          onValueChange={handleSelectValueChange}
          queryOptions={getBreedsQueryOptions()}
          itemToValue={(breed) => breed.id}
          itemToString={(breed) => breed.name}
        />

        <ButtonGroup variant="outline" hideBelow="md">
          <IconButton onClick={() => handlePerColumnClick('2')}>
            <LayoutGridIcon />
          </IconButton>

          <IconButton onClick={() => handlePerColumnClick('3')}>
            <LayoutGridIcon />
          </IconButton>
        </ButtonGroup>
      </HStack>

      <CatsListing perColumn={perColumn} breedIds={breedIds} />
    </>
  );
};
