import { createBrowserRouter, RouterProvider } from 'react-router';

import { Home } from './pages/home';
import { About } from './pages/about';
import { Contacts } from './pages/contacts';
import { Category } from './pages/category';
import { Meal } from './pages/meal';
import { Root } from './pages/root';

import { Providers } from './providers';

const router = createBrowserRouter([
  { path: '/', element: <Root /> },
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
    path: '/category/:categoryName',
    element: <Category />,
  },
  {
    path: '/meal/:mealId',
    element: <Meal />,
  },
]);

export const App = () => {
  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  );
};
