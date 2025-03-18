import { Providers } from '@/providers';
import { RouterProvider } from '@/router/router';

export const App = () => {
  return (
    <Providers>
      <RouterProvider />
    </Providers>
  );
};
