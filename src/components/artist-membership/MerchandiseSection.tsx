
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ShoppingBag } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import CyberpunkButton from '@/components/auth/CyberpunkButton';

const MerchandiseSection = () => {
  const { t } = useTranslation();

  const merchandiseItems = [
    {
      id: 1,
      name: t('dashboard.artistMembership.merchandise.items.limitedTshirt'),
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=300&h=300',
      originalPrice: 890,
      memberPrice: 623,
      discount: 30
    },
    {
      id: 2,
      name: t('dashboard.artistMembership.merchandise.items.exclusivePhoto'),
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=300&h=300',
      originalPrice: 1200,
      memberPrice: 840,
      discount: 30
    },
    {
      id: 3,
      name: t('dashboard.artistMembership.merchandise.items.supportLight'),
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=300&h=300',
      originalPrice: 650,
      memberPrice: 455,
      discount: 30
    }
  ];

  return (
    <Card className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 mb-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10"></div>
      <div className="absolute inset-0 border border-purple-500/20 rounded-lg"></div>
      <CardHeader className="relative">
        <CardTitle className="text-2xl text-white flex items-center">
          <ShoppingBag className="w-6 h-6 text-purple-400 mr-3" />
          {t('dashboard.artistMembership.merchandise.title')}
        </CardTitle>
        <p className="text-gray-300">{t('dashboard.artistMembership.merchandise.subtitle')}</p>
      </CardHeader>
      <CardContent className="relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {merchandiseItems.map((item) => (
            <div key={item.id} className="bg-gray-700/50 border border-purple-500/30 rounded-lg overflow-hidden hover:scale-105 transition-transform relative">
              <div className="absolute inset-0 bg-purple-500/5"></div>
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <Badge className="absolute top-3 right-3 bg-cyan-500/90 text-white border-cyan-500">
                  {t('dashboard.artistMembership.merchandise.discount')}
                </Badge>
                <Badge className="absolute top-3 left-3 bg-purple-500/90 text-white border-purple-500">
                  {t('dashboard.artistMembership.merchandise.limitedEdition')}
                </Badge>
              </div>
              <div className="relative p-4">
                <h4 className="text-white font-semibold mb-2">{item.name}</h4>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-gray-400 line-through text-sm">${item.originalPrice}</span>
                    <span className="text-cyan-400 font-bold ml-2">${item.memberPrice}</span>
                  </div>
                </div>
                <CyberpunkButton variant="secondary" size="sm" className="w-full">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  {t('dashboard.artistMembership.merchandise.shopNow')}
                </CyberpunkButton>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MerchandiseSection;
