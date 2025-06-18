
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AlertTriangle, RotateCcw } from 'lucide-react';
import AuthLayout from '@/components/auth/AuthLayout';
import CyberpunkButton from '@/components/auth/CyberpunkButton';
import TextLanguageSwitcher from '@/components/navigation/TextLanguageSwitcher';

const FaceDuplicateDetected = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  
  // Get user data from navigation state
  const userData = location.state || {};

  const handleRescan = () => {
    navigate('/face-scanning', { 
      state: { 
        ...userData,
        isRescan: true // Flag to indicate this is a re-scan attempt
      }
    });
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
            <h2 className="text-2xl font-bold text-white mb-2">{t('auth.faceDuplicate.title')}</h2>
            <p className="text-gray-400 text-sm">{t('auth.faceDuplicate.subtitle')}</p>
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
              <div className="space-y-6 text-center">
                {/* Warning Icon */}
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center animate-pulse">
                      <AlertTriangle className="text-white" size={48} />
                    </div>
                    <div className="absolute -inset-2 bg-gradient-to-r from-orange-400/30 to-red-400/30 rounded-full blur-md animate-pulse"></div>
                  </div>
                </div>

                {/* Warning Message */}
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-orange-400">
                    {t('auth.faceDuplicate.duplicateDetected')}
                  </h3>
                  <p className="text-gray-300 text-sm">
                    {t('auth.faceDuplicate.description')}
                  </p>
                  <p className="text-gray-400 text-xs">
                    {t('auth.faceDuplicate.tryAgain')}
                  </p>
                </div>

                {/* Security Notice */}
                <div className="bg-gray-700/50 rounded-lg p-4 space-y-2">
                  <div className="flex items-center justify-center gap-2 text-orange-400 text-sm">
                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                    <span>{t('auth.faceDuplicate.securityVerification')}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-yellow-400 text-sm">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                    <span>{t('auth.faceDuplicate.rescanRecommended')}</span>
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-4">
                  <CyberpunkButton 
                    onClick={handleRescan}
                    variant="primary"
                    size="lg"
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <RotateCcw size={20} />
                    {t('auth.faceDuplicate.rescanButton')}
                  </CyberpunkButton>
                </div>

                {/* Help Text */}
                <p className="text-gray-500 text-xs mt-6">
                  {t('auth.faceDuplicate.helpText')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaceDuplicateDetected;
