import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../api-client';
import { getCatsInfiniteQueryOptions } from '../cats/get-cats';
import { getFavouritesQueryOptions } from './get-favourites';

interface AddFavouriteResponse {
  message: string;
  id: number;
}

const addFavourite = async (catId: string): Promise<AddFavouriteResponse> => {
  const response = await apiClient.post('/favourites', {
    image_id: catId,
    sub_id: 'my-user-id',
  });
  return response.data;
};

export const useAddFavourite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addFavourite,
    onSuccess: (response, catId) => {
      // queryClient.invalidateQueries does not fit here because images are returned randomly
      // To preserve the current list state, it's better to update the cache manually

      queryClient.setQueryData(getCatsInfiniteQueryOptions().queryKey, (oldData) => {
        if (!oldData) return oldData;

        const newPages = oldData?.pages.map((page) => {
          return page.map((cat) => {
            if (cat.id === catId) {
              return { ...cat, favourite: { id: response.id } };
            }

            return cat;
          });
        });

        return {
          ...oldData,
          pages: newPages,
        };
      });

      return queryClient.invalidateQueries({ queryKey: getFavouritesQueryOptions().queryKey });
    },
  });
};
