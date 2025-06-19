
import React from 'react';
import { QrCode } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface FanIdSectionProps {
  fanId: string;
}

const FanIdSection = ({ fanId }: FanIdSectionProps) => {
  const { t } = useTranslation();

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-xl text-white flex items-center gap-2">
          <QrCode className="h-5 w-5 text-cyan-400" />
          {t('profile.fanId')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-cyan-400 text-sm font-medium uppercase tracking-wide">
              {t('profile.fanId')}
            </p>
            <p className="text-white text-lg font-mono">{fanId}</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <div className="bg-white p-4 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                <img 
                  src="/lovable-uploads/246d4fa3-f3c0-4a99-87f2-59e45c844aaf.png" 
                  alt="Fan ID QR Code"
                  className="w-24 h-24 object-contain"
                />
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-gray-800 border-gray-700">
              <DialogHeader>
                <DialogTitle className="text-white text-center">
                  {t('profile.fanId')} - {fanId}
                </DialogTitle>
              </DialogHeader>
              <div className="flex justify-center">
                <div className="bg-white p-6 rounded-lg">
                  <img 
                    src="/lovable-uploads/246d4fa3-f3c0-4a99-87f2-59e45c844aaf.png" 
                    alt="Fan ID QR Code"
                    className="w-64 h-64 object-contain"
                  />
                </div>
              </div>
              <p className="text-gray-400 text-sm text-center">
                {t('profile.qrCodeDescription')}
              </p>
            </DialogContent>
          </Dialog>
        </div>
        <p className="text-gray-400 text-sm">
          {t('profile.qrCodeDescription')}
        </p>
      </CardContent>
    </Card>
  );
};

export default FanIdSection;
