
import React from 'react';
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
                  {isSignUpFlow ? (
                    /* Face Scanning Interface Icon for Sign Up Flow */
                    <div className="w-full h-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center relative">
                      {/* Corner brackets */}
                      <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-white/80"></div>
                      <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-white/80"></div>
                      <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-white/80"></div>
                      <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-white/80"></div>
                      
                      {/* Face outline */}
                      <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <image href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AABhkklEQVR4nO3dd5xU1d0/8M/3zBaKAgIKoigo0lawABYUBekItggxJpqYmG4SkzwpT5InIc8vzfT+JDHGRGOMEAugNGkqYkFEQKQK2LDR++7O3M/vDxbYMjttZ+fcmfm8Xy8T5sydez67O3PPd85thkKwmS1alaOiBOgdAN0NQTfATjGgI4gTAbSBwRnRFgDAwy+z2utopK3OYwDGxI/jLlNr/XX6SKXPzHJFzbAXAd4BsRZmyw1Y8HovPAuzWMPEIiLA0IUsabEPFxlxRQCeZ0BvEJ0MOB5ASaLXxtsWpqr+NjEb6m8jG2ikLwN2EwgA7AHwngH..." width="512" height="512"/>
</svg>
                      
                      {/* Center crosshair */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="w-8 h-8 border border-white/60 rounded-full flex items-center justify-center">
                          <div className="w-1 h-1 bg-white rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <img 
                      src="/lovable-uploads/2ad563c3-1d96-484a-8dd3-e48291a2b95d.png"
                      alt={isEntryVerification ? "Entry Verification" : isPurchaseVerification ? "Purchase Verification" : "Biometric Login"} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.warn('Failed to load avatar image, using fallback');
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                  )}
                  {/* Fallback for other flows if image fails */}
                  {!isSignUpFlow && (
                    <div className="hidden w-full h-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                      <svg width="120" height="120" viewBox="0 0 200 200" className="text-white">
                        <circle cx="100" cy="100" r="90" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2"/>
                        <circle cx="75" cy="80" r="8" fill="currentColor"/>
                        <circle cx="125" cy="80" r="8" fill="currentColor"/>
                        <path d="M 70 130 Q 100 150 130 130" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round"/>
                      </svg>
                    </div>
                  )}
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
