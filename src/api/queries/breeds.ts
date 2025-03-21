import { queryOptions } from '@tanstack/react-query';
import { apiClient } from '../api-client';
import { Breed } from '../types';

const getBreeds = async (search?: string) => {
  const endpoint = search ? '/breeds/search' : '/breeds';

  const response = await apiClient.get<Breed[]>(endpoint, {
    params: {
      q: search || undefined,
    },
  });
  return response.data;
};

export const getBreedsQueryOptions = (search?: string) =>
  queryOptions({
    queryKey: ['breeds', { search }],
    queryFn: () => getBreeds(search),
    // always fresh, no need for a background refetch
    staleTime: Infinity,
  });

export const getBreedQueryOptions = (breedId: string) =>
  queryOptions({
    queryKey: ['breeds', breedId],
    queryFn: async () => {
      const response = await apiClient.get<Breed>(`/breeds/${breedId}`);
      return response.data;
    },
    // always fresh, no need for a background refetch
    staleTime: Infinity,
  });
