import { createBrowserRouter, RouterProvider as Router } from 'react-router';

import { Home } from '@/pages/home';
import { About } from '@/pages/about';
import { Contacts } from '@/pages/contacts';
import { Root } from '@/pages/root';
import { Breed } from '@/pages/breed';
import { Breeds } from '@/pages/breeds';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/contacts',
        element: <Contacts />,
      },
      {
        path: '/breeds',
        element: <Breeds />,
      },
      {
        path: '/breeds/:breedId',
        element: <Breed />,
      },
    ],
  },
]);

export const RouterProvider = () => {
  return <Router router={router} />;
};
