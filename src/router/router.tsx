import { createBrowserRouter, RouterProvider as Router } from 'react-router';

import { Root } from '@/pages/root';
import { Breed } from '@/pages/breed/breed';
import { Breeds } from '@/pages/breeds/breeds';
import { Dashboard } from '@/pages/dashboard/dashboard';
import { Gallery } from '@/pages/gallery/gallery';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Gallery />,
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
        path: '/dashboard',
        element: <Dashboard />,
      },
    ],
  },
]);

export const RouterProvider = () => {
  return <Router router={router} />;
};
