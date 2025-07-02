
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Gift } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import CyberpunkButton from '@/components/auth/CyberpunkButton';

const MonthlyGiftsSection = () => {
  const { t } = useTranslation();

  const monthlyGifts = [
    {
      month: 'December 2024',
      name: t('dashboard.artistMembership.monthlyGift.items.exclusiveBracelet'),
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=200&h=200',
      status: 'available'
    },
    {
      month: 'January 2025',
      name: t('dashboard.artistMembership.monthlyGift.items.limitedCards'),
      image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=200&h=200',
      status: 'upcoming'
    }
  ];

  return (
    <Card className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 mb-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10"></div>
      <div className="absolute inset-0 border border-cyan-500/20 rounded-lg"></div>
      <CardHeader className="relative">
        <CardTitle className="text-2xl text-white flex items-center">
          <Gift className="w-6 h-6 text-cyan-400 mr-3" />
          {t('dashboard.artistMembership.monthlyGift.title')}
        </CardTitle>
        <p className="text-gray-300">{t('dashboard.artistMembership.monthlyGift.subtitle')}</p>
      </CardHeader>
      <CardContent className="relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {monthlyGifts.map((gift, index) => (
            <div key={index} className="bg-gray-700/50 border border-cyan-500/30 rounded-lg p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-cyan-500/5"></div>
              <div className="relative flex items-center space-x-4 mb-4">
                <img
                  src={gift.image}
                  alt={gift.name}
                  className="w-16 h-16 rounded-lg object-cover border border-cyan-500/30"
                />
                <div>
                  <h4 className="text-white font-semibold">{gift.name}</h4>
                  <p className="text-gray-400 text-sm">{gift.month}</p>
                  <Badge className={gift.status === 'available' ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/50' : 'bg-purple-500/20 text-purple-400 border-purple-500/50'}>
                    {gift.status === 'available' ? t('dashboard.artistMembership.monthlyGift.available') : t('dashboard.artistMembership.monthlyGift.nextGift')}
                  </Badge>
                </div>
              </div>
              <CyberpunkButton 
                variant={gift.status === 'available' ? 'primary' : 'secondary'} 
                size="sm" 
                className="relative w-full"
                disabled={gift.status !== 'available'}
              >
                <Gift className="w-4 h-4 mr-2" />
                {gift.status === 'available' ? t('dashboard.artistMembership.monthlyGift.claimGift') : t('dashboard.artistMembership.monthlyGift.nextGift')}
              </CyberpunkButton>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MonthlyGiftsSection;
