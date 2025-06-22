
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { QrCode } from 'lucide-react';
import CameraView from './CameraView';

interface QRScannerViewProps {
  isScanning: boolean;
  onStartScanning: () => void;
}

const QRScannerView = ({ isScanning, onStartScanning }: QRScannerViewProps) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <QrCode className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-white mb-2">{t('qrScanner.title')}</h2>
        <p className="text-gray-400">{t('qrScanner.subtitle')}</p>
      </div>

      <div className="max-w-md mx-auto space-y-4">
        <CameraView isScanning={isScanning} />
        
        <Button 
          onClick={onStartScanning}
          disabled={isScanning}
          className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 disabled:opacity-50"
        >
          {isScanning ? t('qrScanner.scanning') : t('qrScanner.startScanning')}
        </Button>
      </div>

      <div className="text-center text-sm text-gray-400 space-y-1">
        <p>{t('qrScanner.instructions.position')}</p>
        <p>{t('qrScanner.instructions.auto')}</p>
      </div>
    </div>
  );
};

export default QRScannerView;
