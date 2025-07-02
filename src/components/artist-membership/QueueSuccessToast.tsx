
import React from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface QueueSuccessToastProps {
  isOpen: boolean;
  onClose: () => void;
}

const QueueSuccessToast = ({ isOpen, onClose }: QueueSuccessToastProps) => {
  const { t } = useTranslation();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-800 border-cyan-500/30 text-white max-w-md" hideCloseButton>
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <CheckCircle className="w-16 h-16 text-cyan-400" />
              <div className="absolute inset-0 bg-cyan-400/20 rounded-full animate-pulse"></div>
            </div>
          </div>
          <DialogTitle className="text-xl text-cyan-400 mb-2">
            {t('dashboard.artistMembership.earlyAccess.queueCongratulations')}
          </DialogTitle>
          <p className="text-gray-300 text-sm">
            You'll be notified when the lottery begins
          </p>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default QueueSuccessToast;
