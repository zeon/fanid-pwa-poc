
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Trophy, ShoppingCart } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import CyberpunkButton from '@/components/auth/CyberpunkButton';

interface LotteryCompleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onPurchase: () => void;
}

const LotteryCompleteDialog = ({ isOpen, onClose, onPurchase }: LotteryCompleteDialogProps) => {
  const { t } = useTranslation();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-800 border-yellow-500/30 text-white max-w-md" hideCloseButton>
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Trophy className="w-16 h-16 text-yellow-400" />
              <div className="absolute inset-0 bg-yellow-400/20 rounded-full animate-pulse"></div>
            </div>
          </div>
          <DialogTitle className="text-2xl text-yellow-400 mb-4 text-center">
            Congratulations!
          </DialogTitle>
          <p className="text-gray-300 text-sm mb-6 text-center">
            The lottery is complete! You now have priority access to purchase tickets.
          </p>
          <div className="flex flex-col gap-3">
            <CyberpunkButton 
              variant="primary" 
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
              onClick={onPurchase}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Purchase Tickets
            </CyberpunkButton>
            <CyberpunkButton 
              variant="secondary" 
              className="w-full"
              onClick={onClose}
            >
              Close
            </CyberpunkButton>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default LotteryCompleteDialog;
