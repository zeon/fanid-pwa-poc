import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { usePurchaseTickets, useUserEventTicketCount } from '@/hooks/useTicketPurchase';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import TicketQuantitySelector from './TicketQuantitySelector';
import TicketPurchaseSummary from './TicketPurchaseSummary';
import TicketPaymentForm from './TicketPaymentForm';

interface Ticket {
  id: string;
  name: string;
  price: number;
  available: number;
}

interface TicketPurchaseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  ticket: Ticket;
  eventName: string;
  eventDate: string;
  eventId: string;
  onSuccess: (paymentId: string, orderIds: string[]) => void;
}

const TicketPurchaseDialog = ({
  isOpen,
  onClose,
  ticket,
  eventName,
  eventDate,
  eventId,
  onSuccess,
}: TicketPurchaseDialogProps) => {
  const { t } = useTranslation();
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'atm_transfer'>('credit_card');
  
  const { mutate: purchaseTickets, isPending } = usePurchaseTickets();
  
  const { data: session } = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const { data } = await supabase.auth.getSession();
      return data.session;
    },
  });
  
  const userId = session?.user?.id;
  
  const { data: ticketCount } = useUserEventTicketCount(userId || '', eventId);
  
  const maxQuantity = Math.min(
    4,
    ticketCount?.remaining || 4,
    ticket.available
  );
  
  const handlePurchase = () => {
    if (!userId) {
      toast({
        title: t('common.error'),
        description: t('auth.pleaseSignIn'),
        variant: 'destructive',
      });
      return;
    }
    
    const totalAmount = quantity * ticket.price;
    
    purchaseTickets(
      {
        userId,
        eventId,
        paymentMethod,
        totalAmount,
        tickets: [
          {
            ticketId: ticket.id,
            quantity,
            unitPrice: ticket.price,
          },
        ],
      },
      {
        onSuccess: ({ payment, orders }) => {
          toast({
            title: t('events.purchase.success.title'),
            description: t('events.purchase.success.message'),
          });
          onSuccess(payment.id, orders.map(o => o.id));
          onClose();
        },
        onError: (error) => {
          toast({
            title: t('common.error'),
            description: error.message || t('events.purchase.errors.purchaseFailed'),
            variant: 'destructive',
          });
        },
      }
    );
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-gray-800 border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-white">{t('events.purchase.title')}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Quantity Selector */}
          <div>
            <label className="block text-sm font-medium mb-2 text-white">
              {t('events.purchase.selectQuantity')}
            </label>
            <TicketQuantitySelector
              quantity={quantity}
              onChange={setQuantity}
              maxQuantity={maxQuantity}
              availableTickets={ticket.available}
            />
            {ticketCount && (
              <p className="text-sm text-gray-400 mt-2">
                {t('events.purchase.youHaveTickets', { count: ticketCount.count })}
                {' - '}
                {t('events.purchase.canPurchaseMore', { remaining: ticketCount.remaining })}
              </p>
            )}
          </div>
          
          {/* Order Summary */}
          <TicketPurchaseSummary
            eventName={eventName}
            eventDate={eventDate}
            ticketName={ticket.name}
            quantity={quantity}
            unitPrice={ticket.price}
            paymentMethod={paymentMethod}
          />
          
          {/* Payment Method */}
          <TicketPaymentForm
            paymentMethod={paymentMethod}
            onPaymentMethodChange={setPaymentMethod}
          />
          
          {/* Purchase Button */}
          <Button
            onClick={handlePurchase}
            disabled={isPending || maxQuantity === 0}
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? t('events.purchase.processing') : t('events.purchase.completePurchase')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TicketPurchaseDialog;
