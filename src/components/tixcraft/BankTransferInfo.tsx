
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Banknote, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface BankTransferInfoProps {
  totalAmount: number;
  referenceNumber: string;
}

const BankTransferInfo = ({ totalAmount, referenceNumber }: BankTransferInfoProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "已複製",
      description: `${label}已複製到剪貼板`,
    });
  };

  const InfoRow = ({ label, value, copyable = false }: { label: string; value: string; copyable?: boolean }) => (
    <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
      <span className="text-gray-600 font-medium">{label}</span>
      <div className="flex items-center space-x-2">
        <span className="font-semibold">{value}</span>
        {copyable && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => copyToClipboard(value, label)}
            className="h-6 w-6 p-0"
          >
            <Copy className="w-3 h-3" />
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Banknote className="w-5 h-5 text-green-600" />
        <h3 className="text-lg font-semibold">{t('tixcraft.payment.bankTransferInfo.title')}</h3>
      </div>
      
      <div className="space-y-1 mb-4">
        <InfoRow
          label={t('tixcraft.payment.bankTransferInfo.bankName')}
          value={t('tixcraft.payment.bankTransferInfo.bankNameValue')}
        />
        <InfoRow
          label={t('tixcraft.payment.bankTransferInfo.accountNumber')}
          value={t('tixcraft.payment.bankTransferInfo.accountNumberValue')}
          copyable
        />
        <InfoRow
          label={t('tixcraft.payment.bankTransferInfo.accountName')}
          value={t('tixcraft.payment.bankTransferInfo.accountNameValue')}
        />
        <InfoRow
          label={t('tixcraft.payment.bankTransferInfo.amount')}
          value={`NT$ ${totalAmount}`}
          copyable
        />
        <InfoRow
          label={t('tixcraft.payment.bankTransferInfo.referenceNumber')}
          value={referenceNumber}
          copyable
        />
      </div>
      
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
        <p className="text-yellow-800 text-sm">
          {t('tixcraft.payment.bankTransferInfo.instructions')}
        </p>
      </div>
    </div>
  );
};

export default BankTransferInfo;
