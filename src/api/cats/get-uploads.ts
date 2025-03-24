import { infiniteQueryOptions, keepPreviousData } from '@tanstack/react-query';
import { apiClient } from '../api-client';
import { UploadedCat } from '../types';

const getUploads = async (page: number) => {
  const response = await apiClient.get<UploadedCat[]>('/images', {
    params: {
      page,
      limit: 12,
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
      if (lastPage.length === 0) {
        return undefined;
      }

      return lastPageParam + 1;
    },
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });
};
