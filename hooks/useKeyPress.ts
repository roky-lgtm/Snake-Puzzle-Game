import { useEffect } from 'react';
import type { Direction, Controls } from '../types';

export const useKeyPress = (controls: Controls, callback: (direction: Direction) => void) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const direction = (Object.keys(controls) as Direction[]).find(
        (dir) => controls[dir] === event.key
      );

      if (direction) {
        event.preventDefault();
        callback(direction);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [controls, callback]);
};
