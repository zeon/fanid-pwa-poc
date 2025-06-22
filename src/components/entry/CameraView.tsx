
import React, { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Camera, AlertCircle } from 'lucide-react';
import { useCameraAccess } from '@/hooks/useCameraAccess';

interface CameraViewProps {
  isScanning: boolean;
  onCameraReady?: () => void;
}

const CameraView = ({ isScanning, onCameraReady }: CameraViewProps) => {
  const { videoRef, isStreaming, hasPermission, error, startCamera } = useCameraAccess();

  useEffect(() => {
    startCamera();
    
    return () => {
      // Cleanup handled by the hook
    };
  }, [startCamera]);

  useEffect(() => {
    if (isStreaming && onCameraReady) {
      onCameraReady();
    }
  }, [isStreaming, onCameraReady]);

  if (error || hasPermission === false) {
    return (
      <Card className="bg-gray-800/80 backdrop-blur-sm border-gray-700">
        <CardContent className="p-6">
          <div className="text-center text-red-400">
            <AlertCircle className="w-12 h-12 mx-auto mb-4" />
            <p className="font-medium mb-2">Camera Access Required</p>
            <p className="text-sm text-gray-400">
              Please allow camera access to scan QR codes
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gray-800/80 backdrop-blur-sm border-gray-700 overflow-hidden">
      <CardContent className="p-0">
        <div className="relative aspect-square bg-black">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
          
          {/* Scanning overlay - only show the border, remove text */}
          {isScanning && (
            <div className="absolute inset-4 border-2 border-cyan-400 rounded-lg">
              <div className="absolute inset-0 border border-cyan-400/30 rounded-lg animate-pulse"></div>
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-cyan-400 animate-pulse"></div>
            </div>
          )}
          
          {/* Camera loading state */}
          {!isStreaming && !error && hasPermission !== false && (
            <div className="absolute inset-0 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <Camera className="w-12 h-12 mx-auto mb-2 animate-pulse" />
                <p>Initializing camera...</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CameraView;
