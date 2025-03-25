import { infiniteQueryOptions, keepPreviousData } from '@tanstack/react-query';
import { apiClient } from '../api-client';
import { Cat } from '../types';
import { LIMIT } from '../constants';

const getCats = async (page: number, breedIds: string[]): Promise<Cat[]> => {
  const response = await apiClient.get('/images/search', {
    params: {
      limit: LIMIT,
      has_breeds: 1,
      breed_ids: breedIds.join(','),
      sub_id: 'my-user-id',
      page,
    },
  });
  return response.data;
};

export const getCatsInfiniteQueryOptions = (breedIds: string[] = []) => {
  return infiniteQueryOptions({
    queryKey: ['cats', { breeds: breedIds }],
    queryFn: ({ pageParam }) => getCats(pageParam, breedIds),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.length < LIMIT) {
        return undefined;
      }

      return lastPageParam + 1;
    },
    placeholderData: keepPreviousData,
  });
};
