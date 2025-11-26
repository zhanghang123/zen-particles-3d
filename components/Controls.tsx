import React, { useState } from 'react';
import { ShapeType } from '../types';

interface ControlsProps {
  currentShape: ShapeType;
  setShape: (s: ShapeType) => void;
  currentColor: string;
  setColor: (c: string) => void;
}

const Controls: React.FC<ControlsProps> = ({ currentShape, setShape, currentColor, setColor }) => {
  const [isOpen, setIsOpen] = useState(true);

  const shapes = [
    { type: ShapeType.HEART, label: '❤️ Love', color: '#ff0066' },
    { type: ShapeType.FLOWER, label: '🌸 Flower', color: '#ff66b2' },
    { type: ShapeType.SATURN, label: '🪐 Saturn', color: '#ffcc00' },
    { type: ShapeType.BUDDHA, label: '🧘 Zen', color: '#00ffcc' },
    { type: ShapeType.FIREWORKS, label: '🎆 Boom', color: '#ff3333' },
    { type: ShapeType.SPHERE, label: '⚪ Sphere', color: '#ffffff' },
  ];

  return (
    <>
        <button 
            onClick={() => setIsOpen(!isOpen)}
            className="absolute top-4 right-4 z-50 p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition"
        >
            {isOpen ? 
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg> : 
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            }
        </button>

        <div className={`absolute top-0 right-0 h-full w-80 bg-black/40 backdrop-blur-xl border-l border-white/10 transform transition-transform duration-300 ease-in-out z-40 p-6 flex flex-col gap-6 pt-20 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            
            <div>
                <h2 className="text-2xl font-light text-white mb-1">Visuals</h2>
                <p className="text-xs text-gray-400">Select a manifestation</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
                {shapes.map((s) => (
                    <button
                        key={s.type}
                        onClick={() => {
                            setShape(s.type);
                            // Optional: auto set color when shape changes to match theme, but let user override
                            if (currentColor === '#ffffff') setColor(s.color);
                        }}
                        className={`p-4 rounded-xl border transition-all duration-300 flex flex-col items-center justify-center gap-2 group ${currentShape === s.type ? 'bg-white/10 border-white/50 shadow-[0_0_15px_rgba(255,255,255,0.2)]' : 'bg-transparent border-white/10 hover:border-white/30'}`}
                    >
                        <span className="text-2xl filter drop-shadow-lg group-hover:scale-110 transition-transform">{s.label.split(' ')[0]}</span>
                        <span className="text-xs font-medium text-gray-300">{s.label.split(' ')[1]}</span>
                    </button>
                ))}
            </div>

            <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-300">Energy Color</h3>
                <div className="flex items-center gap-4 bg-white/5 p-3 rounded-lg border border-white/10">
                    <input 
                        type="color" 
                        value={currentColor}
                        onChange={(e) => setColor(e.target.value)}
                        className="w-10 h-10 rounded-full cursor-pointer bg-transparent border-none p-0 overflow-hidden"
                    />
                    <div className="flex-1">
                        <div className="text-xs text-gray-400 uppercase tracking-wider">Hex Code</div>
                        <div className="font-mono text-white">{currentColor}</div>
                    </div>
                </div>
            </div>

            <div className="mt-auto p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-400 leading-relaxed">
                <strong className="text-white block mb-1">Instructions:</strong>
                <ul className="list-disc pl-4 space-y-1">
                    <li>Allow camera access to enable interaction.</li>
                    <li>Open/Close two hands to expand/contract the universe.</li>
                    <li>Or pinch index & thumb with one hand.</li>
                    <li>Click & Drag to rotate view.</li>
                </ul>
            </div>
        </div>
    </>
  );
};

export default Controls;
