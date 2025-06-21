
import React from 'react';
import { ShoppingCart, CreditCard, Shield } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface TixcraftPurchaseButtonProps {
  onPurchase: () => void;
  isDisabled: boolean;
  totalAmount: number;
  eventId: string;
  selectedSeats: string[];
  selectedQuantity: number;
}

const TixcraftPurchaseButton = ({ 
  onPurchase, 
  isDisabled, 
  totalAmount, 
  eventId, 
  selectedSeats, 
  selectedQuantity 
}: TixcraftPurchaseButtonProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handlePurchaseClick = () => {
    // Navigate to face scanning with purchase data
    navigate('/face-scanning', {
      state: {
        isPurchaseVerification: true,
        purchaseData: {
          eventId,
          selectedSeats,
          selectedQuantity,
          totalAmount
        }
      }
    });
  };

  return (
    <div className="space-y-4">
      {/* Purchase Button with Face Verification */}
      <button
        onClick={handlePurchaseClick}
        disabled={isDisabled}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center space-x-2 transition-colors"
      >
        <Shield className="w-5 h-5" />
        <span>{t('tixcraft.purchaseWithVerification')} - NT$ {totalAmount}</span>
      </button>

      {/* Face Verification Notice */}
      <div className="bg-blue-50 p-3 rounded-lg">
        <div className="flex items-center space-x-2 text-blue-700 text-sm">
          <Shield className="w-4 h-4" />
          <span>{t('tixcraft.faceVerificationRequired')}</span>
        </div>
      </div>

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
            <span>{t('tixcraft.payment.creditCard')}</span>
          </div>
          <span>•</span>
          <span>{t('tixcraft.payment.bankTransfer')}</span>
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
