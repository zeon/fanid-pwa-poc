import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useTicketQRCode } from '@/hooks/useTicketPurchase';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle } from 'lucide-react';

interface TicketQRDialogProps {
  isOpen: boolean;
  onClose: () => void;
  ticketOrderId: string;
  eventName: string;
}

const TicketQRDialog = ({ isOpen, onClose, ticketOrderId, eventName }: TicketQRDialogProps) => {
  const { t } = useTranslation();
  const { data: qrCodeUrl, isLoading, error } = useTicketQRCode(ticketOrderId);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-background border">
        <DialogHeader>
          <DialogTitle className="text-center">
            {t('tickets.qrCodeTitle')}
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center space-y-4">
          {isLoading ? (
            <Skeleton className="w-64 h-64" />
          ) : error ? (
            <div className="w-64 h-64 flex flex-col items-center justify-center bg-muted/50 rounded-lg">
              <AlertCircle className="h-12 w-12 text-red-500 mb-2" />
              <p className="text-red-400 text-sm text-center">{t('tickets.qrCodeError')}</p>
            </div>
          ) : (
            <div className="bg-white p-6 rounded-lg">
              <img 
                src={qrCodeUrl} 
                alt="Entry QR Code"
                className="w-64 h-64 object-contain"
              />
            </div>
          )}
          
          <div className="text-center w-full">
            <p className="font-medium mb-2">{eventName}</p>
            <p className="text-muted-foreground text-sm mb-2">
              {t('tickets.qrCodeDescription')}
            </p>
            <p className="text-xs text-muted-foreground font-mono">
              Order ID: {ticketOrderId.slice(0, 8)}...
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TicketQRDialog;
