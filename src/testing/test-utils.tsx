import { render, RenderOptions } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Provider } from '@/components/ui/provider';

interface Options extends Omit<RenderOptions, 'wrapper'> {
  initialEntries?: string;
}

export const renderWithProviders = (ui: React.ReactNode, options: Options = {}) => {
  const { initialEntries = '/', ...rtlOptions } = options;

  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <Provider>
        <MemoryRouter initialEntries={[initialEntries]}>{children}</MemoryRouter>
      </Provider>
    );
  };

  return render(ui, { wrapper: Wrapper, ...rtlOptions });
};
