export interface Coordinates {
  x: number;
  y: number;
}

export interface GridSize {
  width: number;
  height: number;
}

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export type PowerUpType = 'INVINCIBILITY' | 'SHRINK';

export interface PowerUp {
    type: PowerUpType;
    position: Coordinates;
}

export interface Level {
  level_id: number;
  grid_size: GridSize;
  initial_snake_position: {
    start: Coordinates;
    direction: Direction;
    length: number;
  };
  apple_positions: Coordinates[];
  portal_position: Coordinates;
  wall_positions?: Coordinates[];
  door_positions?: Coordinates[];
  key_positions?: Coordinates[];
  power_ups?: PowerUp[];
  toggle_spikes?: { positions: Coordinates[]; interval: number, offset?: number };
}

export type GameState = 'WELCOME' | 'PLAYING' | 'GAME_OVER' | 'LEVEL_COMPLETE' | 'PAUSED' | 'ENTERING_PORTAL';

export type Controls = Record<Direction, string>;
