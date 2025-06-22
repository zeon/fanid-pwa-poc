
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { XCircle, AlertTriangle } from 'lucide-react';

interface QRScanErrorProps {
  onTryAgain: () => void;
  onReset: () => void;
}

const QRScanError = ({ onTryAgain, onReset }: QRScanErrorProps) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <XCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-white mb-2">{t('scanError.title')}</h2>
        <p className="text-gray-400">{t('scanError.subtitle')}</p>
      </div>

      <Card className="bg-gray-800/80 backdrop-blur-sm border-red-700/50 max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-red-400 flex items-center justify-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            {t('scanError.title')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 text-center">
            <p className="text-red-300 text-sm">
              {t('scanError.errorMessage')}
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center max-w-md mx-auto">
        <Button 
          onClick={onReset}
          variant="outline"
          className="w-full border-gray-600 text-gray-400 hover:bg-gray-700"
        >
          {t('scanError.scanNext')}
        </Button>
      </div>
    </div>
  );
};

export default QRScanError;
