import { useInfiniteQuery } from '@tanstack/react-query';
import { Box, HStack, Spinner, Text } from '@chakra-ui/react';

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
      <HStack mb="2" gap="4">
        <Text fontStyle="italic" color="gray.200">
          Oops! Be careful — clicking on the cat image will remove it instantly <span role="img">🐱💨</span>
        </Text>

        {deleteImageMutation.isPending && <Spinner color="fg.muted" />}
      </HStack>

      <InfiniteListing
        isFetchingNextPage={uploadsQuery.isFetchingNextPage}
        entities={uploadedCats}
        onNextPageClick={() => uploadsQuery.fetchNextPage()}
        hasNextPage={uploadsQuery.hasNextPage}
        render={(cat) => (
          <UploadedImage
            key={cat.id}
            id={cat.id}
            url={cat.url}
            isPending={deleteImageMutation.isPending}
            onClick={() => deleteImageMutation.mutate(cat.id)}
          />
        )}
      />
    </Box>
  );
};
