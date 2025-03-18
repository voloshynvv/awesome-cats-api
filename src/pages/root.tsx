import { Outlet, ScrollRestoration } from 'react-router';
import { Container } from '@chakra-ui/react';
import { NavigationBar } from '@/components/navigation-bar/navigation-bar';

export const Root = () => {
  return (
    <Container as="main" maxW="2xl" py="4" pb="4.375rem">
      <NavigationBar />

      <Outlet />

      <ScrollRestoration />
    </Container>
  );
};
