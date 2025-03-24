import { useEffect, useState } from 'react';

export const useMousePosition = () => {
  const [hasHover, setHasHover] = useState(false);

  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    if (!hasHover) return;

    const handleMouseMove = (e: MouseEvent) => {
      console.log('moving');

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

  return { position, hasHover };
};
