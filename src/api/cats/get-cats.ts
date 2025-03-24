import { infiniteQueryOptions, keepPreviousData } from '@tanstack/react-query';
import { apiClient } from '../api-client';
import { Cat } from '../types';

export const catsKey = ['cats'];
export const CATS_QUERY_LIMIT = 18;

const getCats = async (page: number, breedIds: string[]): Promise<Cat[]> => {
  const response = await apiClient.get('/images/search', {
    params: {
      limit: CATS_QUERY_LIMIT,
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
      if (lastPage.length === 0) {
        return undefined;
      }

      return lastPageParam + 1;
    },
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });
};
