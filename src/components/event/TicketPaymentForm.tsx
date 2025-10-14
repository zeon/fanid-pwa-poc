import React from 'react';
import { useTranslation } from 'react-i18next';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import CreditCardForm from '@/components/tixcraft/CreditCardForm';
import BankTransferInfo from '@/components/tixcraft/BankTransferInfo';

interface TicketPaymentFormProps {
  paymentMethod: 'credit_card' | 'atm_transfer';
  onPaymentMethodChange: (method: 'credit_card' | 'atm_transfer') => void;
  isFreeTicket?: boolean;
}

const TicketPaymentForm = ({ 
  paymentMethod, 
  onPaymentMethodChange,
  isFreeTicket = false
}: TicketPaymentFormProps) => {
  const { t } = useTranslation();
  
  // If it's a free ticket, show a message instead of payment options
  if (isFreeTicket) {
    return (
      <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
        <p className="text-green-400 font-medium text-center">
          {t('events.purchase.freeTicket')}
        </p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-white">{t('events.purchase.paymentMethod')}</h3>
      
      <RadioGroup 
        value={paymentMethod} 
        onValueChange={(value) => onPaymentMethodChange(value as 'credit_card' | 'atm_transfer')}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="credit_card" id="credit_card" />
          <Label htmlFor="credit_card" className="cursor-pointer text-white">
            {t('events.purchase.creditCard')}
          </Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="atm_transfer" id="atm_transfer" />
          <Label htmlFor="atm_transfer" className="cursor-pointer text-white">
            {t('events.purchase.atmTransfer')}
          </Label>
        </div>
      </RadioGroup>
      
      {paymentMethod === 'credit_card' && (
        <div className="bg-gray-700/50 border border-gray-600 p-4 rounded-lg">
          <p className="text-sm text-gray-300">{t('events.purchase.creditCardInfo')}</p>
        </div>
      )}
      {paymentMethod === 'atm_transfer' && (
        <div className="bg-gray-700/50 border border-gray-600 p-4 rounded-lg">
          <p className="text-sm text-gray-300">{t('events.purchase.atmInfo')}</p>
        </div>
      )}
    </div>
  );
};

export default TicketPaymentForm;
