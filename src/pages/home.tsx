import { ButtonGroup, Grid, Heading, HStack, IconButton } from '@chakra-ui/react';
import { CatImage } from '@/components/cat-image/cat-image';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getCatsQueryOptions } from '@/api/queries/cats';
import { useState } from 'react';
import { LayoutGridIcon } from 'lucide-react';
import { useSearchParams } from 'react-router';
import { CatDialog } from '@/components/cat-dialog/cat-dialog';

import { AppAsyncSelect } from '@/components/app-async-select/app-async-select';
import { getBreedsQueryOptions } from '@/api/queries/breeds';
import { AppDialog } from '@/components/app-dialog/app-dialog';

export const Home = () => {
  const [catId, setCatId] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const perPage = searchParams.get('perPage') ?? '2';
  const breedQueryString = searchParams.get('breed');
  const breedIds: string[] = [];

  if (breedQueryString) {
    breedIds.push(breedQueryString);
  }

  const { data: cats, isPlaceholderData } = useQuery({
    ...getCatsQueryOptions(breedIds),
    placeholderData: keepPreviousData,
  });

  const handlePerPageClick = (count: string) => {
    searchParams.set('perPage', count);
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

  const selectedCat = cats?.find((cat) => cat.id === catId);

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

        <ButtonGroup variant="outline">
          <IconButton onClick={() => handlePerPageClick('2')}>
            <LayoutGridIcon />
          </IconButton>

          <IconButton onClick={() => handlePerPageClick('3')}>
            <LayoutGridIcon />
          </IconButton>
        </ButtonGroup>
      </HStack>

      <Grid gridTemplateColumns={`repeat(${perPage}, 1fr)`} gap="3" opacity={isPlaceholderData ? '0.5' : '1'}>
        {cats?.map((cat) => (
          <CatImage
            key={cat.id}
            cat={cat}
            onClick={() => {
              if (!isPlaceholderData) {
                setCatId(cat.id);
              }
            }}
          />
        ))}
      </Grid>

      <CatDialog cat={selectedCat} open={Boolean(selectedCat)} onClose={() => setCatId(null)} />
    </>
  );
};
