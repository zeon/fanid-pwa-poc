
import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { MerchandiseItem } from '@/data/eventsData';
import CyberpunkButton from '@/components/auth/CyberpunkButton';

interface MerchandiseSectionProps {
  merchandise: MerchandiseItem[];
}

const MerchandiseSection = ({ merchandise }: MerchandiseSectionProps) => {
  const { t } = useTranslation();

  if (!merchandise || merchandise.length === 0) {
    return null;
  }

  const handlePurchase = (item: MerchandiseItem) => {
    console.log('Purchasing merchandise:', item.name);
    // Here you would implement the purchase logic
  };

  return (
    <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
      <h2 className="text-2xl font-bold text-white mb-6">{t('eventDetail.merchandise.title')}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {merchandise.map((item) => (
          <div 
            key={item.id}
            className="group bg-gray-700/50 rounded-lg p-4 border border-gray-600 hover:border-cyan-400/50 transition-all duration-300"
          >
            <div className="aspect-square overflow-hidden rounded-lg mb-4">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            
            <h3 className="text-lg font-semibold text-white mb-2">{item.name}</h3>
            <p className="text-gray-400 text-sm mb-3">{item.description}</p>
            
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-cyan-400">${item.price}</span>
              <CyberpunkButton
                variant="primary"
                size="sm"
                onClick={() => handlePurchase(item)}
                className="h-8 px-3 text-xs w-auto"
              >
                <ShoppingCart className="w-3 h-3" />
                {t('eventDetail.merchandise.buyNow')}
              </CyberpunkButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MerchandiseSection;
