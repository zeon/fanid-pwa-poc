
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import CameraSection from '@/components/auth/CameraSection';
import ScanProgress from '@/components/auth/ScanProgress';
import ScanControls from '@/components/auth/ScanControls';
import ScanInstructions from '@/components/auth/ScanInstructions';
import ScanCompletion from '@/components/auth/ScanCompletion';
import FaceScanningHeader from '@/components/auth/FaceScanningHeader';
import FaceScanningNotices from '@/components/auth/FaceScanningNotices';
import FaceScanningBackground from '@/components/auth/FaceScanningBackground';
import TextLanguageSwitcher from '@/components/navigation/TextLanguageSwitcher';
import { useFaceScanning } from '@/hooks/useFaceScanning';
import { useFaceScanningNavigation } from '@/hooks/useFaceScanningNavigation';

const FaceScanning = () => {
  const location = useLocation();
  const { t } = useTranslation();
  
  // Get user data from navigation state
  const userData = location.state || {};
  const isRescan = userData.isRescan || false;
  const isBiometricLogin = userData.isBiometricLogin || false;
  const isPurchaseVerification = userData.isPurchaseVerification || false;
  const isEntryVerification = userData.isEntryVerification || false;
  const isSignUpFlow = userData.fromSignUp || false;
  const purchaseData = userData.purchaseData || null;
  const eventName = userData.eventName || '';

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

  const { handleGoBack, handleScanComplete, handleDuplicateDetected } = useFaceScanningNavigation();

  const handleStartScan = () => {
    startFaceScan(
      // On successful completion
      () => {
        handleScanComplete({
          isBiometricLogin,
          isPurchaseVerification,
          isEntryVerification,
          purchaseData,
          userData,
          eventName,
          isRescan
        });
      },
      // On duplicate detection
      () => {
        handleDuplicateDetected(userData);
      },
      isRescan,
      isBiometricLogin,
      isPurchaseVerification || isEntryVerification
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Language switcher positioned at top right */}
      <div className="absolute top-6 right-6 z-20">
        <TextLanguageSwitcher />
      </div>

      <FaceScanningBackground />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
        <div className="w-full max-w-md">
          <FaceScanningHeader 
            isRescan={isRescan}
            isBiometricLogin={isBiometricLogin}
            isPurchaseVerification={isPurchaseVerification}
            isEntryVerification={isEntryVerification}
          />

          {/* Auth Form Container with Glowing Shadow */}
          <div className="relative">
            {/* Outer glow effect with slower animation */}
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl blur-xl animate-pulse" style={{ animationDuration: '3s' }}></div>
            
            {/* Inner glow rings */}
            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400/30 to-purple-400/30 rounded-lg blur-md"></div>
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-300/20 to-purple-300/20 rounded-lg blur-sm"></div>
            
            {/* Form container */}
            <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 shadow-2xl shadow-cyan-500/25">
              <div className="space-y-6">
                {/* Back Button */}
                <button
                  type="button"
                  onClick={() => handleGoBack(isPurchaseVerification, isEntryVerification, purchaseData)}
                  className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                >
                  <ArrowLeft size={16} />
                  {t('auth.faceScanning.back')}
                </button>

                <FaceScanningNotices 
                  isRescan={isRescan}
                  isBiometricLogin={isBiometricLogin}
                  isPurchaseVerification={isPurchaseVerification}
                  isEntryVerification={isEntryVerification}
                />

                {/* Camera Section */}
                <CameraSection
                  videoRef={videoRef}
                  stream={stream}
                  cameraError={cameraError}
                  isScanning={isScanning}
                  scanComplete={scanComplete}
                  isBiometricLogin={isBiometricLogin}
                  isPurchaseVerification={isPurchaseVerification}
                  isEntryVerification={isEntryVerification}
                  isSignUpFlow={isSignUpFlow}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaceScanning;
