import { renderWithProviders } from '@/testing/test-utils';
import { screen } from '@testing-library/react';

import { ImageWithCursor } from './image-with-cursor';
import userEvent from '@testing-library/user-event';

describe('ImageWithCursor', () => {
  it('display custom cursor on hover', async () => {
    renderWithProviders(<ImageWithCursor imageSrc="cat.png" source="favourite" onClick={() => {}} />);

    const cat = screen.getByRole('button');
    const cursor = screen.getByTestId('cursor');

    expect(cursor).not.toBeVisible();

    await userEvent.hover(cat);

    expect(cursor).toBeVisible();

    await userEvent.unhover(cat);

    expect(cursor).not.toBeVisible();
  });
});
