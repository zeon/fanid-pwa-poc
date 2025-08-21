
import React from 'react';
import { useTranslation } from 'react-i18next';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction } from '@/components/ui/alert-dialog';
import { CheckCircle } from 'lucide-react';
import { Event } from '@/data/eventsData';

interface RefundSuccessDialogProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event;
}

const RefundSuccessDialog = ({
  isOpen,
  onClose,
  event
}: RefundSuccessDialogProps) => {
  const { t } = useTranslation();

  return (
    <AlertDialog open={isOpen} onOpenChange={() => {}}>
      <AlertDialogContent className="bg-gray-900/95 backdrop-blur-sm border border-cyan-400/30 max-w-md text-white shadow-2xl shadow-cyan-500/20">
        {/* Cyberpunk glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 rounded-lg pointer-events-none"></div>
        
        <AlertDialogHeader className="text-center relative z-10">
          <div className="mx-auto mb-4 relative">
            <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl animate-pulse"></div>
            <CheckCircle className="h-16 w-16 text-green-400 mx-auto relative z-10" />
          </div>
          <AlertDialogTitle className="text-green-400 text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
            {t('tickets.refund.successTitle')}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-300 mt-4">
            <div className="space-y-3">
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3">
                <p className="font-medium text-cyan-300">{event.name}</p>
                <p className="text-sm text-gray-400 mt-1">{event.date} • {event.venue}</p>
              </div>
              <p className="text-gray-300">{t('tickets.refund.successMessage')}</p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="relative z-10">
          <AlertDialogAction 
            onClick={onClose} 
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold uppercase tracking-wide transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/25"
          >
            {t('common.ok')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RefundSuccessDialog;
