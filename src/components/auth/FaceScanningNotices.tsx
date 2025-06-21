
import React from 'react';
import { useTranslation } from 'react-i18next';

interface FaceScanningNoticesProps {
  isRescan: boolean;
  isBiometricLogin: boolean;
  isPurchaseVerification: boolean;
}

const FaceScanningNotices = ({ 
  isRescan, 
  isBiometricLogin, 
  isPurchaseVerification 
}: FaceScanningNoticesProps) => {
  const { t } = useTranslation();

  return (
    <>
      {/* Purchase Verification Notice */}
      {isPurchaseVerification && (
        <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-3">
          <p className="text-green-400 text-sm text-center">
            {t('auth.faceScanning.purchaseNotice')}
          </p>
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
    </>
  );
};

export default FaceScanningNotices;
