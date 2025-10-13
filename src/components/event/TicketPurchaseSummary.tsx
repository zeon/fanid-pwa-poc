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
    <div className="bg-muted/50 rounded-lg p-4 space-y-3">
      <h3 className="font-semibold">{t('events.purchase.orderSummary')}</h3>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">{t('events.eventName')}</span>
          <span>{eventName}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-muted-foreground">{t('events.date')}</span>
          <span>{eventDate}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-muted-foreground">{t('events.ticketType')}</span>
          <span>{ticketName}</span>
        </div>
        
        <Separator />
        
        <div className="flex justify-between">
          <span className="text-muted-foreground">{t('events.purchase.quantity')}</span>
          <span>{quantity}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-muted-foreground">{t('events.unitPrice')}</span>
          <span>NT$ {unitPrice.toFixed(0)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-muted-foreground">{t('events.purchase.paymentMethod')}</span>
          <span>
            {paymentMethod === 'credit_card' ? t('events.purchase.creditCard') : t('events.purchase.atmTransfer')}
          </span>
        </div>
        
        <Separator />
        
        <div className="flex justify-between font-semibold text-lg">
          <span>{t('events.purchase.totalPrice')}</span>
          <span className="text-primary">NT$ {totalPrice.toFixed(0)}</span>
        </div>
      </div>
    </div>
  );
};

export default TicketPurchaseSummary;
