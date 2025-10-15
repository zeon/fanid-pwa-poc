import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';

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
  
  const handleViewTickets = () => {
    onClose();
    navigate('/active-tickets');
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-gray-800 border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-6 w-6 text-green-400" />
            </div>
            <span className="text-xl font-bold">{t('events.purchase.success.title')}</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div>
            <p className="text-gray-300 mb-2">{t('events.purchase.success.message')}</p>
            <p className="text-gray-400 text-sm">{t('events.purchase.success.ticketInfo')}</p>
          </div>
          
          <div className="bg-gray-700/50 rounded-lg p-4">
            <p className="text-sm text-gray-400">{t('events.purchase.success.confirmationNumber')}</p>
            <p className="font-mono text-cyan-400">{paymentId}</p>
          </div>
          
          <div className="text-center py-4">
            <p className="text-lg text-gray-200">
              {t('events.purchase.success.ticketCount', { count: orderIds.length })}
            </p>
            <p className="text-sm text-gray-400 mt-2">
              {t('events.purchase.success.ticketInfo')}
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button
              onClick={handleViewTickets}
              className="flex-1 bg-cyan-600 hover:bg-cyan-700"
            >
              {t('events.purchase.success.viewTickets')}
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 bg-gray-700 hover:bg-gray-600 border-gray-600"
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
