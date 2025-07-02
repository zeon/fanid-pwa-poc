
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Music } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface WelcomeSectionProps {
  artistName: string;
}

const WelcomeSection = ({ artistName }: WelcomeSectionProps) => {
  const { t } = useTranslation();

  return (
    <Card className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 mb-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10"></div>
      <div className="absolute inset-0 border border-cyan-500/20 rounded-lg"></div>
      <CardContent className="relative p-8 text-center">
        <Music className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-4 text-white">{t('dashboard.artistMembership.welcome.title')}</h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          {t('dashboard.artistMembership.welcome.message', {{ artistName }})}
        </p>
      </CardContent>
    </Card>
  );
};

export default WelcomeSection;
