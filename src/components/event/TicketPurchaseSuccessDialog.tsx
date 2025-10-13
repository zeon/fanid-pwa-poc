import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import { useTicketOrderQRCodes } from '@/hooks/useTicketPurchase';
import { Skeleton } from '@/components/ui/skeleton';

interface TicketPurchaseSuccessDialogProps {
  isOpen: boolean;
  onClose: () => void;
  paymentId: string;
  orderIds: string[];
}

const TicketPurchaseSuccessDialog = ({
  isOpen,
  onClose,
  paymentId,
  orderIds,
}: TicketPurchaseSuccessDialogProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: qrCodes, isLoading } = useTicketOrderQRCodes(orderIds);
  
  const handleViewTickets = () => {
    onClose();
    navigate('/tickets');
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl bg-background border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-6 w-6 text-green-500" />
            {t('events.purchase.success.title')}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <p className="text-muted-foreground">{t('events.purchase.success.message')}</p>
          
          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-sm text-muted-foreground">{t('events.purchase.success.confirmationNumber')}</p>
            <p className="font-mono">{paymentId}</p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">
              {t('events.purchase.success.ticketCount', { count: orderIds.length })}
            </h3>
            
            {isLoading ? (
              <div className="grid grid-cols-2 gap-4">
                {orderIds.map((_, idx) => (
                  <Skeleton key={idx} className="h-64 w-full" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {qrCodes?.map(({ orderId, qrImageUrl }, idx) => (
                  <div key={orderId} className="bg-white p-4 rounded-lg">
                    <img 
                      src={qrImageUrl} 
                      alt={`Ticket ${idx + 1} QR Code`}
                      className="w-full h-auto"
                    />
                    <p className="text-xs text-gray-600 text-center mt-2">
                      {t('common.ticket')} {idx + 1}
                    </p>
                    <p className="text-xs text-gray-500 text-center font-mono">
                      {orderId.slice(0, 8)}...
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex gap-3">
            <Button
              onClick={handleViewTickets}
              className="flex-1"
            >
              {t('events.purchase.success.viewTickets')}
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1"
            >
              {t('common.close')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TicketPurchaseSuccessDialog;
