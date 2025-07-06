
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
      <AlertDialogContent className="bg-gray-900 border-2 border-cyan-500/50 max-w-md relative overflow-hidden">
        {/* Cyberpunk background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}></div>
        
        <AlertDialogHeader className="text-center relative z-10">
          <div className="mx-auto mb-4 relative">
            <div className="absolute inset-0 bg-green-500/30 rounded-full blur-xl animate-pulse"></div>
            <CheckCircle className="h-16 w-16 text-green-400 mx-auto relative z-10 drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]" />
          </div>
          <AlertDialogTitle className="text-green-400 text-xl font-bold uppercase tracking-wider drop-shadow-[0_0_10px_rgba(34,197,94,0.3)]">
            {t('tickets.refund.successTitle')}
          </AlertDialogTitle>
        </AlertDialogHeader>
        
        {/* Event details section - moved outside AlertDialogDescription to avoid nesting issues */}
        <div className="relative z-10 px-6 space-y-3">
          <div className="bg-gray-800/50 rounded-lg p-3 border border-cyan-500/30">
            <p className="font-semibold text-cyan-400 text-sm uppercase tracking-wide">{event.name}</p>
            <p className="text-xs text-gray-400 mt-1">{event.date} • {event.venue}</p>
          </div>
          <AlertDialogDescription className="text-gray-300 text-sm leading-relaxed">
            {t('tickets.refund.successMessage')}
          </AlertDialogDescription>
        </div>
        
        <AlertDialogFooter className="relative z-10">
          <AlertDialogAction 
            onClick={onClose} 
            className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-bold uppercase tracking-wider text-sm border-0 shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/40 transition-all duration-300 relative overflow-hidden group"
          >
            <span className="relative z-10">{t('common.ok')}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur animate-pulse group-hover:animate-none"></div>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RefundSuccessDialog;
