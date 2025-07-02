
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import CyberpunkButton from '@/components/auth/CyberpunkButton';
import QueueSuccessToast from './QueueSuccessToast';
import LotteryCompleteDialog from './LotteryCompleteDialog';

const EarlyAccessSection = () => {
  const { t } = useTranslation();
  const [isInQueue, setIsInQueue] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showCompleteDialog, setShowCompleteDialog] = useState(false);
  const [queuePosition, setQueuePosition] = useState(254);
  
  // Initialize with 3 days in seconds (3 * 24 * 60 * 60 = 259200 seconds)
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(259200);
  const [isCountdownActive, setIsCountdownActive] = useState(false);

  // Accelerated countdown timer effect (8 hours per second = 28800 seconds per second)
  useEffect(() => {
    if (!isCountdownActive) return;

    const timer = setInterval(() => {
      setTimeLeftSeconds(prev => {
        const newTime = prev - 28800; // Decrement by 8 hours (28800 seconds)
        
        if (newTime <= 0) {
          setIsCountdownActive(false);
          setShowCompleteDialog(true);
          return 0;
        }
        
        return newTime;
      });
    }, 1000); // Update every second

    return () => clearInterval(timer);
  }, [isCountdownActive]);

  const handleJoinQueue = () => {
    setIsInQueue(true);
    setIsCountdownActive(true);
    setQueuePosition(prev => prev + 1);
    setShowSuccessToast(true);
    
    // Auto-close the toast after 3 seconds
    setTimeout(() => {
      setShowSuccessToast(false);
    }, 3000);
  };

  const handlePurchase = () => {
    setShowCompleteDialog(false);
    // Here you would typically navigate to the purchase page
    console.log('Navigate to purchase page');
  };

  const formatCountdown = (seconds: number) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${days.toString().padStart(2, '0')} ${t('dashboard.artistMembership.earlyAccess.days')} : ${hours.toString().padStart(2, '0')} ${t('dashboard.artistMembership.earlyAccess.hours')} : ${minutes.toString().padStart(2, '0')} ${t('dashboard.artistMembership.earlyAccess.minutes')} : ${secs.toString().padStart(2, '0')} ${t('dashboard.artistMembership.earlyAccess.seconds')}`;
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
                {t('dashboard.artistMembership.earlyAccess.positionInQueue')}
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
              <div className="relative text-purple-400 text-2xl font-bold mb-2 font-mono leading-relaxed">
                {formatCountdown(timeLeftSeconds)}
              </div>
              <p className="relative text-gray-300 text-sm">{t('dashboard.artistMembership.earlyAccess.nextLotteryStarts')}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <QueueSuccessToast 
        isOpen={showSuccessToast}
        onClose={() => setShowSuccessToast(false)}
      />

      <LotteryCompleteDialog
        isOpen={showCompleteDialog}
        onClose={() => setShowCompleteDialog(false)}
        onPurchase={handlePurchase}
      />
    </>
  );
};

export default EarlyAccessSection;
