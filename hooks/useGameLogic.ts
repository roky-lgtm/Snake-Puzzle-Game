import { useState, useCallback, useEffect } from 'react';
import type { Coordinates, Direction, GameState, Level, PowerUp } from '../types';
import { levels } from '../data/levels';

const LOCAL_STORAGE_KEY = 'snake-puzzle-level';
const INVINCIBILITY_DURATION = 5;

const getInitialLevelIndex = (): number => {
  const savedLevel = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (savedLevel) {
    const levelIndex = parseInt(savedLevel, 10);
    if (levelIndex >= 0 && levelIndex < levels.length) {
      return levelIndex;
    }
  }
  return 0;
};

export const useGameLogic = () => {
  const [currentLevelIndex, setCurrentLevelIndex] = useState(getInitialLevelIndex);
  const [level, setLevel] = useState<Level>(levels[currentLevelIndex]);
  
  // Game state
  const [snake, setSnake] = useState<Coordinates[]>([]);
  const [direction, setDirection] = useState<Direction>('UP');
  const [apples, setApples] = useState<Coordinates[]>([]);
  const [portal, setPortal] = useState<Coordinates>({ x: -1, y: -1 });
  const [walls, setWalls] = useState<Coordinates[]>([]);
  const [doors, setDoors] = useState<Coordinates[]>([]);
  const [keys, setKeys] = useState<Coordinates[]>([]);
  const [powerUps, setPowerUps] = useState<PowerUp[]>([]);
  const [toggleSpikes, setToggleSpikes] = useState<{ positions: Coordinates[]; interval: number, offset: number } | null>(null);
  const [gameState, setGameState] = useState<GameState>('WELCOME');
  
  // Player state
  const [moveCount, setMoveCount] = useState(0);
  const [invincibilityTurns, setInvincibilityTurns] = useState(0);
  
  const isSameCoord = (a: Coordinates, b: Coordinates) => a.x === b.x && a.y === b.y;

  const initLevel = useCallback((levelIndex: number) => {
    const newLevel = levels[levelIndex];
    setLevel(newLevel);
    
    const { start, direction: initialDirection, length } = newLevel.initial_snake_position;
    const initialSnake: Coordinates[] = [];
    for (let i = 0; i < length; i++) {
        switch(initialDirection) {
            case 'UP': initialSnake.push({ x: start.x, y: start.y + i }); break;
            case 'DOWN': initialSnake.push({ x: start.x, y: start.y - i }); break;
            case 'LEFT': initialSnake.push({ x: start.x + i, y: start.y }); break;
            case 'RIGHT': initialSnake.push({ x: start.x - i, y: start.y }); break;
        }
    }

    setSnake(initialSnake);
    setDirection(initialDirection);
    setApples(newLevel.apple_positions || []);
    setPortal(newLevel.portal_position);
    setWalls(newLevel.wall_positions || []);
    setDoors(newLevel.door_positions || []);
    setKeys(newLevel.key_positions || []);
    setPowerUps(newLevel.power_ups || []);
    setToggleSpikes(newLevel.toggle_spikes ? {...newLevel.toggle_spikes, offset: newLevel.toggle_spikes.offset || 0} : null);

    setGameState('PLAYING');
    setMoveCount(0);
    setInvincibilityTurns(0);
  }, []);
  
  const startGame = useCallback((levelIndex: number) => {
    setCurrentLevelIndex(levelIndex);
    initLevel(levelIndex);
  }, [initLevel]);

  const isSpikeActive = useCallback(() => {
    if (!toggleSpikes) return false;
    return (moveCount + toggleSpikes.offset) % toggleSpikes.interval === 0;
  }, [moveCount, toggleSpikes]);

  const moveSnake = useCallback((newDirection: Direction) => {
    if (gameState !== 'PLAYING') return;

    const newSnake = [...snake];
    const head = { ...newSnake[0] };

    switch (newDirection) {
      case 'UP': head.y -= 1; break;
      case 'DOWN': head.y += 1; break;
      case 'LEFT': head.x -= 1; break;
      case 'RIGHT': head.x += 1; break;
    }
    
    const isInvincible = invincibilityTurns > 0;

    if (!isInvincible) {
        // Wall collision
        if (head.x < 0 || head.x >= level.grid_size.width || head.y < 0 || head.y >= level.grid_size.height) {
          setGameState('GAME_OVER');
          return;
        }
        if (walls.some(wall => isSameCoord(wall, head))) {
          setGameState('GAME_OVER');
          return;
        }
        // Door collision
        if (doors.some(door => isSameCoord(door, head))) {
            setGameState('GAME_OVER');
            return;
        }
        // Spike collision
        if (toggleSpikes && isSpikeActive() && toggleSpikes.positions.some(spike => isSameCoord(spike, head))) {
            setGameState('GAME_OVER');
            return;
        }
        // Self collision
        if (newSnake.slice(1).some(segment => isSameCoord(segment, head))) {
           setGameState('GAME_OVER');
           return;
        }
    }

    newSnake.unshift(head);

    // Apple collision
    const appleIndex = apples.findIndex(apple => isSameCoord(apple, head));
    let ateApple = false;
    if (appleIndex !== -1) {
      const newApples = [...apples];
      newApples.splice(appleIndex, 1);
      setApples(newApples);
      ateApple = true;
    } else {
      newSnake.pop();
    }

    // Key collision
    const keyIndex = keys.findIndex(key => isSameCoord(key, head));
    if (keyIndex !== -1) {
        const newKeys = [...keys];
        newKeys.splice(keyIndex, 1);
        setKeys(newKeys);
        setDoors([]); // Simple logic: one key opens all doors
    }
    
    // Power-up collision
    const powerUpIndex = powerUps.findIndex(p => isSameCoord(p.position, head));
    if (powerUpIndex !== -1) {
        const powerUp = powerUps[powerUpIndex];
        if (powerUp.type === 'INVINCIBILITY') {
            setInvincibilityTurns(INVINCIBILITY_DURATION);
        } else if (powerUp.type === 'SHRINK') {
            if (newSnake.length > 3) {
                newSnake.pop();
                newSnake.pop();
            }
        }
        const newPowerUps = [...powerUps];
        newPowerUps.splice(powerUpIndex, 1);
        setPowerUps(newPowerUps);
    }
    
    // Portal collision
    const justAteLastApple = apples.length === 1 && ateApple;
    const allApplesAlreadyEaten = apples.length === 0;

    if ((justAteLastApple || allApplesAlreadyEaten) && isSameCoord(head, portal)) {
        setGameState('LEVEL_COMPLETE');
        const nextLevelIndex = currentLevelIndex + 1;
        if(nextLevelIndex < levels.length) {
            localStorage.setItem(LOCAL_STORAGE_KEY, nextLevelIndex.toString());
        }
        return;
    }

    setSnake(newSnake);
    setDirection(newDirection);
    setMoveCount(prev => prev + 1);
    if(isInvincible) {
        setInvincibilityTurns(prev => prev - 1);
    }

  }, [snake, gameState, apples, level.grid_size, walls, doors, keys, powerUps, toggleSpikes, portal, currentLevelIndex, invincibilityTurns, isSpikeActive]);

  const changeDirection = useCallback((newDirection: Direction) => {
    if (gameState !== 'PLAYING') return;
    if (
      (direction === 'UP' && newDirection === 'DOWN') ||
      (direction === 'DOWN' && newDirection === 'UP') ||
      (direction === 'LEFT' && newDirection === 'RIGHT') ||
      (direction === 'RIGHT' && newDirection === 'LEFT')
    ) {
      return;
    }
    moveSnake(newDirection);
  }, [direction, gameState, moveSnake]);

  const resetLevel = useCallback(() => {
    initLevel(currentLevelIndex);
  }, [currentLevelIndex, initLevel]);

  const nextLevel = useCallback(() => {
    const nextLevelIndex = currentLevelIndex + 1;
    if (nextLevelIndex < levels.length) {
      setCurrentLevelIndex(nextLevelIndex);
      initLevel(nextLevelIndex);
    }
  }, [currentLevelIndex, initLevel]);

  useEffect(() => {
    // This effect now only runs on mount to load the initial or saved level.
    // startGame(0) is now called from the UI to avoid initializing game on page load behind the welcome modal.
  }, []);
  
  return {
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
    toggleSpikes: toggleSpikes?.positions || [],
    isSpikeActive: isSpikeActive(),
    invincibilityTurns,
    changeDirection,
    startGame,
    nextLevel,
    resetLevel,
  };
};