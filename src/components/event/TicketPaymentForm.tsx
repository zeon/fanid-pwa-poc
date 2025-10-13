import React from 'react';
import { useTranslation } from 'react-i18next';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import CreditCardForm from '@/components/tixcraft/CreditCardForm';
import BankTransferInfo from '@/components/tixcraft/BankTransferInfo';

interface TicketPaymentFormProps {
  paymentMethod: 'credit_card' | 'atm_transfer';
  onPaymentMethodChange: (method: 'credit_card' | 'atm_transfer') => void;
}

const TicketPaymentForm = ({ 
  paymentMethod, 
  onPaymentMethodChange 
}: TicketPaymentFormProps) => {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">{t('events.purchase.paymentMethod')}</h3>
      
      <RadioGroup 
        value={paymentMethod} 
        onValueChange={(value) => onPaymentMethodChange(value as 'credit_card' | 'atm_transfer')}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="credit_card" id="credit_card" />
          <Label htmlFor="credit_card" className="cursor-pointer">
            {t('events.purchase.creditCard')}
          </Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="atm_transfer" id="atm_transfer" />
          <Label htmlFor="atm_transfer" className="cursor-pointer">
            {t('events.purchase.atmTransfer')}
          </Label>
        </div>
      </RadioGroup>
      
      {paymentMethod === 'credit_card' && (
        <div className="bg-muted/30 p-4 rounded-lg">
          <p className="text-sm text-muted-foreground">{t('events.purchase.creditCardInfo')}</p>
        </div>
      )}
      {paymentMethod === 'atm_transfer' && (
        <div className="bg-muted/30 p-4 rounded-lg">
          <p className="text-sm text-muted-foreground">{t('events.purchase.atmInfo')}</p>
        </div>
      )}
    </div>
  );
};

export default TicketPaymentForm;
