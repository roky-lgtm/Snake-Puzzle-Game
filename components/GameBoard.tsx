import React from 'react';
import type { Coordinates, GridSize, Direction, PowerUp } from '../types';

interface GameBoardProps {
  gridSize: GridSize;
  snake: Coordinates[];
  direction: Direction;
  apples: Coordinates[];
  portal: Coordinates;
  walls: Coordinates[];
  doors: Coordinates[];
  keys: Coordinates[];
  powerUps: PowerUp[];
  toggleSpikes: Coordinates[];
  isSpikeActive: boolean;
  portalActive: boolean;
  isInvincible: boolean;
}

const GameBoard: React.FC<GameBoardProps> = ({
  gridSize,
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
  portalActive,
  isInvincible,
}) => {
  const getCellContent = (x: number, y: number) => {
    const isSnakeHead = snake.length > 0 && snake[0].x === x && snake[0].y === y;
    if (isSnakeHead) {
      let rotation = '0deg';
      if (direction === 'RIGHT') rotation = '90deg';
      else if (direction === 'DOWN') rotation = '180deg';
      else if (direction === 'LEFT') rotation = '270deg';

      return (
        <div className={`snake-head ${isInvincible ? 'invincible' : ''}`} style={{ transform: `rotate(${rotation})` }}>
          <div className="eye"></div>
          <div className="eye"></div>
        </div>
      );
    }

    const isSnakeBody = snake.slice(1).some(segment => segment.x === x && segment.y === y);
    if (isSnakeBody) {
      return <div className={`snake-body ${isInvincible ? 'invincible' : ''}`}></div>;
    }

    const isApple = apples.some(apple => apple.x === x && apple.y === y);
    if (isApple) return <div className="apple"><div className="leaf"></div></div>;

    const isPortal = portal.x === x && portal.y === y;
    if (isPortal) return <div className={`portal ${portalActive ? 'active' : ''}`}></div>;

    const isWall = walls.some(wall => wall.x === x && wall.y === y);
    if (isWall) return <div className="wall"></div>;
      
    const isDoor = doors.some(door => door.x === x && door.y === y);
    if (isDoor) return <div className="door"><div className="keyhole"></div></div>;
      
    const isKey = keys.some(key => key.x === x && key.y === y);
    if (isKey) return <div className="key"><div className="key-top"></div><div className="key-bottom"></div></div>;
      
    const powerUp = powerUps.find(p => p.position.x === x && p.position.y === y);
    if (powerUp) {
        if (powerUp.type === 'INVINCIBILITY') return <div className="power-up invincibility-powerup">S</div>;
        if (powerUp.type === 'SHRINK') return <div className="power-up shrink-powerup">↓</div>;
    }
      
    const isSpike = toggleSpikes.some(spike => spike.x === x && spike.y === y);
    if (isSpike) return <div className={`spike ${isSpikeActive ? 'active' : ''}`}></div>;

    return null;
  };

  return (
    <>
      <div
        className="bg-green-100/50 border-2 border-white/30 p-1 rounded-lg shadow-inner"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${gridSize.width}, 1fr)`,
          gridTemplateRows: `repeat(${gridSize.height}, 1fr)`,
          aspectRatio: `${gridSize.width} / ${gridSize.height}`,
          width: '100%',
          maxWidth: '500px',
        }}
      >
        {Array.from({ length: gridSize.height }).map((_, y) =>
          Array.from({ length: gridSize.width }).map((_, x) => (
            <div
              key={`${x}-${y}`}
              className="w-full h-full flex items-center justify-center p-[8%]"
            >
              {getCellContent(x, y)}
            </div>
          ))
        )}
      </div>
      <style>{`
        .snake-head { width: 100%; height: 100%; background: linear-gradient(135deg, #4CAF50, #8BC34A); border-radius: 40% 40% 20% 20%; position: relative; box-shadow: inset 0 -2px 4px rgba(0,0,0,0.2); display: flex; justify-content: space-evenly; align-items: flex-start; padding-top: 20%; }
        .snake-body { width: 100%; height: 100%; background: linear-gradient(135deg, #4CAF50, #8BC34A); border-radius: 30%; box-shadow: inset 0 -2px 4px rgba(0,0,0,0.2); }
        .snake-head.invincible, .snake-body.invincible { background: linear-gradient(135deg, #2196F3, #64B5F6); animation: pulse-blue 1s infinite; }
        .eye { width: 20%; height: 20%; background: white; border-radius: 50%; border: 1px solid #333; }
        
        .apple { width: 100%; height: 100%; background: linear-gradient(135deg, #F44336, #E57373); border-radius: 50%; position: relative; box-shadow: inset 0 -2px 4px rgba(0,0,0,0.2); animation: pulse-red 2s infinite; }
        .leaf { position: absolute; top: 5%; right: 20%; width: 30%; height: 30%; background: #4CAF50; border-radius: 0 50% 0 50%; transform: rotate(-45deg); }
        
        .portal { width: 100%; height: 100%; background: #9C27B0; border-radius: 50%; transition: all 0.3s; }
        .portal.active { background: radial-gradient(circle, #f0f, #0ff, #f0f); animation: swirl 2s linear infinite; box-shadow: 0 0 15px #f0f; }
        
        .wall { width: 100%; height: 100%; background: linear-gradient(135deg, #616161, #424242); border-radius: 20%; box-shadow: inset 0 2px 3px rgba(255,255,255,0.2), inset 0 -2px 3px rgba(0,0,0,0.3); }
        .door { width: 100%; height: 100%; background: linear-gradient(135deg, #A1887F, #795548); border-radius: 20%; display: flex; align-items: center; justify-content: center; }
        .keyhole { width: 30%; height: 50%; background: #424242; border-radius: 50% 50% 0 0; position: relative; }
        .keyhole::after { content: ''; position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 50%; height: 50%; background: #424242; }
        
        .key { width: 80%; height: 80%; position: relative; transform: rotate(-45deg); animation: pulse-yellow 2.5s infinite; }
        .key-top { width: 50%; height: 50%; background: #FFEB3B; border: 2px solid #FBC02D; border-radius: 50%; position: absolute; top: 0; left: 0; }
        .key-bottom { width: 15%; height: 80%; background: #FFEB3B; border: 2px solid #FBC02D; position: absolute; bottom: 0; left: 18%; }
        
        .power-up { width: 100%; height: 100%; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; color: white; box-shadow: 0 2px 5px rgba(0,0,0,0.3); }
        .invincibility-powerup { background: linear-gradient(135deg, #2196F3, #03A9F4); font-size: 70%;}
        .shrink-powerup { background: linear-gradient(135deg, #FF9800, #FFB74D); font-size: 70%;}
        
        .spike { width: 0; height: 0; border-left: 0.5em solid transparent; border-right: 0.5em solid transparent; border-bottom: 1em solid #9E9E9E; transform: scale(0.8); transition: all 0.2s; }
        .spike.active { border-bottom-color: #F44336; }

        @keyframes pulse-red { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
        @keyframes pulse-blue { 0%, 100% { opacity: 0.8; } 50% { opacity: 1; } }
        @keyframes pulse-yellow { 0%, 100% { transform: scale(1) rotate(-45deg); } 50% { transform: scale(1.1) rotate(-45deg); } }
        @keyframes swirl { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </>
  );
};

export default GameBoard;