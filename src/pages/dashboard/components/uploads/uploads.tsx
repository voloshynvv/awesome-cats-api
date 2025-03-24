import { useInfiniteQuery } from '@tanstack/react-query';
import { Box, Spinner, Text } from '@chakra-ui/react';

import { EmptyScreen } from '@/components/ui/empty-screen';
import { InfiniteListing } from '@/components/infinite-listing/infinite-listing';
import { UploadedImage } from './uploaded-image';

import { useDeleteImage } from '@/api/cats/delete-image';
import { getUploadsInfiniteQueryOptions } from '@/api/cats/get-uploads';

export const Uploads = () => {
  const uploadsQuery = useInfiniteQuery(getUploadsInfiniteQueryOptions());
  const deleteImageMutation = useDeleteImage();

  if (uploadsQuery.isPending) {
    return <Spinner color="fg.muted" />;
  }

  if (uploadsQuery.isError) {
    return <p>error</p>;
  }

  const uploadedCats = uploadsQuery.data.pages.flat();

  if (!uploadedCats.length) {
    return (
      <EmptyScreen
        title="No Purr-fect Pics Yet"
        description="Looks like your gallery is still empty! Upload some adorable cat photos and let the cuteness begin!"
      />
    );
  }

  return (
    <Box>
      <Text mb="2" fontStyle="italic" color="gray.200">
        Oops! Be careful — clicking on the cat image will remove it instantly <span role="img">🐱💨</span>
      </Text>

      <InfiniteListing
        isFetchingNextPage={uploadsQuery.isFetchingNextPage}
        entities={uploadedCats}
        onNextPageClick={() => uploadsQuery.fetchNextPage()}
        hasNextPage={uploadsQuery.hasNextPage}
        render={(cat) => (
          <UploadedImage
            key={cat.id}
            url={cat.url}
            isPending={deleteImageMutation.isPending}
            onClick={() => deleteImageMutation.mutate(cat.id)}
          />
        )}
      />

      {deleteImageMutation.isPending && <Spinner size="md" position="fixed" left="6" bottom="6" color="fg.muted" />}
    </Box>
  );
};
