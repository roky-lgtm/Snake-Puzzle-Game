import { useCallback } from 'react';
import { sounds } from '../assets/sounds';

type SoundEffect = keyof typeof sounds;

const audioCache: Partial<Record<SoundEffect, HTMLAudioElement>> = {};

// Eagerly create Audio objects if in a browser environment
if (typeof Audio !== 'undefined') {
    Object.entries(sounds).forEach(([key, src]) => {
        const audio = new Audio(src);
        audio.preload = 'auto';
        audioCache[key as SoundEffect] = audio;
    });
}


export const useSounds = () => {
  const playSound = useCallback((name: SoundEffect) => {
    const audio = audioCache[name];
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(error => {
        // This error is common before any user interaction and can be ignored.
        console.log(`Could not play sound '${name}':`, error.message);
      });
    } else {
        console.warn(`Sound not found: ${name}`);
    }
  }, []);

  return { playSound };
};
