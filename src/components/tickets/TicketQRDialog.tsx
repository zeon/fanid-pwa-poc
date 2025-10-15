import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useTicketOrderQRCodes } from '@/hooks/useTicketPurchase';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle } from 'lucide-react';

interface TicketQRDialogProps {
  isOpen: boolean;
  onClose: () => void;
  ticketOrderIds: string[];
  eventName: string;
}

const TicketQRDialog = ({ isOpen, onClose, ticketOrderIds, eventName }: TicketQRDialogProps) => {
  const { t } = useTranslation();
  const { data: qrCodes, isLoading, error } = useTicketOrderQRCodes(ticketOrderIds);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-background border">
        <DialogHeader>
          <DialogTitle className="text-center">
            {t('tickets.qrCodeTitle')}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="text-center">
            <p className="font-medium mb-1">{eventName}</p>
            <p className="text-muted-foreground text-sm">
              {t('tickets.qrCodeDescription')}
            </p>
          </div>

          {isLoading ? (
            <div className={`grid gap-4 ${ticketOrderIds.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
              {ticketOrderIds.map((_, idx) => (
                <Skeleton key={idx} className="h-64 w-full" />
              ))}
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center bg-muted/50 rounded-lg p-8">
              <AlertCircle className="h-12 w-12 text-red-500 mb-2" />
              <p className="text-red-400 text-sm text-center">{t('tickets.qrCodeError')}</p>
            </div>
          ) : qrCodes ? (
            <div className={`grid gap-4 ${qrCodes.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
              {qrCodes.map(({ orderId, qrImageUrl }, idx) => (
                <div key={orderId} className={`bg-muted/50 p-4 rounded-lg border ${qrCodes.length === 1 ? 'max-w-sm mx-auto' : ''}`}>
                  <div className="bg-white p-2 rounded">
                    <img 
                      src={qrImageUrl} 
                      alt={`Ticket ${idx + 1} QR Code`}
                      className="w-full h-auto"
                    />
                  </div>
                  <p className="text-xs text-center mt-2">
                    {t('ticket')} {idx + 1} {t('common.of')} {qrCodes.length}
                  </p>
                  <p className="text-xs text-muted-foreground text-center font-mono break-all mt-1">
                    {orderId}
                  </p>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TicketQRDialog;
