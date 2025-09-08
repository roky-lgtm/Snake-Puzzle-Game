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
  isEnteringPortal: boolean;
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
  isEnteringPortal,
}) => {
  const getCellContent = (x: number, y: number) => {
    const snakeSegmentIndex = snake.findIndex(segment => segment.x === x && segment.y === y);
    if (snakeSegmentIndex !== -1) {
      const style = { '--i': snakeSegmentIndex } as React.CSSProperties;
      const isSnakeHead = snakeSegmentIndex === 0;

      if (isSnakeHead) {
        let rotation = '0deg';
        if (direction === 'RIGHT') rotation = '90deg';
        else if (direction === 'DOWN') rotation = '180deg';
        else if (direction === 'LEFT') rotation = '270deg';

        return (
          <div className={`snake-head ${isInvincible ? 'invincible' : ''}`} style={{ ...style, transform: `rotate(${rotation})` }}>
            <div className="eye"></div>
            <div className="eye"></div>
          </div>
        );
      } else {
        return <div className={`snake-body ${isInvincible ? 'invincible' : ''}`} style={style}></div>;
      }
    }

    const isApple = apples.some(apple => apple.x === x && apple.y === y);
    if (isApple) return <div className="apple"></div>;

    const isPortal = portal.x === x && portal.y === y;
    if (isPortal) return <div className={`portal ${portalActive ? 'active' : ''} ${isEnteringPortal ? 'swallowing' : ''}`}></div>;

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
        .snake-head, .snake-body {
          width: 100%;
          height: 100%;
          background-color: rgba(76, 175, 80, 0.75);
          backdrop-filter: blur(2px);
          -webkit-backdrop-filter: blur(2px); /* For Safari */
          position: relative;
          overflow: hidden; /* To contain the highlight */
          will-change: border-radius; /* Performance hint */
          /* Positive delay creates a ripple from head to tail */
          animation-delay: calc(var(--i, 0) * 50ms);
        }
        .snake-head {
          display: flex;
          justify-content: space-evenly;
          align-items: flex-start;
          padding-top: 25%;
          /* Slightly longer animation for a smoother feel */
          animation: liquid-morph-head 1.5s infinite ease-in-out;
        }
        .snake-body {
          /* Slightly longer animation for a smoother feel */
          animation: liquid-morph 1.5s infinite ease-in-out;
        }
        .snake-head::before, .snake-body::before {
          content: '';
          position: absolute;
          top: 5%;
          left: 10%;
          width: 80%;
          height: 40%;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          filter: blur(4px);
          transform: rotate(25deg);
        }
        .snake-head.invincible, .snake-body.invincible {
          background-color: rgba(33, 150, 243, 0.75);
        }
        .eye { 
          width: 18%; 
          height: 18%; 
          background: #222; 
          border-radius: 50%;
          z-index: 1; /* Place eyes above the shine */
        }
        
        .apple {
          width: 90%;
          height: 90%;
          position: relative;
          background: radial-gradient(circle at 35% 35%, #ff8a80, #d32f2f 80%);
          border-radius: 48% 52% 45% 55% / 60% 58% 42% 40%;
          box-shadow: inset -4px -4px 8px rgba(0,0,0,0.25), 0 3px 5px rgba(0,0,0,0.2);
          animation: pulse-red 2.5s infinite ease-in-out;
        }
        .apple::before { /* Leaf */
          content: '';
          position: absolute;
          top: -12%;
          right: 30%;
          width: 45%;
          height: 45%;
          background: #66BB6A;
          border-radius: 40% 60% 10% 90% / 70% 30% 70% 30%;
          transform: rotate(25deg);
          z-index: 2;
        }
        .apple::after { /* Stem */
          content: '';
          position: absolute;
          top: -18%;
          left: 46%;
          width: 8%;
          height: 25%;
          background: #6D4C41;
          border-radius: 2px;
          transform: rotate(-10deg);
          z-index: 1;
        }
        
        .portal { 
          width: 100%; 
          height: 100%; 
          background: #6d28d9; /* Dark, inactive purple base */
          border-radius: 50%; 
          transition: all 0.5s ease-in-out;
          box-shadow: inset 0 0 10px rgba(0,0,0,0.5);
        }
        .portal.active { 
          background: radial-gradient(circle, #e91e63, #9c27b0, #2196f3, #00bcd4);
          background-size: 250% 250%;
          animation: 
            swirl-background 5s ease-in-out infinite, 
            pulse-glow 2.5s ease-in-out infinite;
        }
        .portal.swallowing {
          animation: 
            swallow 0.5s ease-in-out infinite, 
            swirl-background 5s ease-in-out infinite;
        }
        
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

        @keyframes pulse-red {
          0%, 100% {
            transform: scale(1);
            filter: brightness(1);
          }
          50% {
            transform: scale(1.08);
            filter: brightness(1.1);
          }
        }
        
        @keyframes liquid-morph {
          0%, 100% {
            /* Subtle, less extreme wobble */
            border-radius: 48% 52% 47% 53% / 52% 48% 53% 47%;
          }
          50% {
            border-radius: 52% 48% 53% 47% / 48% 52% 47% 53%;
          }
        }
        @keyframes liquid-morph-head {
          0%, 100% {
            /* Head is mostly round at the front, with a subtle tailing effect */
            border-radius: 50% 50% 40% 40%;
          }
          50% {
            border-radius: 50% 50% 45% 35%;
          }
        }

        @keyframes pulse-yellow { 0%, 100% { transform: scale(1) rotate(-45deg); } 50% { transform: scale(1.1) rotate(-45deg); } }
        
        @keyframes swallow {
          50% {
            transform: scale(1.2);
            box-shadow: 0 0 30px #f0f, inset 0 0 10px #fff;
          }
        }
        
        @keyframes swirl-background {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 15px 3px rgba(233, 30, 99, 0.8), inset 0 0 5px rgba(255,255,255,0.3); }
          50% { box-shadow: 0 0 25px 8px rgba(0, 188, 212, 0.8), inset 0 0 5px rgba(255,255,255,0.3); }
        }
      `}</style>
    </>
  );
};

export default GameBoard;