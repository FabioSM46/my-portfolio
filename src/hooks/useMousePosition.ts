/**
 * Custom hook to track pointer position (mouse + touch)
 * Returns normalized pointer coordinates (-1 to 1)
 * Useful for interactive 3D effects and parallax
 */
import { useState, useEffect, useCallback } from 'react';

interface PointerPosition {
  x: number;
  y: number;
  normalizedX: number;
  normalizedY: number;
}

export function useMousePosition() {
  const [position, setPosition] = useState<PointerPosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
  });
  const [isInteracting, setIsInteracting] = useState(false);

  const updatePosition = useCallback((clientX: number, clientY: number) => {
    const normalizedX = (clientX / window.innerWidth) * 2 - 1;
    const normalizedY = -(clientY / window.innerHeight) * 2 + 1;

    setPosition({
      x: clientX,
      y: clientY,
      normalizedX,
      normalizedY,
    });
  }, []);

  const handleMouseMove = useCallback(
    (event: MouseEvent) => updatePosition(event.clientX, event.clientY),
    [updatePosition]
  );

  const handleTouchMove = useCallback(
    (event: TouchEvent) => {
      if (event.touches.length === 1) {
        const touch = event.touches[0];
        updatePosition(touch.clientX, touch.clientY);
      }
    },
    [updatePosition]
  );

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', () => setIsInteracting(true), { once: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [handleMouseMove, handleTouchMove]);

  return { ...position, isInteracting };
}
