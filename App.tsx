import React, { useState, useCallback } from 'react';
import ParticleScene from './components/ParticleScene';
import HandTracker from './components/HandTracker';
import Controls from './components/Controls';
import { ShapeType } from './types';

const App: React.FC = () => {
  const [shape, setShape] = useState<ShapeType>(ShapeType.HEART);
  const [color, setColor] = useState<string>('#ff0066');
  const [gestureScale, setGestureScale] = useState<number>(0);
  const [isHandDetected, setIsHandDetected] = useState<boolean>(false);

  const handleDistanceChange = useCallback((distance: number, detected: boolean) => {
    setIsHandDetected(detected);
    // Smooth the input slightly if needed, but for now direct mapping is responsive
    setGestureScale(distance);
  }, []);

  return (
    <div className="relative w-full h-full bg-black text-white overflow-hidden font-sans select-none">
      {/* 3D Scene */}
      <div className="absolute inset-0 z-0">
        <ParticleScene 
            shape={shape} 
            color={color} 
            gestureScale={gestureScale}
        />
      </div>

      {/* Camera Logic (Invisible/Miniaturized) */}
      <HandTracker onDistanceChange={handleDistanceChange} />

      {/* UI Layer */}
      <Controls 
        currentShape={shape} 
        setShape={setShape} 
        currentColor={color} 
        setColor={setColor} 
      />

      {/* Status Indicator */}
      <div className={`absolute bottom-6 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full backdrop-blur-md border transition-colors duration-500 z-30 ${isHandDetected ? 'bg-green-500/20 border-green-500/50 text-green-200' : 'bg-red-500/10 border-red-500/20 text-red-300'}`}>
        <div className="flex items-center gap-2">
            <span className={`block w-2 h-2 rounded-full ${isHandDetected ? 'bg-green-400 animate-pulse' : 'bg-red-500'}`}></span>
            <span className="text-xs font-semibold tracking-wide">
                {isHandDetected ? 'HANDS CONNECTED' : 'NO SIGNAL'}
            </span>
        </div>
      </div>
    </div>
  );
};

export default App;
