
import React from 'react';
import { useTranslation } from 'react-i18next';
import { UseFormReturn } from 'react-hook-form';
import CyberpunkInput from '@/components/auth/CyberpunkInput';
import { CreditCard, User, Calendar, Lock } from 'lucide-react';

interface CreditCardFormData {
  cardNumber: string;
  cardholderName: string;
  expiryDate: string;
  cvv: string;
}

interface MembershipCreditCardFormProps {
  form: UseFormReturn<CreditCardFormData>;
}

const MembershipCreditCardForm = ({ form }: MembershipCreditCardFormProps) => {
  const { t } = useTranslation();
  const { register, formState: { errors }, watch } = form;

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\D/g, '');
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };

  return (
    <div className="space-y-4">
      <CyberpunkInput
        label={t('tixcraft.payment.creditCardForm.cardNumber')}
        type="text"
        placeholder={t('tixcraft.payment.creditCardForm.cardNumberPlaceholder')}
        value={watch('cardNumber') || ''}
        onChange={(e) => {
          const formatted = formatCardNumber(e.target.value);
          form.setValue('cardNumber', formatted);
        }}
        maxLength={19}
        icon={<CreditCard className="w-4 h-4" />}
        error={errors.cardNumber?.message}
      />

      <CyberpunkInput
        label={t('tixcraft.payment.creditCardForm.cardholderName')}
        type="text"
        placeholder={t('tixcraft.payment.creditCardForm.cardholderPlaceholder')}
        value={watch('cardholderName') || ''}
        onChange={(e) => form.setValue('cardholderName', e.target.value)}
        icon={<User className="w-4 h-4" />}
        error={errors.cardholderName?.message}
      />

      <div className="grid grid-cols-2 gap-4">
        <CyberpunkInput
          label={t('tixcraft.payment.creditCardForm.expiryDate')}
          type="text"
          placeholder={t('tixcraft.payment.creditCardForm.expiryPlaceholder')}
          value={watch('expiryDate') || ''}
          onChange={(e) => {
            const formatted = formatExpiryDate(e.target.value);
            form.setValue('expiryDate', formatted);
          }}
          maxLength={5}
          icon={<Calendar className="w-4 h-4" />}
          error={errors.expiryDate?.message}
        />

        <CyberpunkInput
          label={t('tixcraft.payment.creditCardForm.cvv')}
          type="text"
          placeholder={t('tixcraft.payment.creditCardForm.cvvPlaceholder')}
          value={watch('cvv') || ''}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, '');
            form.setValue('cvv', value);
          }}
          maxLength={4}
          icon={<Lock className="w-4 h-4" />}
          error={errors.cvv?.message}
        />
      </div>
    </div>
  );
};

export default MembershipCreditCardForm;
