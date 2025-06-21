
import React from 'react';
import { ShoppingCart, CreditCard } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface TixcraftPurchaseButtonProps {
  onPurchase: () => void;
  isDisabled: boolean;
  totalAmount: number;
}

const TixcraftPurchaseButton = ({ onPurchase, isDisabled, totalAmount }: TixcraftPurchaseButtonProps) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      {/* Purchase Button */}
      <button
        onClick={onPurchase}
        disabled={isDisabled}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center space-x-2 transition-colors"
      >
        <ShoppingCart className="w-5 h-5" />
        <span>{t('tixcraft.purchaseNow')} - NT$ {totalAmount}</span>
      </button>

      {/* Disabled Message */}
      {isDisabled && (
        <p className="text-red-600 text-sm text-center">
          {t('tixcraft.selectSeatsMessage')}
        </p>
      )}

      {/* Payment Methods */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold text-gray-800 mb-2">{t('tixcraft.paymentMethods')}</h4>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <CreditCard className="w-4 h-4" />
            <span>{t('tixcraft.creditCard')}</span>
          </div>
          <span>•</span>
          <span>{t('tixcraft.bankTransfer')}</span>
          <span>•</span>
          <span>{t('tixcraft.convenientStore')}</span>
        </div>
      </div>

      {/* Terms */}
      <div className="text-xs text-gray-500 text-center">
        {t('tixcraft.purchaseTerms')}
      </div>
    </div>
  );
};

export default TixcraftPurchaseButton;
