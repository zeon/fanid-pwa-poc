
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface TicketQRDialogProps {
  isOpen: boolean;
  onClose: () => void;
  eventName: string;
}

const TicketQRDialog = ({ isOpen, onClose, eventName }: TicketQRDialogProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setCountdown(10);
      setIsRedirecting(false);
      return;
    }

    // Start countdown after dialog opens
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsRedirecting(true);
          
          // Navigate to face scanning with entry verification context
          setTimeout(() => {
            onClose();
            navigate('/face-scanning', {
              state: {
                isEntryVerification: true,
                eventName: eventName
              }
            });
          }, 500);
          
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, navigate, onClose, eventName]);

  const handleClose = () => {
    setCountdown(10);
    setIsRedirecting(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
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
            <p className="text-gray-400 text-sm mb-4">
              {t('tickets.qrCodeDescription')}
            </p>
            
            {/* Countdown and redirect notice */}
            <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-lg p-3">
              {isRedirecting ? (
                <p className="text-cyan-400 text-sm">
                  {t('tickets.redirecting')}
                </p>
              ) : (
                <p className="text-cyan-400 text-sm">
                  {t('tickets.autoRedirect', { seconds: countdown })}
                </p>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TicketQRDialog;
