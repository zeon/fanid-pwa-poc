
import React from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface TicketPurchaseSuccessDialogProps {
  isOpen: boolean;
  onClose: () => void;
  eventName: string;
  transactionId: string;
}

const TicketPurchaseSuccessDialog = ({ 
  isOpen, 
  onClose, 
  eventName, 
  transactionId 
}: TicketPurchaseSuccessDialogProps) => {
  const { t } = useTranslation();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gray-800 border-gray-700 text-white">
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
          </div>
          <DialogTitle className="text-2xl font-bold text-green-400">
            {t('dashboard.ticketPurchaseSuccess.title')}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="text-center">
            <p className="text-gray-300 mb-2">
              {t('dashboard.ticketPurchaseSuccess.eventPurchased')}
            </p>
            <p className="text-lg font-semibold text-cyan-400">{eventName}</p>
          </div>

          <div className="flex justify-center">
            <div className="bg-white p-4 rounded-lg">
              <img 
                src="/lovable-uploads/246d4fa3-f3c0-4a99-87f2-59e45c844aaf.png" 
                alt="Ticket QR Code"
                className="w-32 h-32 object-contain"
              />
            </div>
          </div>

          <div className="text-center space-y-2">
            <p className="text-sm text-gray-400">
              {t('dashboard.ticketPurchaseSuccess.transactionId')}: {transactionId}
            </p>
            <p className="text-sm text-gray-300">
              {t('dashboard.ticketPurchaseSuccess.instructions')}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
          >
            {t('dashboard.ticketPurchaseSuccess.gotIt')}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TicketPurchaseSuccessDialog;
