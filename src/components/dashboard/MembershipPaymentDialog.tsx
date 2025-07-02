
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import MembershipPaymentSummary from '@/components/dashboard/MembershipPaymentSummary';
import MembershipPaymentMobileSummary from '@/components/dashboard/MembershipPaymentMobileSummary';
import MembershipPaymentForm from '@/components/dashboard/MembershipPaymentForm';
import MembershipPaymentMobileForm from '@/components/dashboard/MembershipPaymentMobileForm';

interface Artist {
  id: number;
  name: string;
  image: string;
  isMember: boolean;
  isUserMember: boolean;
}

interface MembershipPaymentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  artist: Artist | null;
  onPaymentSuccess: (artistId: number) => void;
}

interface CreditCardFormData {
  cardNumber: string;
  cardholderName: string;
  expiryDate: string;
  cvv: string;
}

const MembershipPaymentDialog = ({ isOpen, onClose, artist, onPaymentSuccess }: MembershipPaymentDialogProps) => {
  const { t } = useTranslation();
  const [isProcessing, setIsProcessing] = React.useState(false);

  const form = useForm<CreditCardFormData>({
    defaultValues: {
      cardNumber: '',
      cardholderName: '',
      expiryDate: '',
      cvv: ''
    }
  });

  const handlePayment = async (data: CreditCardFormData) => {
    if (!artist) return;
    
    setIsProcessing(true);
    
    try {
      // Mock payment processing - simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful payment - let parent handle the dialog sequence
      onPaymentSuccess(artist.id);
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!artist) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-gray-800 border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            {t('dashboard.membershipPayment.title')}
          </DialogTitle>
          <DialogDescription className="text-center text-gray-400">
            Join {artist.name}'s exclusive membership community
          </DialogDescription>
        </DialogHeader>

        {/* Desktop Layout: Two Columns */}
        <div className="hidden md:grid md:grid-cols-2 md:gap-8">
          {/* Left Column: Summary */}
          <MembershipPaymentSummary artist={artist} />

          {/* Right Column: Payment Form */}
          <MembershipPaymentForm
            form={form}
            onSubmit={handlePayment}
            onCancel={onClose}
            isProcessing={isProcessing}
          />
        </div>

        {/* Mobile Layout: Single Column */}
        <form onSubmit={form.handleSubmit(handlePayment)} className="md:hidden space-y-4">
          <MembershipPaymentMobileSummary artist={artist} />
          
          <Separator className="bg-gray-600" />

          <MembershipPaymentMobileForm
            form={form}
            onSubmit={handlePayment}
            onCancel={onClose}
            isProcessing={isProcessing}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MembershipPaymentDialog;
