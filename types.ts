export enum ShapeType {
  HEART = 'HEART',
  FLOWER = 'FLOWER',
  SATURN = 'SATURN',
  BUDDHA = 'BUDDHA', // Approximate meditative shape
  FIREWORKS = 'FIREWORKS',
  SPHERE = 'SPHERE'
}

export interface ParticleState {
  positions: Float32Array;
  colors: Float32Array;
}

export interface HandGestureState {
  detected: boolean;
  distance: number; // Normalized 0 to 1 ideally, representing expansion factor
}

export interface AppConfig {
  shape: ShapeType;
  color: string;
  particleCount: number;
  sensitivity: number;
}