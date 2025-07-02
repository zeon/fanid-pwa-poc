
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import CyberpunkButton from '@/components/auth/CyberpunkButton';
import { CheckCircle, Crown } from 'lucide-react';

interface Artist {
  id: number;
  name: string;
  image: string;
  isMember: boolean;
  isUserMember: boolean;
}

interface MembershipPaymentSuccessDialogProps {
  isOpen: boolean;
  onClose: () => void;
  artist: Artist | null;
}

const MembershipPaymentSuccessDialog = ({ isOpen, onClose, artist }: MembershipPaymentSuccessDialogProps) => {
  const { t } = useTranslation();

  if (!artist) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-gray-800 border-gray-700 text-white">
        <DialogHeader>
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            <DialogTitle className="text-xl font-bold">
              {t('dashboard.membershipSuccess.title')}
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="text-center space-y-4">
          {/* Artist Info */}
          <div className="flex items-center justify-center space-x-3 bg-gray-700/50 rounded-lg p-4">
            <img
              src={artist.image}
              alt={artist.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-white">{artist.name}</h3>
              <div className="flex items-center text-yellow-400 text-sm">
                <Crown className="w-4 h-4 mr-1" />
                {t('dashboard.membershipSuccess.membershipActive')}
              </div>
            </div>
          </div>

          <p className="text-gray-300 text-sm leading-relaxed">
            {t('dashboard.membershipSuccess.message', { artistName: artist.name })}
          </p>

          <CyberpunkButton
            onClick={onClose}
            variant="primary"
            size="sm"
            className="w-full"
          >
            {t('dashboard.membershipSuccess.continue')}
          </CyberpunkButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MembershipPaymentSuccessDialog;
