import { render, RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router';
import { Provider } from '@/components/ui/provider';

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  initialEntries?: string;
}

const createTestQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });
};

export const renderWithProviders = (ui: React.ReactNode, options: CustomRenderOptions = {}) => {
  const { initialEntries = '/', ...rtlOptions } = options;

  const queryClient = createTestQueryClient();

  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <Provider>
        <QueryClientProvider client={queryClient}>
          <MemoryRouter initialEntries={[initialEntries]}>{children}</MemoryRouter>
        </QueryClientProvider>
      </Provider>
    );
  };

  return render(ui, { wrapper: Wrapper, ...rtlOptions });
};

export const createMatchMedia = ({ media, matches = false }: { media: string; matches?: boolean }) => ({
  matches,
  media,
  onchange: null,
  addListener: vi.fn(), // deprecated
  removeListener: vi.fn(), // deprecated
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
});
