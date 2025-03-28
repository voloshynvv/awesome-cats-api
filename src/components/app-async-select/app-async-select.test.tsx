import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/testing/test-utils';
import { AppAsyncSelect } from './app-async-select';
import userEvent from '@testing-library/user-event';
import { queryOptions } from '@tanstack/react-query';
import { apiClient } from '@/api/api-client';
import { server } from '@/testing/mocks/node';
import { http, HttpResponse } from 'msw';
import { mswApiUrl } from '@/testing/mocks/handlers';

const testQueryOptions = queryOptions({
  queryKey: ['test'],
  queryFn: async () => {
    const response = await apiClient.get('/test');
    return response.data;
  },
});

describe('AppAsyncSelect', () => {
  it('renders async select with options and provided placeholder', async () => {
    const onValueChangeMock = vi.fn();

    server.use(
      http.get(mswApiUrl('/test'), () => {
        return HttpResponse.json([
          { id: '1', name: 'option-1' },
          { id: '2', name: 'option-2' },
          { id: '3', name: 'option-3' },
        ]);
      }),
    );

    renderWithProviders(
      <AppAsyncSelect
        itemToString={(item) => item.name}
        itemToValue={(item) => item.id}
        onValueChange={onValueChangeMock}
        placeholder="select an option"
        queryOptions={testQueryOptions}
        value={[]}
      />,
    );

    const trigger = screen.getByRole('combobox');
    expect(trigger).toHaveTextContent('select an option');

    await userEvent.click(trigger);

    const options = await screen.findAllByRole('option');

    expect(options).toHaveLength(3);

    expect(options[0]).toHaveTextContent('option-1');
    expect(options[1]).toHaveTextContent('option-2');
    expect(options[2]).toHaveTextContent('option-3');

    await userEvent.click(options[0]);

    expect(onValueChangeMock).toHaveBeenCalledWith(['1']);
  });

  it.skip('renders error massage in case of error', async () => {
    server.use(
      http.get(mswApiUrl('/test'), () => {
        return new HttpResponse(null, { status: 400 });
      }),
    );

    renderWithProviders(
      <AppAsyncSelect
        itemToString={() => ''}
        itemToValue={() => ''}
        onValueChange={() => {}}
        placeholder="select an option"
        queryOptions={testQueryOptions}
        value={[]}
      />,
    );

    const trigger = screen.getByRole('combobox');
    await userEvent.click(trigger);

    expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument();
    expect(screen.queryAllByRole('option')).toHaveLength(0);
  });
});
