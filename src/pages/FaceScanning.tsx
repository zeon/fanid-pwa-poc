
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import AuthLayout from '@/components/auth/AuthLayout';
import CameraSection from '@/components/auth/CameraSection';
import ScanProgress from '@/components/auth/ScanProgress';
import ScanControls from '@/components/auth/ScanControls';
import ScanInstructions from '@/components/auth/ScanInstructions';
import ScanCompletion from '@/components/auth/ScanCompletion';
import { useFaceScanning } from '@/hooks/useFaceScanning';

const FaceScanning = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get user data from navigation state
  const userData = location.state || {};

  const {
    videoRef,
    stream,
    cameraError,
    isScanning,
    scanProgress,
    currentStep,
    scanComplete,
    steps,
    startFaceScan,
    handleRetry
  } = useFaceScanning();

  const handleStartScan = () => {
    startFaceScan(() => {
      navigate('/dashboard', { 
        state: { 
          ...userData,
          faceScanned: true,
          message: 'Account created successfully! Face scan completed.'
        }
      });
    });
  };

  const handleSkip = () => {
    navigate('/dashboard', { 
      state: { 
        ...userData,
        faceScanned: false,
        message: 'Account created successfully! You can set up face scanning later in settings.'
      }
    });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <AuthLayout 
      title="BIOMETRIC SETUP" 
      subtitle="Secure your account with face recognition"
    >
      <div className="space-y-6">
        {/* Back Button */}
        <button
          type="button"
          onClick={handleGoBack}
          className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors text-sm"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        {/* Camera Section */}
        <CameraSection
          videoRef={videoRef}
          stream={stream}
          cameraError={cameraError}
          isScanning={isScanning}
          scanComplete={scanComplete}
          onRetry={handleRetry}
        />

        {/* Instructions */}
        <ScanInstructions
          scanComplete={scanComplete}
          isScanning={isScanning}
        />

        {/* Progress Section */}
        <ScanProgress
          isScanning={isScanning}
          scanProgress={scanProgress}
          currentStep={currentStep}
          steps={steps}
        />

        {/* Action Buttons */}
        <ScanControls
          isScanning={isScanning}
          scanComplete={scanComplete}
          stream={stream}
          onStartScan={handleStartScan}
          onSkip={handleSkip}
        />

        {/* Completion Indicator */}
        <ScanCompletion scanComplete={scanComplete} />
      </div>
    </AuthLayout>
  );
};

export default FaceScanning;
