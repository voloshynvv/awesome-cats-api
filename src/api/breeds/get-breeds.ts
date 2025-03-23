import { queryOptions } from '@tanstack/react-query';
import { apiClient } from '../api-client';
import { Breed } from '../types';

const getBreeds = async (search = '') => {
  const endpoint = search ? '/breeds/search' : '/breeds';

  const response = await apiClient.get<Breed[]>(endpoint, {
    params: {
      q: search || undefined,
    },
  });

  return response.data;
};

export const getBreedsQueryOptions = (search = '') =>
  queryOptions({
    queryKey: ['breeds', { search }],
    queryFn: () => getBreeds(search),
    staleTime: Infinity, // always fresh
  });
