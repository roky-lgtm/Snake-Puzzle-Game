
import { useEffect } from 'react';
import type { Direction } from '../types';

export const useKeyPress = (callback: (key: Direction) => void) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
        case 'w':
          event.preventDefault();
          callback('UP');
          break;
        case 'ArrowDown':
        case 's':
          event.preventDefault();
          callback('DOWN');
          break;
        case 'ArrowLeft':
        case 'a':
          event.preventDefault();
          callback('LEFT');
          break;
        case 'ArrowRight':
        case 'd':
          event.preventDefault();
          callback('RIGHT');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [callback]);
};
