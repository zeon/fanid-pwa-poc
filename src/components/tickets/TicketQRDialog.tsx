
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface TicketQRDialogProps {
  isOpen: boolean;
  onClose: () => void;
  eventName: string;
}

const TicketQRDialog = ({ isOpen, onClose, eventName }: TicketQRDialogProps) => {
  const { t } = useTranslation();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gray-800 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-white text-center">
            {t('tickets.qrCodeTitle')}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-4">
          <div className="bg-white p-6 rounded-lg">
            <img 
              src="/lovable-uploads/246d4fa3-f3c0-4a99-87f2-59e45c844aaf.png" 
              alt="Entry QR Code"
              className="w-64 h-64 object-contain"
            />
          </div>
          <div className="text-center">
            <p className="text-white font-medium mb-2">{eventName}</p>
            <p className="text-gray-400 text-sm">
              {t('tickets.qrCodeDescription')}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TicketQRDialog;
