
import { useState } from 'react';
import type { Direction } from '../types';

const MIN_SWIPE_DISTANCE = 30;

export const useSwipe = (onSwipe: (direction: Direction) => void) => {
  const [touchStart, setTouchStart] = useState<[number, number] | null>(null);
  const [touchEnd, setTouchEnd] = useState<[number, number] | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null); // otherwise the swipe is fired even with a single tap
    setTouchStart([e.targetTouches[0].clientX, e.targetTouches[0].clientY]);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd([e.targetTouches[0].clientX, e.targetTouches[0].clientY]);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distanceX = touchStart[0] - touchEnd[0];
    const distanceY = touchStart[1] - touchEnd[1];

    if (Math.abs(distanceX) > Math.abs(distanceY)) {
      // Horizontal swipe
      if (Math.abs(distanceX) > MIN_SWIPE_DISTANCE) {
        onSwipe(distanceX > 0 ? 'LEFT' : 'RIGHT');
      }
    } else {
      // Vertical swipe
      if (Math.abs(distanceY) > MIN_SWIPE_DISTANCE) {
        onSwipe(distanceY > 0 ? 'UP' : 'DOWN');
      }
    }

    setTouchStart(null);
    setTouchEnd(null);
  };
  
  return {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
  };
};
