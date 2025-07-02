
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CyberpunkButton from '@/components/auth/CyberpunkButton';
import CreditCardForm from '@/components/tixcraft/CreditCardForm';
import { Separator } from '@/components/ui/separator';
import { Star, Crown } from 'lucide-react';

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
      
      // Simulate successful payment
      onPaymentSuccess(artist.id);
      onClose();
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!artist) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-gray-800 border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            {t('dashboard.membershipPayment.title')}
          </DialogTitle>
        </DialogHeader>

        {/* Artist Info */}
        <Card className="bg-gray-700/50 border-gray-600">
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-3">
              <img
                src={artist.image}
                alt={artist.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-white">{artist.name}</h3>
                <div className="flex items-center text-yellow-400 text-sm">
                  <Crown className="w-4 h-4 mr-1" />
                  {t('dashboard.membershipPayment.membershipType')}
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Membership Benefits */}
        <Card className="bg-gray-700/30 border-gray-600">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-gray-300">
              {t('dashboard.membershipPayment.benefits.title')}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="space-y-1 text-sm text-gray-400">
              <li className="flex items-center">
                <Star className="w-3 h-3 mr-2 text-yellow-400" />
                {t('dashboard.membershipPayment.benefits.exclusiveContent')}
              </li>
              <li className="flex items-center">
                <Star className="w-3 h-3 mr-2 text-yellow-400" />
                {t('dashboard.membershipPayment.benefits.earlyAccess')}
              </li>
              <li className="flex items-center">
                <Star className="w-3 h-3 mr-2 text-yellow-400" />
                {t('dashboard.membershipPayment.benefits.specialDiscounts')}
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Price */}
        <div className="text-center py-2">
          <span className="text-2xl font-bold text-cyan-400">
            {t('dashboard.membershipPayment.price')}
          </span>
          <span className="text-sm text-gray-400 ml-2">
            {t('dashboard.membershipPayment.perMonth')}
          </span>
        </div>

        <Separator className="bg-gray-600" />

        {/* Payment Form */}
        <form onSubmit={form.handleSubmit(handlePayment)} className="space-y-4">
          <div className="bg-gray-700/30 border border-gray-600 rounded-lg p-4">
            <CreditCardForm form={form} />
          </div>

          <div className="flex space-x-3">
            <CyberpunkButton
              type="button"
              onClick={onClose}
              variant="secondary"
              size="sm"
              className="flex-1"
            >
              {t('common.cancel')}
            </CyberpunkButton>
            <CyberpunkButton
              type="submit"
              variant="primary"
              size="sm"
              className="flex-1"
              disabled={isProcessing}
            >
              {isProcessing ? t('dashboard.membershipPayment.processing') : t('dashboard.membershipPayment.joinNow')}
            </CyberpunkButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MembershipPaymentDialog;
