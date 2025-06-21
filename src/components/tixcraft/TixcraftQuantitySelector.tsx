
import React from 'react';
import { Minus, Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface TixcraftQuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  maxQuantity: number;
}

const TixcraftQuantitySelector = ({ quantity, onQuantityChange, maxQuantity }: TixcraftQuantitySelectorProps) => {
  const { t } = useTranslation();

  const handleDecrease = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < maxQuantity) {
      onQuantityChange(quantity + 1);
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-gray-600 text-sm">
        {t('tixcraft.maxTicketsPerOrder', { max: maxQuantity })}
      </p>
      
      <div className="flex items-center space-x-4">
        <button
          onClick={handleDecrease}
          disabled={quantity <= 1}
          className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Minus className="w-4 h-4" />
        </button>
        
        <div className="flex items-center justify-center w-16 h-10 border border-gray-300 rounded-lg bg-gray-50">
          <span className="text-xl font-semibold">{quantity}</span>
        </div>
        
        <button
          onClick={handleIncrease}
          disabled={quantity >= maxQuantity}
          className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default TixcraftQuantitySelector;
