import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../api-client';
import { catsKey } from '../queries/cats';

export const useAddFavourite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (catId: string) => {
      return apiClient.post('/favourites', {
        image_id: catId,
        sub_id: 'my-user-id',
      });
    },
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: catsKey });
    },
  });
};
