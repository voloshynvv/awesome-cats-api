import { queryOptions } from '@tanstack/react-query';
import { apiClient } from '../api-client';
import { Breed } from '../types';

export const getBreedsQueryOptions = () =>
  queryOptions({
    queryKey: ['breeds'],
    queryFn: async () => {
      const response = await apiClient.get<Breed[]>('/breeds');
      return response.data;
    },
    // up-to-date, no need for a background refetch
    staleTime: Infinity,
  });

export const getBreedQueryOptions = (breedId: string) =>
  queryOptions({
    queryKey: ['breeds', breedId],
    queryFn: async () => {
      const response = await apiClient.get<Breed>(`/breeds/${breedId}`);
      return response.data;
    },
    // up-to-date, no need for a background refetch
    staleTime: Infinity,
  });
