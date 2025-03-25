import { Outlet, ScrollRestoration } from 'react-router';
import { Container } from '@chakra-ui/react';
import { NavigationBar } from '@/components/navigation-bar/navigation-bar';

export const Root = () => {
  return (
    <Container as="main" maxW="2xl" pt="8" pb="5.625rem">
      <NavigationBar />

      <Outlet />

      <ScrollRestoration />
    </Container>
  );
};
