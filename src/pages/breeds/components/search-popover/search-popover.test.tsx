import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from '@/testing/test-utils';

import { SearchPopover } from './search-popover';

interface renderComponentProps {
  onSubmit?: (value: string) => void;
}

const renderComponent = ({ onSubmit = () => {} }: renderComponentProps = {}) => {
  renderWithProviders(<SearchPopover onSubmit={onSubmit} />);

  const trigger = screen.getByRole('button', { name: /open/i });
  const input = screen.getByLabelText(/breed/i);
  const submitButton = screen.getByText('Search');

  return { trigger, input, submitButton };
};

describe('SearchPopover', () => {
  it('toggles popover visibility by clicking on trigger', async () => {
    const { trigger, input, submitButton } = renderComponent();

    expect(input).not.toBeVisible();
    expect(submitButton).not.toBeVisible();

    await userEvent.click(trigger);

    expect(input).toBeVisible();
    expect(submitButton).toBeVisible();

    await userEvent.click(trigger);

    await waitFor(() => {
      expect(input).not.toBeVisible();
    });

    expect(submitButton).not.toBeVisible();
  });

  it('hides popover after clicking on submit button with empty input', async () => {
    const submitMock = vi.fn();
    const { trigger, input, submitButton } = renderComponent({ onSubmit: submitMock });

    await userEvent.click(trigger);

    await userEvent.type(input, 'breed');
    await userEvent.clear(input);

    await userEvent.click(submitButton);

    expect(submitMock).toHaveBeenCalledTimes(1);
    expect(submitMock).toHaveBeenCalledWith('');

    await waitFor(() => {
      expect(input).not.toBeVisible();
    });

    expect(submitButton).not.toBeVisible();
  });

  it('keeps popover visible after clicking on submit button', async () => {
    const value = 'breed';

    const submitMock = vi.fn();

    const { trigger, input, submitButton } = renderComponent({ onSubmit: submitMock });

    await userEvent.click(trigger);

    await userEvent.type(input, value);
    await userEvent.click(submitButton);

    expect(submitMock).toHaveBeenCalledTimes(1);
    expect(submitMock).toHaveBeenCalledWith(value);

    expect(input).toBeVisible();
    expect(submitButton).toBeVisible();
  });

  it('updates input value correctly when typing', async () => {
    const { trigger, input } = renderComponent();

    const value = 'bengal';

    await userEvent.click(trigger);
    await userEvent.clear(input);
    await userEvent.type(input, value);

    expect(input).toHaveValue(value);
  });

  it('resets input value on close', async () => {
    const { trigger, input } = renderComponent();

    await userEvent.click(trigger);
    await userEvent.type(input, 'breed');

    await userEvent.click(trigger);
    await userEvent.click(trigger);

    expect(input).toHaveValue('');
  });
});
