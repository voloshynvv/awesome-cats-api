import { renderWithProviders } from '@/testing/test-utils';
import { fireEvent, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mswApiUrl } from '@/testing/mocks/handlers';
import { server } from '@/testing/mocks/node';
import { http, HttpResponse } from 'msw';

import { ImageUploader } from './image-uploader';

const confirmButtonName = /confirm/i;
const deleteButtonName = /delete/i;
const previewAlt = /cat preview/i;
const fileInputLabel = /upload file/i;

describe('ImageUploader', () => {
  // beforeEach(() => {
  //   vi.useFakeTimers({ shouldAdvanceTime: true });
  // });

  // afterEach(() => {
  //   vi.runOnlyPendingTimers();
  //   vi.useRealTimers();
  // });

  it('renders file input', () => {
    renderWithProviders(<ImageUploader />);

    expect(screen.getByLabelText(fileInputLabel)).toBeInTheDocument();
  });

  it('displays image preview and controls when file is selected', async () => {
    renderWithProviders(<ImageUploader />);

    const fileInput = screen.getByLabelText(fileInputLabel) as HTMLInputElement;

    expect(screen.queryByRole('button', { name: confirmButtonName })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: deleteButtonName })).not.toBeInTheDocument();
    expect(screen.queryByAltText(previewAlt)).not.toBeInTheDocument();

    const file = new File(['cat'], 'cat.png', { type: 'image/png' });
    await userEvent.upload(fileInput, file);

    expect(fileInput.files?.[0]).toBe(file);
    expect(fileInput.files).toHaveLength(1);

    expect(screen.getByRole('button', { name: confirmButtonName })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: deleteButtonName })).toBeInTheDocument();
    expect(screen.getByAltText(previewAlt)).toBeInTheDocument();
  });

  it('hides image preview and controls', async () => {
    renderWithProviders(<ImageUploader />);

    const fileInput = screen.getByLabelText(fileInputLabel) as HTMLInputElement;

    const file = new File(['cat'], 'cat.png', { type: 'image/png' });
    await userEvent.upload(fileInput, file);

    const deleteButton = screen.getByRole('button', { name: deleteButtonName });

    await userEvent.click(deleteButton);

    expect(screen.queryByRole('button', { name: confirmButtonName })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: deleteButtonName })).not.toBeInTheDocument();
    expect(screen.queryByAltText(previewAlt)).not.toBeInTheDocument();
  });

  it('shows error banner', async () => {
    server.use(
      http.post(mswApiUrl('/images/upload'), () => {
        return new HttpResponse('Classifcation failed: correct animal not found.', { status: 400 });
      }),
    );

    renderWithProviders(<ImageUploader />);

    const fileInput = screen.getByLabelText(fileInputLabel) as HTMLInputElement;

    const file = new File(['bad-image'], 'bad-image.png', { type: 'image/png' });
    await userEvent.upload(fileInput, file);

    const confirmButton = screen.getByRole('button', { name: confirmButtonName });
    await userEvent.click(confirmButton);

    expect(confirmButton).toBeDisabled();

    const banner = await screen.findByRole('alert');

    expect(banner).toBeInTheDocument();
    expect(banner).toHaveTextContent(/something went wrong/i);

    expect(confirmButton).toBeEnabled();
  });

  it('shows success banner for 2s and hides image preview and controls after mutation', async () => {
    server.use(
      http.post(mswApiUrl('/images/upload'), () => {
        return HttpResponse.json('created', { status: 201 });
      }),
    );

    renderWithProviders(<ImageUploader />);

    const fileInput = screen.getByLabelText(fileInputLabel) as HTMLInputElement;

    const file = new File(['cat'], 'cat.png', { type: 'image/png' });
    await userEvent.upload(fileInput, file);

    const confirmButton = await screen.findByRole('button', { name: confirmButtonName });
    await userEvent.click(confirmButton);

    const banner = await screen.findByRole('alert');

    expect(banner).toBeInTheDocument();
    expect(banner).toHaveTextContent(/image successfully uploaded/i);

    expect(screen.queryByRole('button', { name: confirmButtonName })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: deleteButtonName })).not.toBeInTheDocument();
    expect(screen.queryByAltText(previewAlt)).not.toBeInTheDocument();

    // TODO: improve with mocking timers
    await waitFor(
      () => {
        expect(banner).not.toBeInTheDocument();
      },
      { timeout: 3000 },
    );
  });
});
