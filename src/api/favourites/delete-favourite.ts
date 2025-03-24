import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../api-client';
import { getCatsInfiniteQueryOptions } from '../cats/get-cats';

interface DeleteFavouriteResponse {
  message: string;
}

const deleteFavourite = async (favouriteId: number): Promise<DeleteFavouriteResponse> => {
  const response = await apiClient.delete(`/favourites/${favouriteId}`);
  return response.data;
};

export const useDeleteFavourite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFavourite,
    onSuccess: (_, favouriteId) => {
      // queryClient.invalidateQueries does not fit here because images are returned randomly
      // To preserve the current list state, it's better to update the cache manually

      queryClient.setQueryData(getCatsInfiniteQueryOptions().queryKey, (oldData) => {
        if (!oldData) return oldData;

        const newPages = oldData?.pages.map((page) => {
          return page.map((cat) => {
            if (cat.favourite?.id === favouriteId) {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const { favourite, ...newCat } = cat;
              return newCat;
            }

            return cat;
          });
        });

        return {
          ...oldData,
          pages: newPages,
        };
      });
    },
  });
};
