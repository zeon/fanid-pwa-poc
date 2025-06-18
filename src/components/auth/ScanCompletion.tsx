
import React from 'react';
import { useTranslation } from 'react-i18next';

interface ScanCompletionProps {
  scanComplete: boolean;
}

const ScanCompletion = ({ scanComplete }: ScanCompletionProps) => {
  const { t } = useTranslation();

  if (!scanComplete) return null;

  return (
    <div className="text-center">
      <p className="text-green-400 text-sm mb-4">
        {t('auth.faceScanning.instructions.completed')}
      </p>
      <div className="w-6 h-6 border-2 border-green-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
    </div>
  );
};

export default ScanCompletion;
