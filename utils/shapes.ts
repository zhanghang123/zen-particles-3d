import * as THREE from 'three';
import { ShapeType } from '../types';

const getRandomPointOnSphere = (radius: number, vec: THREE.Vector3) => {
  const u = Math.random();
  const v = Math.random();
  const theta = 2 * Math.PI * u;
  const phi = Math.acos(2 * v - 1);
  vec.x = radius * Math.sin(phi) * Math.cos(theta);
  vec.y = radius * Math.sin(phi) * Math.sin(theta);
  vec.z = radius * Math.cos(phi);
  return vec;
};

export const generateParticles = (type: ShapeType, count: number, baseColor: string): { positions: Float32Array, colors: Float32Array } => {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const colorObj = new THREE.Color(baseColor);
  const tempVec = new THREE.Vector3();

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    let x = 0, y = 0, z = 0;

    switch (type) {
      case ShapeType.HEART: {
        // Parametric Heart
        const phi = Math.random() * Math.PI * 2;
        const theta = Math.random() * Math.PI;
        // Simplified heart approximation volume
        const t = Math.PI * (Math.random() - 0.5); // -PI/2 to PI/2
        const u = Math.random() * 2 * Math.PI; // 0 to 2PI
        // Heart surface formula
        x = 16 * Math.pow(Math.sin(u), 3);
        y = 13 * Math.cos(u) - 5 * Math.cos(2 * u) - 2 * Math.cos(3 * u) - Math.cos(4 * u);
        z = t * 5; 
        
        // Randomize inside volume slightly
        const scale = 0.15 + Math.random() * 0.05;
        x *= scale;
        y *= scale;
        z = (Math.random() - 0.5) * 5; // Flatten depth
        break;
      }

      case ShapeType.FLOWER: {
        // Rose curve / Flower
        const theta = Math.random() * Math.PI * 2;
        const k = 4; // 4 petals
        const r = Math.cos(k * theta) * 5 * Math.random(); 
        const depth = (Math.random() - 0.5) * 2;
        x = r * Math.cos(theta);
        y = r * Math.sin(theta);
        z = depth + (Math.sin(theta * 4) * 1.5); // Warped petals
        break;
      }

      case ShapeType.SATURN: {
        const isRing = Math.random() > 0.4; // 60% ring, 40% planet
        if (isRing) {
            const innerR = 4;
            const outerR = 8;
            const r = innerR + Math.random() * (outerR - innerR);
            const theta = Math.random() * Math.PI * 2;
            x = r * Math.cos(theta);
            z = r * Math.sin(theta);
            y = (Math.random() - 0.5) * 0.2; // Thin ring
        } else {
            getRandomPointOnSphere(3, tempVec);
            x = tempVec.x;
            y = tempVec.y;
            z = tempVec.z;
        }
        break;
      }

      case ShapeType.BUDDHA: {
        // Abstract Meditating Figure (Stacked spheres approximation)
        const part = Math.random();
        if (part < 0.2) {
            // Head
            getRandomPointOnSphere(1.2, tempVec);
            x = tempVec.x;
            y = tempVec.y + 3.5;
            z = tempVec.z;
        } else if (part < 0.6) {
            // Body
            getRandomPointOnSphere(2.5, tempVec);
            x = tempVec.x * 1.2; // wider shoulders
            y = tempVec.y;
            z = tempVec.z * 0.8;
        } else {
            // Base/Legs (Lotus)
            const theta = Math.random() * Math.PI * 2;
            const r = 3 + Math.random() * 2;
            x = r * Math.cos(theta);
            z = r * Math.sin(theta);
            y = -2.5 + (Math.random() * 1);
        }
        break;
      }

      case ShapeType.FIREWORKS: {
         // Explosion sphere
         getRandomPointOnSphere(0.2, tempVec); // Start small, will expand with "noise" later or just be a big sphere
         // Actually let's make it a large sphere with high variance
         const r = Math.random() * 8;
         getRandomPointOnSphere(r, tempVec);
         x = tempVec.x;
         y = tempVec.y;
         z = tempVec.z;
         break;
      }

      default: // SPHERE
        getRandomPointOnSphere(5, tempVec);
        x = tempVec.x;
        y = tempVec.y;
        z = tempVec.z;
        break;
    }

    positions[i3] = x;
    positions[i3 + 1] = y;
    positions[i3 + 2] = z;

    // Color variation
    const variation = (Math.random() - 0.5) * 0.2;
    colors[i3] = Math.min(1, Math.max(0, colorObj.r + variation));
    colors[i3 + 1] = Math.min(1, Math.max(0, colorObj.g + variation));
    colors[i3 + 2] = Math.min(1, Math.max(0, colorObj.b + variation));
  }

  return { positions, colors };
};
