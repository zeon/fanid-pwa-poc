
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import CyberpunkButton from '@/components/auth/CyberpunkButton';

const EarlyAccessSection = () => {
  const { t } = useTranslation();

  return (
    <Card className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 mb-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10"></div>
      <div className="absolute inset-0 border border-cyan-500/20 rounded-lg"></div>
      <CardHeader className="relative">
        <CardTitle className="text-2xl text-white flex items-center">
          <Clock className="w-6 h-6 text-cyan-400 mr-3" />
          {t('dashboard.artistMembership.earlyAccess.title')}
        </CardTitle>
        <p className="text-gray-300">{t('dashboard.artistMembership.earlyAccess.subtitle')}</p>
      </CardHeader>
      <CardContent className="relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-700/50 border border-cyan-500/30 rounded-lg p-6 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-cyan-500/5"></div>
            <div className="relative text-cyan-400 text-2xl font-bold mb-2">{t('dashboard.artistMembership.earlyAccess.position')}</div>
            <p className="relative text-gray-300 text-sm">{t('dashboard.artistMembership.earlyAccess.queueStatus')}</p>
            <Badge className="relative mt-2 bg-cyan-500/20 text-cyan-400 border-cyan-500/50">
              {t('dashboard.artistMembership.earlyAccess.queueActive')}
            </Badge>
          </div>
          <div className="bg-gray-700/50 border border-purple-500/30 rounded-lg p-6 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-purple-500/5"></div>
            <div className="relative text-purple-400 text-2xl font-bold mb-2">{t('dashboard.artistMembership.earlyAccess.timeLeft')}</div>
            <p className="relative text-gray-300 text-sm">{t('dashboard.artistMembership.earlyAccess.nextSale')}</p>
          </div>
          <div className="bg-gray-700/50 border border-gray-600/50 rounded-lg p-6 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5"></div>
            <CyberpunkButton variant="primary" size="sm" className="relative w-full">
              <Clock className="w-4 h-4 mr-2" />
              {t('dashboard.artistMembership.earlyAccess.joinQueue')}
            </CyberpunkButton>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EarlyAccessSection;
