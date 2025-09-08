import React, { useState, useEffect, useCallback } from 'react';
import type { Controls, Direction } from '../types';
import { defaultControls } from '../hooks/useControls';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentControls: Controls;
  onSave: (newControls: Controls) => void;
}

const directionLabels: Record<Direction, string> = {
    UP: 'Move Up',
    DOWN: 'Move Down',
    LEFT: 'Move Left',
    RIGHT: 'Move Right',
};

const formatKey = (key: string) => {
    if (key === ' ') return 'Space';
    if (key.startsWith('Arrow')) return key.substring(5);
    return key.length === 1 ? key.toUpperCase() : key;
};

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, currentControls, onSave }) => {
  const [tempControls, setTempControls] = useState<Controls>(currentControls);
  const [listeningFor, setListeningFor] = useState<Direction | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setTempControls(currentControls);
  }, [currentControls, isOpen]);

  const handleKeyListen = useCallback((event: KeyboardEvent) => {
    if (!listeningFor) return;

    event.preventDefault();
    event.stopPropagation();
    
    if (event.key === 'Escape') {
        setListeningFor(null);
        return;
    }

    setTempControls(prev => ({
        ...prev,
        [listeningFor]: event.key,
    }));
    setListeningFor(null);
  }, [listeningFor]);

  useEffect(() => {
    if (listeningFor) {
      window.addEventListener('keydown', handleKeyListen, true);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyListen, true);
    };
  }, [listeningFor, handleKeyListen]);

  const handleSave = () => {
    const keys = Object.values(tempControls);
    const uniqueKeys = new Set(keys);
    if (keys.length !== uniqueKeys.size) {
        setError('Duplicate keys are not allowed. Please assign a unique key to each action.');
        return;
    }
    setError(null);
    onSave(tempControls);
    onClose();
  };

  const handleReset = () => {
      setTempControls(defaultControls);
      setError(null);
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 max-w-md w-full text-center transform transition-all animate-fade-in-up" onClick={e => e.stopPropagation()}>
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Customize Controls</h2>
        
        <div className="space-y-4 text-left">
            {(Object.keys(directionLabels) as Direction[]).map(direction => (
                <div key={direction} className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
                    <span className="font-semibold text-gray-700">{directionLabels[direction]}</span>
                    <button 
                        onClick={() => { setListeningFor(direction); setError(null); }}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-mono font-bold py-2 px-4 rounded-md w-32 text-center transition-colors"
                    >
                        {listeningFor === direction ? '...' : formatKey(tempControls[direction])}
                    </button>
                </div>
            ))}
        </div>

        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
        
        <div className="mt-8 flex flex-col sm:flex-row-reverse gap-3">
             <button
                onClick={handleSave}
                className="w-full sm:w-auto flex-1 bg-gradient-to-br from-green-400 to-cyan-500 text-white font-bold py-3 px-4 rounded-xl hover:opacity-90 transition-opacity duration-300 shadow-lg"
            >
                Save & Close
            </button>
            <button
                onClick={handleReset}
                className="w-full sm:w-auto bg-gray-200 text-gray-700 font-bold py-3 px-4 rounded-xl hover:bg-gray-300 transition-colors duration-300"
            >
                Reset to Default
            </button>
        </div>
      </div>
       <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default SettingsModal;
