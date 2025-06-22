
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import CyberpunkButton from '@/components/auth/CyberpunkButton';
import { ExternalLink, Shield, X } from 'lucide-react';

interface TixcraftLoginDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onGrantPermission: () => void;
  eventName: string;
}

const TixcraftLoginDialog = ({ isOpen, onClose, onGrantPermission, eventName }: TixcraftLoginDialogProps) => {
  const { t } = useTranslation();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-cyan-400">
            <ExternalLink className="w-5 h-5" />
            <span>{t('tixcraft.loginDialog.title')}</span>
          </DialogTitle>
          <DialogDescription className="text-gray-300">
            {t('tixcraft.loginDialog.description', { eventName })}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4">
            <div className="flex items-center space-x-2 text-blue-300 mb-2">
              <Shield className="w-4 h-4" />
              <span className="font-semibold">{t('tixcraft.loginDialog.securityNotice')}</span>
            </div>
            <p className="text-sm text-gray-300">
              {t('tixcraft.loginDialog.securityDescription')}
            </p>
          </div>

          <div className="space-y-3">
            <CyberpunkButton
              variant="primary"
              onClick={onGrantPermission}
              className="w-full"
            >
              <ExternalLink className="w-4 h-4" />
              {t('tixcraft.loginDialog.grantPermission')}
            </CyberpunkButton>

            <CyberpunkButton
              variant="secondary"
              onClick={onClose}
              className="w-full"
            >
              <X className="w-4 h-4" />
              {t('tixcraft.loginDialog.cancel')}
            </CyberpunkButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TixcraftLoginDialog;
