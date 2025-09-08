import React from 'react';
import type { Direction } from '../types';

interface NavigationControlsProps {
  onDirectionChange: (direction: Direction) => void;
}

const ArrowIcon: React.FC<{ rotation: string }> = ({ rotation }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-8 w-8 text-white" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor" 
        strokeWidth={3}
        style={{ transform: `rotate(${rotation})` }}
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
    </svg>
);


const NavigationControls: React.FC<NavigationControlsProps> = ({ onDirectionChange }) => {
  
  const handlePress = (e: React.MouseEvent | React.TouchEvent, direction: Direction) => {
    e.preventDefault(); // Prevents focus, double-tap zoom, etc.
    onDirectionChange(direction);
  };

  // Prevent context menu on long press for the whole control area
  const handleContextMenu = (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault();
  };

  return (
    <div 
        className="mt-6 grid grid-cols-3 grid-rows-3 gap-3 w-48 h-48 mx-auto select-none"
        onContextMenu={handleContextMenu}
        style={{ touchAction: 'manipulation' }} // Prevents zoom on double tap on some browsers
    >
      <div className="col-start-2 row-start-1">
        <button
          onMouseDown={(e) => handlePress(e, 'UP')}
          onTouchStart={(e) => handlePress(e, 'UP')}
          className="w-full h-full bg-black/30 backdrop-blur-sm rounded-xl flex items-center justify-center active:bg-white/30 transition-colors"
          aria-label="Move Up"
        >
          <ArrowIcon rotation="0deg" />
        </button>
      </div>
      <div className="col-start-1 row-start-2">
        <button
          onMouseDown={(e) => handlePress(e, 'LEFT')}
          onTouchStart={(e) => handlePress(e, 'LEFT')}
          className="w-full h-full bg-black/30 backdrop-blur-sm rounded-xl flex items-center justify-center active:bg-white/30 transition-colors"
          aria-label="Move Left"
        >
          <ArrowIcon rotation="-90deg" />
        </button>
      </div>
      <div className="col-start-3 row-start-2">
        <button
          onMouseDown={(e) => handlePress(e, 'RIGHT')}
          onTouchStart={(e) => handlePress(e, 'RIGHT')}
          className="w-full h-full bg-black/30 backdrop-blur-sm rounded-xl flex items-center justify-center active:bg-white/30 transition-colors"
          aria-label="Move Right"
        >
          <ArrowIcon rotation="90deg" />
        </button>
      </div>
      <div className="col-start-2 row-start-3">
        <button
          onMouseDown={(e) => handlePress(e, 'DOWN')}
          onTouchStart={(e) => handlePress(e, 'DOWN')}
          className="w-full h-full bg-black/30 backdrop-blur-sm rounded-xl flex items-center justify-center active:bg-white/30 transition-colors"
          aria-label="Move Down"
        >
          <ArrowIcon rotation="180deg" />
        </button>
      </div>
    </div>
  );
};

export default NavigationControls;