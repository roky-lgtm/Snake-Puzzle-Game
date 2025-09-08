import React, { useState } from 'react';
import GameBoard from './components/GameBoard';
import Modal from './components/Modal';
import { levels } from './data/levels';
import { useGameLogic } from './hooks/useGameLogic';
import { useKeyPress } from './hooks/useKeyPress';
import { useSwipe } from './hooks/useSwipe';

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
    changeDirection,
    startGame,
    nextLevel,
    resetLevel,
  } = useGameLogic();

  const [showWelcome, setShowWelcome] = useState(true);

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

  const handleStartGame = () => {
    setShowWelcome(false);
    startGame(0);
  };

  const handleNextLevel = () => {
    nextLevel();
  };

  const handleRestart = () => {
    resetLevel();
  };

  const renderModalContent = () => {
    if (showWelcome) {
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
            onClick={handleStartGame}
            className="mt-8 w-full bg-gradient-to-br from-green-400 to-cyan-500 text-white font-bold py-3 px-4 rounded-xl hover:opacity-90 transition-opacity duration-300 shadow-lg"
          >
            Start Game
          </button>
        </Modal>
      );
    }

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
        </Modal>
      );
    }

    if (gameState === 'GAME_OVER') {
      return (
        <Modal title="Game Over" isOpen={true}>
          <p className="text-gray-600 mb-6">Oops! You crashed. Don't worry, give it another try.</p>
          <button
            onClick={handleRestart}
            className="w-full bg-gradient-to-br from-red-500 to-orange-500 text-white font-bold py-3 px-4 rounded-xl hover:opacity-90 transition-opacity duration-300 shadow-lg"
          >
            Restart Level
          </button>
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
            />
          </div>
          
          <div className="mt-6 text-center">
            <button
              onClick={handleRestart}
              className="bg-gray-700 text-white font-bold py-2 px-8 rounded-xl hover:bg-gray-800 transition-colors duration-300 shadow-md"
            >
              Restart
            </button>
          </div>
      </div>
      
      {renderModalContent()}
    </div>
  );
};

export default App;