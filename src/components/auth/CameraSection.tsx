
import React, { useEffect } from 'react';
import { AlertCircle, RefreshCw, Check } from 'lucide-react';
import CyberpunkButton from './CyberpunkButton';

interface CameraSectionProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  stream: MediaStream | null;
  cameraError: string;
  isScanning: boolean;
  scanComplete: boolean;
  isBiometricLogin?: boolean;
  isPurchaseVerification?: boolean;
  isEntryVerification?: boolean;
  isSignUpFlow?: boolean;
  onRetry: () => void;
}

const CameraSection = ({
  videoRef,
  stream,
  cameraError,
  isScanning,
  scanComplete,
  isBiometricLogin = false,
  isPurchaseVerification = false,
  isEntryVerification = false,
  isSignUpFlow = false,
  onRetry
}: CameraSectionProps) => {
  
  // Debug logging
  useEffect(() => {
    console.log('CameraSection Debug:', {
      isSignUpFlow,
      isBiometricLogin,
      isPurchaseVerification,
      isEntryVerification,
      hasStream: !!stream
    });
  }, [isSignUpFlow, isBiometricLogin, isPurchaseVerification, isEntryVerification, stream]);
  
  return (
    <div className="relative">
      <div className="relative bg-gray-900 rounded-full overflow-hidden w-full max-w-sm mx-auto aspect-square sm:max-w-md md:max-w-lg">
        {cameraError ? (
          <div className="flex flex-col items-center justify-center h-full p-4 sm:p-6 text-center">
            <AlertCircle className="text-red-400 mb-4" size={48} />
            <p className="text-gray-300 mb-4 text-sm">{cameraError}</p>
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
            
            {/* Avatar Image Overlay for Biometric Login, Purchase Verification, Entry Verification, and Sign Up */}
            {(isBiometricLogin || isPurchaseVerification || isEntryVerification || isSignUpFlow) && stream && (
              <div className="absolute inset-0 bg-gray-900/80 flex items-center justify-center">
                <div className="w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-full overflow-hidden border-2 border-cyan-400 shadow-lg shadow-cyan-400/50">
                  <img 
                    src={isSignUpFlow ? "/lovable-uploads/da035045-3426-4c78-8d1e-515e2c401477.png" : "/lovable-uploads/2ad563c3-1d96-484a-8dd3-e48291a2b95d.png"} 
                    alt={isSignUpFlow ? "Sign Up Flow" : isEntryVerification ? "Entry Verification" : isPurchaseVerification ? "Purchase Verification" : "Biometric Login"} 
                    className="w-full h-full object-cover" 
                  />
                </div>
              </div>
            )}
            
            {/* Face Detection Overlay for Regular Setup */}
            {stream && !isBiometricLogin && !isPurchaseVerification && !isEntryVerification && !isSignUpFlow && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 border-2 rounded-full transition-colors duration-300 ${
                  scanComplete 
                    ? 'border-green-400 shadow-lg shadow-green-400/50' 
                    : isScanning 
                    ? 'border-cyan-400 shadow-lg shadow-cyan-400/50 animate-pulse' 
                    : 'border-gray-400'
                }`}>
                  {/* Corner indicators */}
                  <div className="absolute -top-1 -left-1 w-4 h-4 sm:w-5 sm:h-5 border-l-2 border-t-2 border-cyan-400"></div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 border-r-2 border-t-2 border-cyan-400"></div>
                  <div className="absolute -bottom-1 -left-1 w-4 h-4 sm:w-5 sm:h-5 border-l-2 border-b-2 border-cyan-400"></div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 border-r-2 border-b-2 border-cyan-400"></div>
                  
                  {/* Center indicator */}
                  {scanComplete && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Check className="text-green-400" size={32} />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Face Detection Overlay for Biometric Login, Purchase Verification, Entry Verification, and Sign Up (simplified) */}
            {stream && (isBiometricLogin || isPurchaseVerification || isEntryVerification || isSignUpFlow) && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className={`relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 border-2 rounded-full transition-colors duration-300 ${
                  scanComplete 
                    ? 'border-green-400 shadow-lg shadow-green-400/50' 
                    : isScanning 
                    ? 'border-cyan-400 shadow-lg shadow-cyan-400/50 animate-pulse' 
                    : 'border-gray-400'
                }`}>
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
