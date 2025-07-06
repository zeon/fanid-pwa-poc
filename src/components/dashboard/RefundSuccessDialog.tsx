
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
      <AlertDialogContent className="bg-white border-gray-200 max-w-md">
        <AlertDialogHeader className="text-center">
          <div className="mx-auto mb-4">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
          </div>
          <AlertDialogTitle className="text-green-600 text-xl">
            {t('tickets.refund.successTitle')}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-700 mt-4">
            <div className="space-y-2">
              <p className="font-medium">{event.name}</p>
              <p className="text-sm text-gray-600">{event.date} • {event.venue}</p>
              <p className="mt-4">{t('tickets.refund.successMessage')}</p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction 
            onClick={onClose} 
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            {t('common.ok')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RefundSuccessDialog;
