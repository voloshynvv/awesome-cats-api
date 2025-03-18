import { queryOptions } from '@tanstack/react-query';
import { apiClient } from '../api-client';
import { Cat } from '../types';

export const getCatsQueryOptions = (breedIds: string[]) =>
  queryOptions({
    queryKey: ['cats', breedIds],
    queryFn: async () => {
      const response = await apiClient.get<Cat[]>('/images/search', {
        params: {
          limit: 12,
          has_breeds: 1,
          breed_ids: breedIds.join(','),
        },
      });

      return response.data;
    },
    staleTime: 1000 * 60 * 5,
  });

export const getCatQueryOptions = (catId: string) =>
  queryOptions({
    queryKey: ['cats', catId],
    queryFn: async () => {
      const response = await apiClient.get<Cat>(`/images/${catId}`);
      return response.data;
    },

    staleTime: 1000 * 60 * 5,
  });
