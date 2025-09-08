import React, { useState } from 'react';
import GameBoard from './components/GameBoard';
import Modal from './components/Modal';
import LevelSelect from './components/LevelSelect';
import { levels } from './data/levels';
import { useGameLogic } from './hooks/useGameLogic';
import { useKeyPress } from './hooks/useKeyPress';
import { useSwipe } from './hooks/useSwipe';
import { useSounds } from './hooks/useSounds';

const App: React.FC = () => {
  const {
    gameState,
    level,
    snake,
    direction,
    apples,
    portal,
    walls,
    doors,
    keys,
    powerUps,
    toggleSpikes,
    isSpikeActive,
    invincibilityTurns,
    highestUnlockedLevel,
    changeDirection,
    startGame,
    nextLevel,
    resetLevel,
  } = useGameLogic();

  const [view, setView] = useState<'welcome' | 'level-select' | 'game'>('welcome');
  const { playSound } = useSounds();

  useKeyPress((key) => {
    if (gameState === 'PLAYING') {
      changeDirection(key);
    }
  });
  
  const swipeHandlers = useSwipe((direction) => {
    if (gameState === 'PLAYING') {
      changeDirection(direction);
    }
  });

  const handleSelectLevel = (levelIndex: number) => {
    playSound('click');
    startGame(levelIndex);
    setView('game');
  };

  const handleReturnToLevelSelect = () => {
    playSound('click');
    setView('level-select');
  };

  const handleNextLevel = () => {
    playSound('click');
    nextLevel();
  };

  const handleRestart = () => {
    playSound('click');
    resetLevel();
  };
  
  if (view === 'welcome') {
      return (
        <Modal title="Snake Puzzle 3D" isOpen={true}>
          <p className="text-gray-600 mb-6">
            Guide the snake to eat all the apples. Once you've eaten them all, slither to the portal to complete the level. Watch out for obstacles and use power-ups!
          </p>
          <div className="text-sm text-gray-500 text-left mx-auto max-w-xs">
            <h3 className="font-bold mb-2 text-center">Controls:</h3>
            <p><strong>Desktop:</strong> Use Arrow Keys</p>
            <p><strong>Mobile:</strong> Swipe Up, Down, Left, or Right</p>
          </div>
          <button
            onClick={() => { playSound('gameStart'); setView('level-select'); }}
            className="mt-8 w-full bg-gradient-to-br from-green-400 to-cyan-500 text-white font-bold py-3 px-4 rounded-xl hover:opacity-90 transition-opacity duration-300 shadow-lg"
          >
            Start Game
          </button>
        </Modal>
      );
  }
  
  if (view === 'level-select') {
      return <LevelSelect 
        totalLevels={levels.length}
        highestUnlockedLevel={highestUnlockedLevel}
        onSelectLevel={handleSelectLevel}
        />
  }

  const renderGameModals = () => {
    if (gameState === 'LEVEL_COMPLETE') {
      const isLastLevel = level.level_id === levels[levels.length - 1].level_id;
      return (
        <Modal title={`Level ${level.level_id} Complete!`} isOpen={true}>
          <p className="text-gray-600 mb-6">Great job! You navigated the maze successfully.</p>
          {isLastLevel ? (
             <p className="text-green-600 font-bold mb-6">You've completed all available levels!</p>
          ) : (
            <button
              onClick={handleNextLevel}
              className="w-full bg-gradient-to-br from-green-400 to-cyan-500 text-white font-bold py-3 px-4 rounded-xl hover:opacity-90 transition-opacity duration-300 shadow-lg"
            >
              Next Level
            </button>
          )}
          <button
              onClick={handleReturnToLevelSelect}
              className="mt-3 w-full bg-gray-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-gray-700 transition-colors duration-300 shadow-lg"
            >
              Level Select
          </button>
        </Modal>
      );
    }

    if (gameState === 'GAME_OVER') {
      return (
        <Modal title="Game Over" isOpen={true}>
          <p className="text-gray-600 mb-6">Oops! You crashed. Don't worry, give it another try.</p>
           <div className="flex flex-col space-y-3">
            <button
                onClick={handleRestart}
                className="w-full bg-gradient-to-br from-red-500 to-orange-500 text-white font-bold py-3 px-4 rounded-xl hover:opacity-90 transition-opacity duration-300 shadow-lg"
              >
                Restart Level
              </button>
              <button
                onClick={handleReturnToLevelSelect}
                className="w-full bg-gray-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-gray-700 transition-colors duration-300 shadow-lg"
              >
                Level Select
              </button>
          </div>
        </Modal>
      );
    }
    return null;
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full p-4 font-sans" {...swipeHandlers}>
       <div className="relative w-full max-w-lg mx-auto">
          <header className="w-full text-center mb-4">
            <h1 className="text-5xl font-bold text-white text-shadow" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.2)'}}>Snake Puzzle 3D</h1>
          </header>
          
          <div className="w-full flex justify-between items-center mb-4 px-2 bg-white/30 backdrop-blur-sm p-3 rounded-xl">
            <div className="text-lg font-semibold text-gray-800">Level: <span className="font-bold text-violet-600">{level.level_id}</span></div>
            {invincibilityTurns > 0 && (
                 <div className="text-lg font-semibold text-blue-600 bg-white/50 px-3 py-1 rounded-lg">
                    Shield: {invincibilityTurns}
                </div>
            )}
            <div className="text-lg font-semibold text-gray-800">Apples: <span className="font-bold text-red-600">{apples.length}</span></div>
          </div>

          <div className="bg-white/30 backdrop-blur-sm p-2 rounded-2xl shadow-lg">
            <GameBoard
              gridSize={level.grid_size}
              snake={snake}
              direction={direction}
              apples={apples}
              portal={portal}
              walls={walls}
              doors={doors}
              keys={keys}
              powerUps={powerUps}
              toggleSpikes={toggleSpikes}
              isSpikeActive={isSpikeActive}
              portalActive={apples.length === 0}
              isInvincible={invincibilityTurns > 0}
              isEnteringPortal={gameState === 'ENTERING_PORTAL'}
            />
          </div>
          
          <div className="mt-6 flex justify-center items-center space-x-4">
             <button
              onClick={handleReturnToLevelSelect}
              className="bg-gray-500 text-white font-bold py-2 px-6 rounded-xl hover:bg-gray-600 transition-colors duration-300 shadow-md"
            >
              Back to Levels
            </button>
            <button
              onClick={handleRestart}
              className="bg-gray-700 text-white font-bold py-2 px-8 rounded-xl hover:bg-gray-800 transition-colors duration-300 shadow-md"
            >
              Restart
            </button>
          </div>
      </div>
      
      {renderGameModals()}
    </div>
  );
};

export default App;