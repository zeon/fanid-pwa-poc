
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
  const isRescan = userData.isRescan || false;
  const isBiometricLogin = userData.isBiometricLogin || false;

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
    startFaceScan(
      // On successful completion
      () => {
        if (isBiometricLogin) {
          console.log('Biometric login successful, navigating to dashboard');
          navigate('/dashboard');
        } else {
          navigate('/face-scan-complete', { 
            state: userData
          });
        }
      },
      // On duplicate detection
      () => {
        navigate('/face-duplicate-detected', { 
          state: userData
        });
      },
      isRescan,
      isBiometricLogin
    );
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const getTitle = () => {
    if (isBiometricLogin) return "BIOMETRIC LOGIN";
    if (isRescan) return "RE-SCAN BIOMETRIC";
    return "BIOMETRIC SETUP";
  };

  const getSubtitle = () => {
    if (isBiometricLogin) return "Scan your face to access your account";
    if (isRescan) return "Please scan your face again for verification";
    return "Secure your account with face recognition";
  };

  return (
    <AuthLayout 
      title={getTitle()} 
      subtitle={getSubtitle()}
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

        {/* Biometric Login Notice */}
        {isBiometricLogin && (
          <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-lg p-3">
            <p className="text-cyan-400 text-sm text-center">
              Position your face within the frame for secure login
            </p>
          </div>
        )}

        {/* Re-scan Notice */}
        {isRescan && (
          <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-3">
            <p className="text-orange-400 text-sm text-center">
              Re-scanning to ensure accurate biometric capture
            </p>
          </div>
        )}

        {/* Camera Section */}
        <CameraSection
          videoRef={videoRef}
          stream={stream}
          cameraError={cameraError}
          isScanning={isScanning}
          scanComplete={scanComplete}
          isBiometricLogin={isBiometricLogin}
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
          onSkip={() => {}} // Empty function since Skip is removed
        />

        {/* Completion Indicator */}
        <ScanCompletion scanComplete={scanComplete} />
      </div>
    </AuthLayout>
  );
};

export default FaceScanning;
