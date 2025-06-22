
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import CyberpunkButton from '@/components/auth/CyberpunkButton';
import { ExternalLink, Shield, X, CheckCircle } from 'lucide-react';

interface TixcraftLoginDialogProps {
  isOpen: boolean;
  onClose: () => void;
  eventName: string;
  eventId: string;
}

const TixcraftLoginDialog = ({ isOpen, onClose, eventName, eventId }: TixcraftLoginDialogProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [countdown, setCountdown] = useState(3);

  const handleGrantPermission = () => {
    console.log('Permission granted, starting countdown...');
    setPermissionGranted(true);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (permissionGranted && isOpen) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            onClose();
            navigate(`/tixcraft/${eventId}`);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [permissionGranted, isOpen, eventId, navigate, onClose]);

  // Reset state when dialog closes
  useEffect(() => {
    if (!isOpen) {
      setPermissionGranted(false);
      setCountdown(3);
    }
  }, [isOpen]);

  if (permissionGranted) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2 text-green-400">
              <CheckCircle className="w-5 h-5" />
              <span>{t('tixcraft.permissionGranted.title')}</span>
            </DialogTitle>
            <DialogDescription className="text-gray-300">
              {t('tixcraft.permissionGranted.description')}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center space-x-2 text-cyan-400 mb-2">
                <ExternalLink className="w-4 h-4" />
                <span className="font-semibold">TIXCRAFT</span>
              </div>
              <p className="text-sm text-gray-400">
                {t('tixcraft.permissionGranted.redirecting', { seconds: countdown })}
              </p>
            </div>

            <div className="w-full bg-gray-800 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${((3 - countdown) / 3) * 100}%` }}
              ></div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

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
              onClick={handleGrantPermission}
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
