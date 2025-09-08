import { useState, useCallback, useEffect } from 'react';
import { sounds } from '../assets/sounds';

const MUSIC_STATE_KEY = 'snake-puzzle-music-enabled';

const getInitialMusicState = (): boolean => {
    try {
        const savedState = localStorage.getItem(MUSIC_STATE_KEY);
        return savedState ? JSON.parse(savedState) : true; // Music on by default
    } catch {
        return true;
    }
};

let audio: HTMLAudioElement | null = null;
if (typeof Audio !== 'undefined' && sounds.backgroundMusic) {
    audio = new Audio(sounds.backgroundMusic);
    audio.loop = true;
    audio.volume = 0.25; // Lower volume for background music
}

export const useMusic = () => {
    const [isMusicEnabled, setIsMusicEnabled] = useState(getInitialMusicState);
    const [hasInteracted, setHasInteracted] = useState(false);

    useEffect(() => {
        // This effect ensures music starts playing as soon as there's user interaction.
        if (isMusicEnabled && hasInteracted && audio?.paused) {
            audio.play().catch(e => console.error("Error playing music:", e));
        }
    }, [isMusicEnabled, hasInteracted]);
    
    // The first click on the page enables audio playback.
    const startMusicOnFirstInteraction = useCallback(() => {
        if (!hasInteracted) {
            setHasInteracted(true);
        }
    }, [hasInteracted]);

    const toggleMusic = useCallback(() => {
        const newIsEnabled = !isMusicEnabled;
        setIsMusicEnabled(newIsEnabled);
        try {
            localStorage.setItem(MUSIC_STATE_KEY, JSON.stringify(newIsEnabled));
        } catch (error) {
            console.error("Failed to save music state to localStorage", error);
        }

        if (newIsEnabled) {
            if (hasInteracted) {
                 audio?.play().catch(e => console.error("Error playing music:", e));
            }
        } else {
            audio?.pause();
            if (audio) {
                audio.currentTime = 0;
            }
        }
    }, [isMusicEnabled, hasInteracted]);
    
    return { isMusicEnabled, toggleMusic, startMusicOnFirstInteraction };
};
