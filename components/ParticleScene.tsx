import React, { useMemo, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { generateParticles } from '../utils/shapes';
import { ShapeType } from '../types';

interface ParticlesProps {
  shape: ShapeType;
  color: string;
  gestureScale: number;
}

const ParticleSystem: React.FC<ParticlesProps> = ({ shape, color, gestureScale }) => {
  const count = 5000;
  const mesh = useRef<THREE.Points>(null);
  const targetPositions = useRef<Float32Array>(new Float32Array(count * 3));
  
  // Initialize particles
  const { positions: initialPositions, colors: initialColors } = useMemo(() => {
    return generateParticles(ShapeType.SPHERE, count, color);
  }, []); // Only once at startup

  // Create geometry buffers
  const particles = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(initialPositions.slice(), 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(initialColors.slice(), 3));
    return geometry;
  }, [initialPositions, initialColors]);

  // Handle shape changes
  useEffect(() => {
    const { positions, colors } = generateParticles(shape, count, color);
    targetPositions.current = positions;
    
    // Update colors immediately for better feedback
    if (mesh.current) {
        mesh.current.geometry.attributes.color.array.set(colors);
        mesh.current.geometry.attributes.color.needsUpdate = true;
    }
  }, [shape, color]);

  useFrame((state) => {
    if (!mesh.current) return;

    const positions = mesh.current.geometry.attributes.position.array as Float32Array;
    const targets = targetPositions.current;
    
    // Smooth Lerp factor - 提高响应速度
    const lerpSpeed = 0.08;
    
    // Base scale + Gesture Influence
    // If gestureScale > 0, it means hands are detected. 
    // We map 0-1 gesture to 0.5-2.0 scale roughly
    const targetScale = gestureScale > 0 ? 0.5 + (gestureScale * 2) : 1.0;
    
    // Animate rotation slowly
    mesh.current.rotation.y += 0.001;

    // We lerp the POSITIONS directly towards the target shape
    // But we also multiply by the gestureScale "breathing" effect
    
    for (let i = 0; i < count * 3; i++) {
      const current = positions[i];
      const target = targets[i];
      
      // Interpolate towards the target shape form
      const diff = target - current;
      positions[i] += diff * lerpSpeed;
      
      // Apply momentary expansion/contraction based on gesture *after* shape lerp?
      // Actually, better to modify the mesh.scale, but that scales the whole coordinate system.
      // Modifying positions individually allows for "exploding" effects.
      // Let's stick to updating `mesh.scale` for the gesture to be performant,
      // and use the loop for shape morphing.
    }
    
    mesh.current.geometry.attributes.position.needsUpdate = true;
    
    // Apply hand gesture scale smoothly - 提高手势响应速度
    mesh.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.15);
  });

  return (
    <points ref={mesh} geometry={particles}>
      <pointsMaterial
        size={0.15}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

const ParticleScene: React.FC<ParticlesProps> = (props) => {
  return (
    <div className="w-full h-full bg-gradient-to-b from-gray-900 to-black">
      <Canvas 
        dpr={[1, 1.5]} 
        performance={{ min: 0.5 }}
        gl={{ 
          antialias: false,
          powerPreference: "high-performance"
        }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={60} />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
        <ambientLight intensity={0.5} />
        <ParticleSystem {...props} />
      </Canvas>
    </div>
  );
};

export default ParticleScene;
