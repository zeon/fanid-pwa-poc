
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CyberpunkButton from '@/components/auth/CyberpunkButton';

const ExclusiveContentSection = () => {
  const { t } = useTranslation();

  const exclusiveContent = [
    {
      title: 'Behind the Scenes: Studio Sessions',
      duration: '15:32',
      thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=300&h=200',
      type: 'Video'
    },
    {
      title: 'Exclusive Acoustic Performance',
      duration: '8:45',
      thumbnail: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=300&h=200',
      type: 'Video'
    },
    {
      title: 'Voice Messages from Artist',
      duration: '3:21',
      thumbnail: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=300&h=200',
      type: 'Audio'
    }
  ];

  return (
    <Card className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10"></div>
      <div className="absolute inset-0 border border-purple-500/20 rounded-lg"></div>
      <CardHeader className="relative">
        <CardTitle className="text-2xl text-white flex items-center">
          <Star className="w-6 h-6 text-purple-400 mr-3" />
          {t('dashboard.artistMembership.remainingBenefits.title')}
        </CardTitle>
      </CardHeader>
      <CardContent className="relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {exclusiveContent.map((content, index) => (
            <div key={index} className="bg-gray-700/50 border border-purple-500/30 rounded-lg overflow-hidden hover:scale-105 transition-transform cursor-pointer relative">
              <div className="absolute inset-0 bg-purple-500/5"></div>
              <div className="relative">
                <img
                  src={content.thumbnail}
                  alt={content.title}
                  className="w-full h-40 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                <div className="absolute bottom-2 left-2">
                  <span className="bg-cyan-500/80 text-white px-2 py-1 rounded text-xs font-medium border border-cyan-500/50">
                    {content.type}
                  </span>
                </div>
                <div className="absolute bottom-2 right-2">
                  <span className="bg-gray-900/80 text-white px-2 py-1 rounded text-xs border border-gray-600/50">
                    {content.duration}
                  </span>
                </div>
              </div>
              <div className="relative p-4">
                <h4 className="text-white font-medium">{content.title}</h4>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <CyberpunkButton variant="primary" size="sm">
            View All Exclusive Content
          </CyberpunkButton>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExclusiveContentSection;
