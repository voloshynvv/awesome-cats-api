import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../api-client';
import { getUploadsInfiniteQueryOptions } from './get-uploads';
import { sessionId } from '../user-session';

const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.set('file', file);
  formData.set('sub_id', sessionId);

  const response = await apiClient.post('/images/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const useUploadImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadImage,
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: getUploadsInfiniteQueryOptions().queryKey });
    },
  });
};
