import { Tabs } from '@chakra-ui/react';

import { Uploads } from './components/uploads/uploads';
import { ImageUploader } from './components/image-uploader/image-uploader';
import { Favourites } from './components/favourites/favourites';

export const Dashboard = () => {
  return (
    <Tabs.Root lazyMount unmountOnExit defaultValue="favourites">
      <Tabs.List flexWrap="wrap">
        <Tabs.Trigger value="favourites">
          Your favourites
          <span aria-hidden role="img">
            ✨
          </span>
        </Tabs.Trigger>

        <Tabs.Trigger value="uploads">
          Your Uploads
          <span aria-hidden role="img">
            📂
          </span>
        </Tabs.Trigger>

        <Tabs.Trigger value="upload">
          Upload
          <span aria-hidden role="img">
            📷
          </span>
        </Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="favourites">
        <Favourites />
      </Tabs.Content>

      <Tabs.Content value="uploads">
        <Uploads />
      </Tabs.Content>

      <Tabs.Content value="upload">
        <ImageUploader />
      </Tabs.Content>
    </Tabs.Root>
  );
};
