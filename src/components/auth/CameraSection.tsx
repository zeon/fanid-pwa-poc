
import React from 'react';
import { AlertCircle, RefreshCw, Check } from 'lucide-react';
import CyberpunkButton from './CyberpunkButton';

interface CameraSectionProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  stream: MediaStream | null;
  cameraError: string;
  isScanning: boolean;
  scanComplete: boolean;
  onRetry: () => void;
}

const CameraSection = ({ 
  videoRef, 
  stream, 
  cameraError, 
  isScanning, 
  scanComplete, 
  onRetry 
}: CameraSectionProps) => {
  return (
    <div className="relative">
      <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video">
        {cameraError ? (
          <div className="flex flex-col items-center justify-center h-full p-6 text-center">
            <AlertCircle className="text-red-400 mb-4" size={48} />
            <p className="text-gray-300 mb-4">{cameraError}</p>
            <CyberpunkButton onClick={onRetry} variant="secondary" size="sm">
              <RefreshCw size={16} className="mr-2" />
              Retry
            </CyberpunkButton>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            
            {/* Face Detection Overlay - Oval Shape */}
            {stream && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`relative w-48 h-60 border-2 transition-colors duration-300 ${
                  scanComplete 
                    ? 'border-green-400 shadow-lg shadow-green-400/50' 
                    : isScanning 
                      ? 'border-cyan-400 shadow-lg shadow-cyan-400/50 animate-pulse' 
                      : 'border-gray-400'
                }`}
                style={{
                  borderRadius: '50%',
                  transform: 'scale(1, 1.25)'
                }}>
                  {/* Corner indicators positioned for oval shape */}
                  <div className="absolute -top-2 left-1/4 w-4 h-4 border-l-2 border-t-2 border-cyan-400 transform -rotate-45"></div>
                  <div className="absolute -top-2 right-1/4 w-4 h-4 border-r-2 border-t-2 border-cyan-400 transform rotate-45"></div>
                  <div className="absolute -bottom-2 left-1/4 w-4 h-4 border-l-2 border-b-2 border-cyan-400 transform rotate-45"></div>
                  <div className="absolute -bottom-2 right-1/4 w-4 h-4 border-r-2 border-b-2 border-cyan-400 transform -rotate-45"></div>
                  
                  {/* Center indicator */}
                  {scanComplete && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Check className="text-green-400" size={32} />
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CameraSection;
