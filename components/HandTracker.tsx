import React, { useEffect, useRef, useState } from 'react';
import { FilesetResolver, HandLandmarker } from '@mediapipe/tasks-vision';

interface HandTrackerProps {
  onDistanceChange: (distance: number, detected: boolean) => void;
}

const HandTracker: React.FC<HandTrackerProps> = ({ onDistanceChange }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let handLandmarker: HandLandmarker | null = null;
    let animationFrameId: number;

    const setupMediaPipe = async () => {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
        );
        
        handLandmarker = await HandLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
            delegate: "GPU"
          },
          runningMode: "VIDEO",
          numHands: 2
        });

        startWebcam(handLandmarker);
      } catch (err) {
        console.error("MediaPipe Error:", err);
        setError("Failed to load hand tracking. Check connection.");
        setLoading(false);
      }
    };

    const startWebcam = async (landmarker: HandLandmarker) => {
      if (!videoRef.current) return;

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { 
            width: 640, 
            height: 480, 
            facingMode: 'user',
            frameRate: { ideal: 30, max: 60 } // 提高帧率
          }
        });
        videoRef.current.srcObject = stream;
        videoRef.current.addEventListener('loadeddata', () => {
          setLoading(false);
          predictWebcam(landmarker);
        });
      } catch (err) {
        setError("Camera access denied.");
        setLoading(false);
      }
    };

    const predictWebcam = (landmarker: HandLandmarker) => {
      if (!videoRef.current) return;
      
      const startTimeMs = performance.now();
      if (videoRef.current.videoWidth > 0) {
        const result = landmarker.detectForVideo(videoRef.current, startTimeMs);
        
        if (result.landmarks && result.landmarks.length > 0) {
          let dist = 0;
          
          // Logic: 
          // If 2 hands: Distance between Wrist(0) of Hand A and Wrist(0) of Hand B
          // If 1 hand: Distance between Thumb Tip(4) and Index Tip(8) (Pinch)
          
          if (result.landmarks.length === 2) {
            // Two hands mode - "Expansion"
            const hand1 = result.landmarks[0][0]; // Wrist
            const hand2 = result.landmarks[1][0]; // Wrist
            
            // Calculate euclidean distance (normalized coordinates 0-1)
            const dx = hand1.x - hand2.x;
            const dy = hand1.y - hand2.y;
            // dz is usually less reliable in 2D video without depth sensor, but mediapipe estimates it. We use x/y mainly.
            dist = Math.sqrt(dx * dx + dy * dy);
            
            // Map typical comfortable arm span in frame (approx 0.1 to 0.8) to a scale factor
            // Let's normalize it to 0-1 range roughly - 提高灵敏度
            dist = Math.min(Math.max((dist - 0.05) * 2, 0), 2); 
            
          } else if (result.landmarks.length === 1) {
            // One hand mode - "Pinch"
            const thumb = result.landmarks[0][4];
            const index = result.landmarks[0][8];
            const dx = thumb.x - index.x;
            const dy = thumb.y - index.y;
            const d = Math.sqrt(dx * dx + dy * dy);
            // Pinch is usually 0.02 to 0.3 - 提高灵敏度
            dist = Math.min(Math.max((d - 0.03) * 5, 0), 1.5);
          }

          onDistanceChange(dist, true);
        } else {
          onDistanceChange(0, false);
        }
      }
      
      animationFrameId = requestAnimationFrame(() => predictWebcam(landmarker));
    };

    setupMediaPipe();

    return () => {
      cancelAnimationFrame(animationFrameId);
      handLandmarker?.close();
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="absolute top-4 left-4 z-50 overflow-hidden rounded-lg shadow-lg border border-white/10 w-32 h-24 bg-black/80">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className={`w-full h-full object-cover transform -scale-x-100 opacity-50 ${loading ? 'hidden' : 'block'}`}
      />
      {loading && (
        <div className="flex items-center justify-center h-full text-xs text-gray-400">
          Init Vision...
        </div>
      )}
      {error && (
        <div className="flex items-center justify-center h-full text-xs text-red-500 p-1 text-center">
          {error}
        </div>
      )}
      <div className="absolute bottom-0 w-full bg-black/50 text-[10px] text-white text-center py-0.5">
        Webcam Feed
      </div>
    </div>
  );
};

export default HandTracker;
