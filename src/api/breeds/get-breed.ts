import { queryOptions } from '@tanstack/react-query';
import { apiClient } from '../api-client';
import { Breed } from '../types';

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
