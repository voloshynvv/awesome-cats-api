import { createBrowserRouter, RouterProvider as Router } from 'react-router';

import { Home } from '@/pages/home';
import { Root } from '@/pages/root';
import { Favourites } from '@/pages/favourites';
import { Breed } from '@/pages/breed/breed';
import { Breeds } from '@/pages/breeds/breeds';

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
        path: '/breeds',
        element: <Breeds />,
      },
      {
        path: '/breeds/:breedId',
        element: <Breed />,
      },
      {
        path: '/favourites',
        element: <Favourites />,
      },
    ],
  },
]);

export const RouterProvider = () => {
  return <Router router={router} />;
};
