import { infiniteQueryOptions } from '@tanstack/react-query';
import { apiClient } from '../api-client';
import { UploadedCat } from '../types';
import { LIMIT } from '../constants';
import { sessionId } from '../user-session';

const getUploads = async (page: number): Promise<UploadedCat[]> => {
  const response = await apiClient.get('/images', {
    params: {
      page,
      limit: LIMIT,
      sub_id: sessionId,
      user_id: sessionId,
      order: 'DESC',
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
