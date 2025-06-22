
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Ticket, Calendar, Fingerprint, Zap } from 'lucide-react';

const DashboardStats = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleActiveTicketsClick = () => {
    navigate('/active-tickets');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card 
        className="bg-gray-800/80 backdrop-blur-sm border-gray-700 hover:border-cyan-400/50 cursor-pointer transition-all duration-300 hover:scale-105"
        onClick={handleActiveTicketsClick}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-400">{t('dashboard.stats.activeTickets')}</CardTitle>
          <Ticket className="h-4 w-4 text-cyan-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{t('dashboard.stats.activeTicketsValue')}</div>
          <p className="text-xs text-gray-400">{t('dashboard.stats.activeTicketsDesc')}</p>
        </CardContent>
      </Card>

      <Card className="bg-gray-800/80 backdrop-blur-sm border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-400">{t('dashboard.stats.nextEvent')}</CardTitle>
          <Calendar className="h-4 w-4 text-purple-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{t('dashboard.stats.nextEventValue')}</div>
          <p className="text-xs text-gray-400">{t('dashboard.stats.nextEventDesc')}</p>
        </CardContent>
      </Card>

      <Card className="bg-gray-800/80 backdrop-blur-sm border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-400">{t('dashboard.stats.biometricStatus')}</CardTitle>
          <Fingerprint className="h-4 w-4 text-green-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-400">{t('dashboard.stats.biometricStatusValue')}</div>
          <p className="text-xs text-gray-400">{t('dashboard.stats.biometricStatusDesc')}</p>
        </CardContent>
      </Card>

      <Card className="bg-gray-800/80 backdrop-blur-sm border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-400">{t('dashboard.stats.energyLevel')}</CardTitle>
          <Zap className="h-4 w-4 text-yellow-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-yellow-400">{t('dashboard.stats.energyLevelValue')}</div>
          <p className="text-xs text-gray-400">{t('dashboard.stats.energyLevelDesc')}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;
