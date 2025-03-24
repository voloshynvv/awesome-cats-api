import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../api-client';
import { getFavouritesQueryOptions } from './get-favourites';

export const useDeleteFavourite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (favouriteId: number) => {
      return apiClient.delete(`/favourites/${favouriteId}`);
    },
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: getFavouritesQueryOptions().queryKey });
    },
  });
};
