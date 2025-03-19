import { queryOptions } from '@tanstack/react-query';
import { apiClient } from '../api-client';
import { Cat } from '../types';

export const catsKey = ['cats'];

export const getCatsQueryOptions = (breedIds: string[]) =>
  queryOptions({
    queryKey: [...catsKey, { breeds: breedIds }],
    queryFn: async () => {
      const response = await apiClient.get<Cat[]>('/images/search', {
        params: {
          limit: 12,
          has_breeds: 1,
          breed_ids: breedIds.join(','),
          sub_id: 'my-user-id',
        },
      });
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
  });

export const getFavouritesQueryOptions = () =>
  queryOptions({
    queryKey: ['favourites'],
    queryFn: async () => {
      const response = await apiClient.get('/favourites', {
        params: {
          sub_id: 'my-user-id',
        },
      });
      return response.data;
    },
  });
