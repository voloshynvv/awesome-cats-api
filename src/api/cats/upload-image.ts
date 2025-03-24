import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../api-client';

const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.set('file', file);
  formData.set('sub_id', 'my-user-id');

  return apiClient.post('/images/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const useUploadImage = () => {
  return useMutation({
    mutationFn: uploadImage,
  });
};
