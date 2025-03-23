import { queryOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../api-client';
import { Breed } from '../types';
import { getBreedsQueryOptions } from './get-breeds';

const getBreedById = async (breedId: string) => {
  const response = await apiClient.get<Breed>(`/breeds/${breedId}`);
  return response.data;
};

export const getBreedQueryOptions = (breedId: string) =>
  queryOptions({
    queryKey: ['breeds', breedId],
    queryFn: () => getBreedById(breedId),
    staleTime: Infinity, // always fresh
  });

export const useBreed = (breedId: string) => {
  const queryClient = useQueryClient();

  return useQuery({
    ...getBreedQueryOptions(breedId),
    initialData: () => {
      return queryClient.getQueryData(getBreedsQueryOptions().queryKey)?.find((breed) => breed.id === breedId);
    },
  });
};
