import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../api-client';
import { getUploadsInfiniteQueryOptions } from './get-uploads';

const deleteImage = async (imageId: string) => {
  return apiClient.delete(`/images/${imageId}`);
};

export const useDeleteImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteImage,
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: getUploadsInfiniteQueryOptions().queryKey });
    },
  });
};
