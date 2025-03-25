import { useEffect, useState } from 'react';

interface Position {
  x: number | null;
  y: number | null;
}

export const useMousePosition = () => {
  const [hasHover, setHasHover] = useState(false);
  const [position, setPosition] = useState<Position>({ x: null, y: null });

  useEffect(() => {
    if (!hasHover) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [hasHover]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover)');

    const handleMediaQueryChange = () => {
      setHasHover(mediaQuery.matches);
    };

    mediaQuery.addEventListener('change', handleMediaQueryChange);
    handleMediaQueryChange();

    return () => mediaQuery.removeEventListener('change', handleMediaQueryChange);
  }, []);

  return position;
};
