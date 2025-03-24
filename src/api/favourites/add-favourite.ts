import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../api-client';
import { getFavouritesQueryOptions } from './get-favourites';

export const useAddFavourite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (catId: string) => {
      const response = await apiClient.post('/favourites', {
        image_id: catId,
        sub_id: 'my-user-id',
      });
      return response.data;
    },
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: getFavouritesQueryOptions().queryKey });
    },
  });
};
