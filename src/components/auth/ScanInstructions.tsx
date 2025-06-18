
import React from 'react';
import { useTranslation } from 'react-i18next';

interface ScanInstructionsProps {
  scanComplete: boolean;
  isScanning: boolean;
}

const ScanInstructions = ({ scanComplete, isScanning }: ScanInstructionsProps) => {
  const { t } = useTranslation();

  return (
    <div className="text-center space-y-2">
      <p className="text-gray-300">
        {scanComplete 
          ? t('auth.faceScanning.instructions.completed')
          : isScanning 
            ? t('auth.faceScanning.instructions.scanning')
            : t('auth.faceScanning.instructions.initial')
        }
      </p>
      {!scanComplete && !isScanning && (
        <p className="text-gray-400 text-sm">
          {t('auth.faceScanning.instructions.helpText')}
        </p>
      )}
    </div>
  );
};

export default ScanInstructions;
