import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../api-client';
import { getUploadsInfiniteQueryOptions } from './get-uploads';

interface DeleteImageResponse {
  message: string;
}

const deleteImage = async (imageId: string): Promise<DeleteImageResponse> => {
  const response = await apiClient.delete(`/images/${imageId}`);
  return response.data;
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
