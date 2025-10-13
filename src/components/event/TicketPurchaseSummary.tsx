import React from 'react';
import { useTranslation } from 'react-i18next';
import { Separator } from '@/components/ui/separator';

interface TicketPurchaseSummaryProps {
  eventName: string;
  eventDate: string;
  ticketName: string;
  quantity: number;
  unitPrice: number;
  paymentMethod: 'credit_card' | 'atm_transfer';
}

const TicketPurchaseSummary = ({
  eventName,
  eventDate,
  ticketName,
  quantity,
  unitPrice,
  paymentMethod,
}: TicketPurchaseSummaryProps) => {
  const { t } = useTranslation();
  const totalPrice = quantity * unitPrice;
  
  return (
    <div className="bg-gray-700/30 border border-gray-600 rounded-lg p-4 space-y-3">
      <h3 className="font-semibold text-white">{t('events.purchase.orderSummary')}</h3>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-400">{t('events.eventName')}</span>
          <span className="text-white">{eventName}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-400">{t('events.date')}</span>
          <span className="text-white">{eventDate}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-400">{t('events.ticketType')}</span>
          <span className="text-white">{ticketName}</span>
        </div>
        
        <Separator className="bg-gray-600" />
        
        <div className="flex justify-between">
          <span className="text-gray-400">{t('events.purchase.quantity')}</span>
          <span className="text-white">{quantity}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-400">{t('events.unitPrice')}</span>
          <span className="text-white">NT$ {unitPrice.toFixed(0)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-400">{t('events.purchase.paymentMethod')}</span>
          <span className="text-white">
            {paymentMethod === 'credit_card' ? t('events.purchase.creditCard') : t('events.purchase.atmTransfer')}
          </span>
        </div>
        
        <Separator className="bg-gray-600" />
        
        <div className="flex justify-between font-semibold text-lg">
          <span className="text-white">{t('events.purchase.totalPrice')}</span>
          <span className="text-cyan-400">NT$ {totalPrice.toFixed(0)}</span>
        </div>
      </div>
    </div>
  );
};

export default TicketPurchaseSummary;
