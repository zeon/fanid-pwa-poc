
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import AuthLayout from '@/components/auth/AuthLayout';
import CameraSection from '@/components/auth/CameraSection';
import ScanProgress from '@/components/auth/ScanProgress';
import ScanControls from '@/components/auth/ScanControls';
import ScanInstructions from '@/components/auth/ScanInstructions';
import ScanCompletion from '@/components/auth/ScanCompletion';
import TextLanguageSwitcher from '@/components/navigation/TextLanguageSwitcher';
import { useFaceScanning } from '@/hooks/useFaceScanning';

const FaceScanning = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  
  // Get user data from navigation state
  const userData = location.state || {};
  const isRescan = userData.isRescan || false;
  const isBiometricLogin = userData.isBiometricLogin || false;
  const isTicketPurchase = userData.isTicketPurchase || false;
  const purchaseData = userData.purchaseData;

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
        } else if (isTicketPurchase) {
          console.log('Face verification for ticket purchase successful, navigating to payment confirmation');
          navigate('/payment-confirmation', { 
            state: { purchaseData }
          });
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
    if (isTicketPurchase) return t('auth.faceScanning.ticketPurchaseVerification');
    if (isBiometricLogin) return t('auth.faceScanning.biometricLogin');
    if (isRescan) return t('auth.faceScanning.reScanBiometric');
    return t('auth.faceScanning.biometricSetup');
  };

  const getSubtitle = () => {
    if (isTicketPurchase) return t('auth.faceScanning.ticketPurchaseSubtitle');
    if (isBiometricLogin) return t('auth.faceScanning.loginSubtitle');
    if (isRescan) return t('auth.faceScanning.rescanSubtitle');
    return t('auth.faceScanning.setupSubtitle');
  };

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Language switcher positioned at top right */}
      <div className="absolute top-6 right-6 z-20">
        <TextLanguageSwitcher />
      </div>

      {/* Cyberpunk grid background with reduced opacity */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      {/* Neon glow effects */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mb-4">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
                Fan Verse
              </h1>
              <div className="w-16 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto"></div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">{getTitle()}</h2>
            <p className="text-gray-400 text-sm">{getSubtitle()}</p>
          </div>

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
                  onClick={handleGoBack}
                  className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                >
                  <ArrowLeft size={16} />
                  {t('auth.faceScanning.back')}
                </button>

                {/* Ticket Purchase Notice */}
                {isTicketPurchase && purchaseData && (
                  <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-lg p-3">
                    <p className="text-cyan-400 text-sm text-center mb-2">
                      {t('auth.faceScanning.ticketPurchaseNotice')}
                    </p>
                    <div className="text-xs text-gray-300 text-center">
                      <p>{purchaseData.eventName}</p>
                      <p>{purchaseData.quantity} tickets - ${purchaseData.totalPrice}</p>
                    </div>
                  </div>
                )}

                {/* Biometric Login Notice */}
                {isBiometricLogin && (
                  <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-lg p-3">
                    <p className="text-cyan-400 text-sm text-center">
                      {t('auth.faceScanning.loginNotice')}
                    </p>
                  </div>
                )}

                {/* Re-scan Notice */}
                {isRescan && (
                  <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-3">
                    <p className="text-orange-400 text-sm text-center">
                      {t('auth.faceScanning.rescanNotice')}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaceScanning;
