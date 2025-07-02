
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import CyberpunkButton from '@/components/auth/CyberpunkButton';
import QueueSuccessToast from './QueueSuccessToast';

const EarlyAccessSection = () => {
  const { t } = useTranslation();
  const [isInQueue, setIsInQueue] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [queuePosition, setQueuePosition] = useState(254);

  const handleJoinQueue = () => {
    setIsInQueue(true);
    setQueuePosition(prev => prev + 1);
    setShowSuccessToast(true);
    
    // Auto-close the toast after 3 seconds
    setTimeout(() => {
      setShowSuccessToast(false);
    }, 3000);
  };

  return (
    <>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-700/50 border border-cyan-500/30 rounded-lg p-6 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-cyan-500/5"></div>
              <div className="relative text-cyan-400 text-2xl font-bold mb-2">
                Position #{queuePosition}
              </div>
              <p className="relative text-gray-300 text-sm mb-4">{t('dashboard.artistMembership.earlyAccess.queueStatus')}</p>
              
              {isInQueue && (
                <Badge className="relative bg-cyan-500/20 text-cyan-400 border-cyan-500/50 mb-4">
                  {t('dashboard.artistMembership.earlyAccess.queueActive')}
                </Badge>
              )}
              
              {!isInQueue && (
                <CyberpunkButton 
                  variant="primary" 
                  size="sm" 
                  className="relative w-full"
                  onClick={handleJoinQueue}
                >
                  <Clock className="w-4 h-4 mr-2" />
                  {t('dashboard.artistMembership.earlyAccess.joinQueue')}
                </CyberpunkButton>
              )}
            </div>
            
            <div className="bg-gray-700/50 border border-purple-500/30 rounded-lg p-6 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-purple-500/5"></div>
              <div className="relative text-purple-400 text-2xl font-bold mb-2">{t('dashboard.artistMembership.earlyAccess.timeLeft')}</div>
              <p className="relative text-gray-300 text-sm">{t('dashboard.artistMembership.earlyAccess.nextLottery')}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <QueueSuccessToast 
        isOpen={showSuccessToast}
        onClose={() => setShowSuccessToast(false)}
      />
    </>
  );
};

export default EarlyAccessSection;
