import { infiniteQueryOptions } from '@tanstack/react-query';
import { apiClient } from '../api-client';
import { UploadedCat } from '../types';
import { LIMIT } from '../constants';

const getUploads = async (page: number) => {
  const response = await apiClient.get<UploadedCat[]>('/images', {
    params: {
      page,
      limit: LIMIT,
      sub_id: 'my-user-id',
      user_id: 'my-user-id',
    },
  });
  return response.data;
};

export const getUploadsInfiniteQueryOptions = () => {
  return infiniteQueryOptions({
    queryKey: ['uploads'],
    queryFn: ({ pageParam }) => getUploads(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.length < LIMIT) {
        return undefined;
      }

      return lastPageParam + 1;
    },
  });
};
