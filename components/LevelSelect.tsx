import React from 'react';

interface LevelSelectProps {
  totalLevels: number;
  highestUnlockedLevel: number;
  onSelectLevel: (levelIndex: number) => void;
}

const LockIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
);


const LevelSelect: React.FC<LevelSelectProps> = ({ totalLevels, highestUnlockedLevel, onSelectLevel }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full p-4 font-sans">
      <div className="w-full max-w-2xl mx-auto">
        <header className="w-full text-center mb-8">
            <h1 className="text-5xl font-bold text-white text-shadow" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.2)'}}>Select a Level</h1>
        </header>

        <div className="bg-white/30 backdrop-blur-sm p-4 sm:p-6 rounded-2xl shadow-lg">
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3 sm:gap-4">
                {Array.from({ length: totalLevels }).map((_, index) => {
                    const isLocked = index > highestUnlockedLevel;
                    return (
                        <button
                            key={index}
                            onClick={() => !isLocked && onSelectLevel(index)}
                            disabled={isLocked}
                            className={`
                                aspect-square w-full rounded-xl flex items-center justify-center 
                                font-bold text-2xl text-white transition-all duration-200 
                                shadow-lg transform hover:-translate-y-1
                                ${isLocked 
                                    ? 'bg-gray-500/50 cursor-not-allowed' 
                                    : 'bg-gradient-to-br from-green-400 to-cyan-500 hover:opacity-90'
                                }
                            `}
                            aria-label={isLocked ? `Level ${index + 1} locked` : `Play Level ${index + 1}`}
                        >
                            {isLocked ? <LockIcon /> : index + 1}
                        </button>
                    );
                })}
            </div>
        </div>
      </div>
    </div>
  );
};

export default LevelSelect;
