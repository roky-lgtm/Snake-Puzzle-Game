import type { Level } from '../types';

export const levels: Level[] = [
  // Tier 1: Basics
  {
    level_id: 1,
    grid_size: { width: 10, height: 10 },
    initial_snake_position: { start: { x: 5, y: 8 }, direction: 'UP', length: 3 },
    apple_positions: [{ x: 5, y: 4 }],
    portal_position: { x: 5, y: 1 },
  },
  {
    level_id: 2,
    grid_size: { width: 10, height: 10 },
    initial_snake_position: { start: { x: 1, y: 1 }, direction: 'RIGHT', length: 3 },
    apple_positions: [{ x: 8, y: 1 }, { x: 8, y: 8 }],
    portal_position: { x: 1, y: 8 },
  },
  {
    level_id: 3,
    grid_size: { width: 10, height: 10 },
    initial_snake_position: { start: { x: 4, y: 5 }, direction: 'RIGHT', length: 3 },
    apple_positions: [{ x: 8, y: 5 }, { x: 4, y: 1 }],
    portal_position: { x: 1, y: 8 },
    wall_positions: [
        { x: 3, y: 3 }, { x: 4, y: 3 }, { x: 5, y: 3 }, { x: 6, y: 3 },
        { x: 3, y: 7 }, { x: 4, y: 7 }, { x: 5, y: 7 }, { x: 6, y: 7 },
    ]
  },
  {
    level_id: 4,
    grid_size: { width: 12, height: 12 },
    initial_snake_position: { start: { x: 6, y: 6 }, direction: 'UP', length: 4 },
    apple_positions: [{ x: 1, y: 1 }, { x: 10, y: 1 }, { x: 1, y: 10 }, { x: 10, y: 10 }],
    portal_position: { x: 6, y: 1 },
  },
  {
    level_id: 5,
    grid_size: { width: 12, height: 12 },
    initial_snake_position: { start: { x: 1, y: 10 }, direction: 'UP', length: 3 },
    apple_positions: [{ x: 6, y: 6 }, { x: 1, y: 1 }],
    portal_position: { x: 10, y: 1 },
    wall_positions: [
        {x: 3, y: 0}, {x: 3, y: 1}, {x: 3, y: 2}, {x: 3, y: 3}, {x: 3, y: 4}, {x: 3, y: 5},
        {x: 8, y: 11}, {x: 8, y: 10}, {x: 8, y: 9}, {x: 8, y: 8}, {x: 8, y: 7}, {x: 8, y: 6},
    ]
  },
  // Tier 2: Keys and Doors
  {
    level_id: 6,
    grid_size: { width: 10, height: 10 },
    initial_snake_position: { start: { x: 1, y: 1 }, direction: 'RIGHT', length: 3 },
    apple_positions: [{ x: 8, y: 8 }],
    portal_position: { x: 5, y: 1 },
    key_positions: [{ x: 8, y: 1 }],
    door_positions: [{ x: 5, y: 3 }, { x: 6, y: 3 }]
  },
  {
    level_id: 7,
    grid_size: { width: 12, height: 12 },
    initial_snake_position: { start: { x: 6, y: 10 }, direction: 'UP', length: 3 },
    apple_positions: [{ x: 6, y: 2 }],
    portal_position: { x: 10, y: 10 },
    key_positions: [{ x: 1, y: 10 }],
    door_positions: [{ x: 8, y: 10 }],
    wall_positions: Array.from({length: 10}, (_, i) => ({x: 4, y: i+1}))
  },
  {
    level_id: 8,
    grid_size: { width: 12, height: 12 },
    initial_snake_position: { start: { x: 1, y: 1 }, direction: 'DOWN', length: 3 },
    apple_positions: [{ x: 10, y: 10 }],
    portal_position: { x: 6, y: 6 },
    key_positions: [{ x: 10, y: 1 }],
    door_positions: [{x: 5,y: 6}, {x: 6,y: 5}, {x: 7, y: 6}, {x: 6, y: 7}],
  },
  {
    level_id: 9,
    grid_size: { width: 15, height: 15 },
    initial_snake_position: { start: { x: 7, y: 13 }, direction: 'UP', length: 4 },
    apple_positions: [{ x: 7, y: 2 }],
    portal_position: { x: 1, y: 1 },
    key_positions: [{ x: 1, y: 13 }, { x: 13, y: 13 }],
    door_positions: [{ x: 7, y: 5 }, { x: 1, y: 5 }],
    wall_positions: Array.from({length: 11}, (_, i) => ({x: i+2, y: 8}))
  },
  {
    level_id: 10,
    grid_size: { width: 13, height: 13 },
    initial_snake_position: { start: { x: 6, y: 6 }, direction: 'UP', length: 3 },
    apple_positions: [{ x: 1, y: 1 }, {x: 11, y: 1}, {x: 1, y: 11}, {x: 11, y: 11}],
    portal_position: { x: 6, y: 1 },
    key_positions: [{x: 6, y: 11}],
    door_positions: [{x: 6, y: 3}]
  },
  // Tier 3: Toggle Spikes
  {
    level_id: 11,
    grid_size: { width: 10, height: 10 },
    initial_snake_position: { start: { x: 5, y: 8 }, direction: 'UP', length: 3 },
    apple_positions: [{ x: 5, y: 2 }],
    portal_position: { x: 8, y: 5 },
    toggle_spikes: { positions: [{x: 5, y: 5}], interval: 3 }
  },
  {
    level_id: 12,
    grid_size: { width: 10, height: 10 },
    initial_snake_position: { start: { x: 1, y: 8 }, direction: 'RIGHT', length: 3 },
    apple_positions: [{ x: 8, y: 1 }],
    portal_position: { x: 1, y: 1 },
    toggle_spikes: { positions: [{x:2, y: 4}, {x:3, y: 4}, {x:4, y: 4}, {x:5, y: 4}, {x:6, y: 4}, {x:7, y: 4}], interval: 5, offset: 2}
  },
  {
    level_id: 13,
    grid_size: { width: 12, height: 12 },
    initial_snake_position: { start: { x: 1, y: 10 }, direction: 'UP', length: 3 },
    apple_positions: [{ x: 6, y: 6 }],
    portal_position: { x: 10, y: 2 },
    toggle_spikes: { positions: Array.from({length: 10}, (_, i) => ({x: i+1, y: 3})), interval: 4 }
  },
  {
    level_id: 14,
    grid_size: { width: 12, height: 12 },
    initial_snake_position: { start: { x: 1, y: 1 }, direction: 'RIGHT', length: 3 },
    apple_positions: [{ x: 10, y: 10 }, {x: 1, y: 10}],
    portal_position: { x: 10, y: 1 },
    toggle_spikes: { positions: Array.from({length: 8}, (_,i) => ({x: 5, y: i+2})), interval: 3, offset: 1}
  },
  {
    level_id: 15,
    grid_size: { width: 15, height: 15 },
    initial_snake_position: { start: { x: 7, y: 13 }, direction: 'UP', length: 3 },
    apple_positions: [{ x: 7, y: 7 }],
    portal_position: { x: 7, y: 1 },
    toggle_spikes: { positions: Array.from({length: 11}, (_,i) => ({x: i+2, y: 4})), interval: 5, offset: 0},
    wall_positions: [...Array.from({length: 11}, (_,i) => ({x: i+2, y: 10}))]
  },
  // Tier 4: Power-ups
  {
    level_id: 16,
    grid_size: { width: 10, height: 10 },
    initial_snake_position: { start: { x: 1, y: 1 }, direction: 'RIGHT', length: 3 },
    apple_positions: [{ x: 8, y: 1 }],
    portal_position: { x: 8, y: 8 },
    power_ups: [{ type: 'INVINCIBILITY', position: { x: 5, y: 5 } }],
    wall_positions: [{x: 3, y: 0}, {x: 3, y: 1}, {x: 3, y: 2}]
  },
  {
    level_id: 17,
    grid_size: { width: 10, height: 10 },
    initial_snake_position: { start: { x: 5, y: 5 }, direction: 'UP', length: 8 },
    apple_positions: [{ x: 1, y: 1 }],
    portal_position: { x: 8, y: 8 },
    power_ups: [{ type: 'SHRINK', position: { x: 5, y: 2 } }],
  },
  {
    level_id: 18,
    grid_size: { width: 12, height: 12 },
    initial_snake_position: { start: { x: 1, y: 6 }, direction: 'RIGHT', length: 3 },
    apple_positions: [{ x: 10, y: 6 }],
    portal_position: { x: 6, y: 1 },
    power_ups: [{ type: 'INVINCIBILITY', position: { x: 6, y: 6 } }],
    wall_positions: Array.from({length: 12}, (_, i) => ({x: i, y: 3}))
  },
  {
    level_id: 19,
    grid_size: { width: 12, height: 12 },
    initial_snake_position: { start: { x: 1, y: 1 }, direction: 'RIGHT', length: 4 },
    apple_positions: [{ x: 10, y: 1 }, {x: 6, y: 6}],
    portal_position: { x: 10, y: 10 },
    power_ups: [{ type: 'SHRINK', position: { x: 1, y: 10 } }],
    wall_positions: [
        ...Array.from({length: 10}, (_, i) => ({x: 3, y: i+1})),
        ...Array.from({length: 10}, (_, i) => ({x: 8, y: i+1}))
    ]
  },
  {
    level_id: 20,
    grid_size: { width: 13, height: 13 },
    initial_snake_position: { start: { x: 1, y: 1 }, direction: 'RIGHT', length: 3 },
    apple_positions: [{ x: 11, y: 11 }],
    portal_position: { x: 6, y: 6 },
    power_ups: [{ type: 'INVINCIBILITY', position: { x: 1, y: 11 } }],
    wall_positions: [
        {x:6, y: 3}, {x:6, y: 4}, {x:6, y: 5}, {x:6, y: 7}, {x:6, y: 8}, {x:6, y: 9},
        {x:3, y: 6}, {x:4, y: 6}, {x:5, y: 6}, {x:7, y: 6}, {x:8, y: 6}, {x:9, y: 6},
    ]
  },
  // Tier 5: Combined mechanics
  {
    level_id: 21,
    grid_size: { width: 12, height: 12 },
    initial_snake_position: { start: { x: 1, y: 10 }, direction: 'UP', length: 3 },
    apple_positions: [{ x: 10, y: 2 }],
    portal_position: { x: 1, y: 1 },
    key_positions: [{x: 6, y: 6}],
    door_positions: [{x: 4, y: 2}],
    toggle_spikes: { positions: Array.from({length: 8}, (_,i) => ({x: i+2, y: 4})), interval: 4}
  },
  {
    level_id: 22,
    grid_size: { width: 12, height: 12 },
    initial_snake_position: { start: { x: 6, y: 10 }, direction: 'UP', length: 3 },
    apple_positions: [{ x: 6, y: 6 }],
    portal_position: { x: 6, y: 1 },
    power_ups: [{type: 'INVINCIBILITY', position: {x: 1, y: 10}}],
    toggle_spikes: { positions: Array.from({length: 10}, (_,i) => ({x: i+1, y: 3})), interval: 3}
  },
  {
    level_id: 23,
    grid_size: { width: 13, height: 13 },
    initial_snake_position: { start: { x: 1, y: 1 }, direction: 'DOWN', length: 5 },
    apple_positions: [{ x: 11, y: 11 }],
    portal_position: { x: 6, y: 6 },
    power_ups: [{type: 'SHRINK', position: {x: 1, y: 6}}],
    key_positions: [{x: 11, y: 1}],
    door_positions: [{x: 7, y: 6}]
  },
  {
    level_id: 24,
    grid_size: { width: 15, height: 15 },
    initial_snake_position: { start: { x: 7, y: 13 }, direction: 'UP', length: 3 },
    apple_positions: [{ x: 7, y: 2 }],
    portal_position: { x: 1, y: 1 },
    key_positions: [{x: 7, y: 7}],
    door_positions: [{x: 7, y: 4}],
    power_ups: [{type: 'INVINCIBILITY', position: {x: 13, y: 13}}],
    wall_positions: [...Array.from({length: 11}, (_,i) => ({x: i+2, y: 10}))]
  },
  {
    level_id: 25,
    grid_size: { width: 15, height: 15 },
    initial_snake_position: { start: { x: 1, y: 1 }, direction: 'RIGHT', length: 3 },
    apple_positions: [{x: 7, y: 7}],
    portal_position: { x: 13, y: 13 },
    toggle_spikes: { positions: [
      ...Array.from({length: 11}, (_, i) => ({x: i+2, y: 4})),
      ...Array.from({length: 11}, (_, i) => ({x: i+2, y: 10}))
    ], interval: 5, offset: 3},
    power_ups: [{type: 'INVINCIBILITY', position: {x: 7, y: 1}}]
  },
  // Tier 6: Expert
  {
    level_id: 26,
    grid_size: { width: 15, height: 15 },
    initial_snake_position: { start: { x: 1, y: 13 }, direction: 'RIGHT', length: 3 },
    apple_positions: [{ x: 13, y: 1 }],
    portal_position: { x: 7, y: 7 },
    key_positions: [{x: 1, y: 1}],
    door_positions: [{x: 7, y: 6}],
    toggle_spikes: { positions: Array.from({length: 15}, (_,i) => ({x: i, y: 3})), interval: 3}
  },
  {
    level_id: 27,
    grid_size: { width: 16, height: 16 },
    initial_snake_position: { start: { x: 1, y: 1 }, direction: 'RIGHT', length: 5 },
    apple_positions: [{ x: 14, y: 14 }, {x: 14, y: 1}, {x: 1, y: 14}],
    portal_position: { x: 8, y: 8 },
    power_ups: [{type: 'SHRINK', position: {x: 4, y: 4}}, {type: 'INVINCIBILITY', position: {x: 12, y: 12}}],
  },
  {
    level_id: 28,
    grid_size: { width: 14, height: 14 },
    initial_snake_position: { start: { x: 1, y: 12 }, direction: 'UP', length: 3 },
    apple_positions: [{ x: 12, y: 1 }],
    portal_position: { x: 7, y: 7 },
    key_positions: [{x: 1, y: 1}],
    door_positions: [{x: 10, y: 1}],
    wall_positions: [
      ...Array.from({length: 10}, (_,i) => ({x: 3, y: i+2})),
      ...Array.from({length: 10}, (_,i) => ({x: 10, y: i+2}))
    ],
    toggle_spikes: { positions: Array.from({length: 5}, (_,i) => ({x: i+5, y: 5})), interval: 4}
  },
  {
    level_id: 29,
    grid_size: { width: 18, height: 18 },
    initial_snake_position: { start: { x: 9, y: 16 }, direction: 'UP', length: 3 },
    apple_positions: [{x: 9, y: 9}],
    portal_position: { x: 9, y: 1 },
    wall_positions: [
      ...Array.from({length: 13}, (_, i) => ({x: i+3, y: 4})),
      ...Array.from({length: 13}, (_, i) => ({x: i+3, y: 14}))
    ],
    key_positions: [{x: 1, y: 9}],
    door_positions: [{x: 9, y: 5}],
    toggle_spikes: { positions: [
      {x: 5, y: 9}, {x: 13, y: 9}
    ], interval: 2}
  },
  {
    level_id: 30,
    grid_size: { width: 20, height: 20 },
    initial_snake_position: { start: { x: 1, y: 18 }, direction: 'UP', length: 5 },
    apple_positions: [{ x: 18, y: 18 }, { x: 1, y: 1 }, { x: 18, y: 1 }],
    portal_position: { x: 10, y: 10 },
    key_positions: [{x: 10, y: 1}],
    door_positions: [{x: 10, y: 11}],
    power_ups: [{type: 'INVINCIBILITY', position: {x: 1, y: 10}}],
    toggle_spikes: { positions: [
      ...Array.from({length: 16}, (_, i) => ({x: i+2, y: 5})),
      ...Array.from({length: 16}, (_, i) => ({x: i+2, y: 15}))
    ], interval: 6, offset: 3}
  },
];
