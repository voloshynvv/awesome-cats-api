import { getFavouritesQueryOptions } from '@/api/queries/cats';
import { Image } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';

export const Favourites = () => {
  const { data: favourites } = useQuery(getFavouritesQueryOptions());

  return (
    <>
      <div>
        {favourites?.map((fav) => (
          <div key={fav.id}>
            <Image src={fav.image.url} />
          </div>
        ))}
      </div>
    </>
  );
};
