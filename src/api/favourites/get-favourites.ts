import { infiniteQueryOptions } from '@tanstack/react-query';
import { apiClient } from '../api-client';
import { FavouriteCat } from '../types';
import { LIMIT } from '../constants';
import { sessionId } from '../user-session';

const getFavourites = async (page: number): Promise<FavouriteCat[]> => {
  const response = await apiClient.get('/favourites', {
    params: {
      sub_id: sessionId,
      page,
      limit: LIMIT,
      order: 'DESC',
    },
  });
  return response.data;
};

export const getFavouritesQueryOptions = () =>
  infiniteQueryOptions({
    queryKey: ['favourites'],
    queryFn: ({ pageParam }) => getFavourites(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.length < LIMIT) {
        return undefined;
      }

      return lastPageParam + 1;
    },
  });
