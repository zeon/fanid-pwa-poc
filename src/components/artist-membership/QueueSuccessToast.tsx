
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
      <DialogContent className="bg-gray-800 border-cyan-500/30 text-white max-w-md">
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-16 h-16 text-cyan-400" />
          </div>
          <DialogTitle className="text-xl text-cyan-400">
            {t('dashboard.artistMembership.earlyAccess.queueCongratulations')}
          </DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default QueueSuccessToast;
