import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../api-client';
import { catsKey } from '../queries/cats';

export const useDeleteFavourite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (favouriteId: number) => {
      return apiClient.delete(`/favourites/${favouriteId}`);
    },
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: catsKey });
    },
  });
};
