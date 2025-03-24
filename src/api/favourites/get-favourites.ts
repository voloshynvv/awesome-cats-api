import { infiniteQueryOptions } from '@tanstack/react-query';
import { apiClient } from '../api-client';
import { FavouriteCat } from '../types';

const getFavourites = async (page: number): Promise<FavouriteCat[]> => {
  const response = await apiClient.get('/favourites', {
    params: {
      sub_id: 'my-user-id',
      page,
      limit: 12, // FIX!!
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
      if (lastPage.length === 0) {
        return undefined;
      }

      return lastPageParam + 1;
    },
  });
