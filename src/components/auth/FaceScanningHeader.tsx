
import React from 'react';
import { useTranslation } from 'react-i18next';

interface FaceScanningHeaderProps {
  isRescan: boolean;
  isBiometricLogin: boolean;
  isPurchaseVerification: boolean;
  isEntryVerification?: boolean;
}

const FaceScanningHeader = ({ 
  isRescan, 
  isBiometricLogin, 
  isPurchaseVerification,
  isEntryVerification = false
}: FaceScanningHeaderProps) => {
  const { t } = useTranslation();

  const getTitle = () => {
    if (isEntryVerification) return t('auth.faceScanning.entryVerification');
    if (isPurchaseVerification) return t('auth.faceScanning.purchaseVerification');
    if (isBiometricLogin) return t('auth.faceScanning.biometricLogin');
    if (isRescan) return t('auth.faceScanning.reScanBiometric');
    return t('auth.faceScanning.biometricSetup');
  };

  const getSubtitle = () => {
    if (isEntryVerification) return t('auth.faceScanning.entrySubtitle');
    if (isPurchaseVerification) return t('auth.faceScanning.purchaseSubtitle');
    if (isBiometricLogin) return t('auth.faceScanning.loginSubtitle');
    if (isRescan) return t('auth.faceScanning.rescanSubtitle');
    return t('auth.faceScanning.setupSubtitle');
  };

  return (
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
  );
};

export default FaceScanningHeader;
