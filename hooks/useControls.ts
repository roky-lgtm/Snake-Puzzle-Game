import { useState } from 'react';
import type { Controls } from '../types';

const CONTROLS_STORAGE_KEY = 'snake-puzzle-controls';

export const defaultControls: Controls = {
  UP: 'ArrowUp',
  DOWN: 'ArrowDown',
  LEFT: 'ArrowLeft',
  RIGHT: 'ArrowRight',
};

const getSavedControls = (): Controls => {
  try {
    const saved = localStorage.getItem(CONTROLS_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Basic validation to ensure it's not malformed
      if (parsed.UP && parsed.DOWN && parsed.LEFT && parsed.RIGHT) {
        return parsed;
      }
    }
  } catch (error) {
    console.error("Failed to load controls from localStorage", error);
  }
  return defaultControls;
};

export const useControls = () => {
  const [controls, setControls] = useState<Controls>(getSavedControls);

  const saveControls = (newControls: Controls) => {
    try {
      localStorage.setItem(CONTROLS_STORAGE_KEY, JSON.stringify(newControls));
      setControls(newControls);
    } catch (error) {
      console.error("Failed to save controls to localStorage", error);
    }
  };

  const resetControls = () => {
    saveControls(defaultControls);
  };

  return { controls, saveControls, resetControls };
};
