import { fireEvent, renderHook } from '@testing-library/react';
import { createMatchMedia } from '@/testing/test-utils';

import { useMousePosition } from '../use-mouse-position';

describe('useMousePosition', () => {
  it('returns initial position with null values', () => {
    const { result } = renderHook(() => useMousePosition());

    expect(result.current).toEqual({ x: null, y: null });
  });

  it('updates the position if hover is supported', async () => {
    window.matchMedia = vi.fn((media) => createMatchMedia({ media, matches: true }));

    const newPosition = {
      x: 100,
      y: 100,
    };

    const { result } = renderHook(() => useMousePosition());

    expect(result.current).toEqual({ x: null, y: null });

    fireEvent.mouseMove(window, { clientX: newPosition.x, clientY: newPosition.y });

    expect(result.current).toEqual(newPosition);
  });

  it('should NOT update the position if hover IS NOT supported', () => {
    window.matchMedia = vi.fn((media) => createMatchMedia({ media, matches: false }));

    const { result } = renderHook(() => useMousePosition());

    expect(result.current).toEqual({ x: null, y: null });

    fireEvent.mouseMove(window, { clientX: 100, clientY: 100 });

    expect(result.current).toEqual({ x: null, y: null });
  });
});
