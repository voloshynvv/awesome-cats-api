import { Outlet } from 'react-router';
import { Box } from '@chakra-ui/react';

import { Header } from '@/components/header';

export const Root = () => {
  return (
    <div>
      <Header />

      <Box>
        <Outlet />
      </Box>
    </div>
  );
};
