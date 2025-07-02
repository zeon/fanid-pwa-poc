
import React from 'react';
import { useTranslation } from 'react-i18next';
import { UseFormReturn } from 'react-hook-form';
import CyberpunkButton from '@/components/auth/CyberpunkButton';
import MembershipCreditCardForm from '@/components/dashboard/MembershipCreditCardForm';

interface CreditCardFormData {
  cardNumber: string;
  cardholderName: string;
  expiryDate: string;
  cvv: string;
}

interface MembershipPaymentMobileFormProps {
  form: UseFormReturn<CreditCardFormData>;
  onSubmit: (data: CreditCardFormData) => void;
  onCancel: () => void;
  isProcessing: boolean;
}

const MembershipPaymentMobileForm = ({ form, onSubmit, onCancel, isProcessing }: MembershipPaymentMobileFormProps) => {
  const { t } = useTranslation();

  return (
    <>
      {/* Payment Form */}
      <div className="bg-gray-700/30 border border-gray-600 rounded-lg p-4">
        <MembershipCreditCardForm form={form} />
      </div>

      <div className="flex space-x-3">
        <CyberpunkButton
          type="button"
          onClick={onCancel}
          variant="secondary"
          size="sm"
          className="flex-1"
        >
          {t('common.cancel')}
        </CyberpunkButton>
        <CyberpunkButton
          type="submit"
          variant="primary"
          size="sm"
          className="flex-1"
          disabled={isProcessing}
        >
          {isProcessing ? t('dashboard.membershipPayment.processing') : t('dashboard.membershipPayment.joinNow')}
        </CyberpunkButton>
      </div>
    </>
  );
};

export default MembershipPaymentMobileForm;
