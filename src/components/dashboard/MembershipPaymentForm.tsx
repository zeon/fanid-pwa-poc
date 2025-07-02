
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

interface MembershipPaymentFormProps {
  form: UseFormReturn<CreditCardFormData>;
  onSubmit: (data: CreditCardFormData) => void;
  onCancel: () => void;
  isProcessing: boolean;
}

const MembershipPaymentForm = ({ form, onSubmit, onCancel, isProcessing }: MembershipPaymentFormProps) => {
  const { t } = useTranslation();

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="bg-gray-700/30 border border-gray-600 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">{t('dashboard.membershipPayment.paymentInformation')}</h3>
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
    </form>
  );
};

export default MembershipPaymentForm;
