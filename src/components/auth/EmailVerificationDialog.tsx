import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Mail, RefreshCw, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface EmailVerificationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  email: string;
}

const EmailVerificationDialog = ({
  open,
  onOpenChange,
  email,
}: EmailVerificationDialogProps) => {
  const { t } = useTranslation();
  const [isResending, setIsResending] = useState(false);

  const handleResend = async () => {
    setIsResending(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast.error(t('auth.emailVerification.resendError'));
        return;
      }

      const { error } = await supabase.functions.invoke('resend-verification-email', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;

      toast.success(t('auth.emailVerification.resendSuccess'));
      onOpenChange(false);
    } catch (error) {
      console.error('Error resending verification:', error);
      toast.error(t('auth.emailVerification.resendError'));
    } finally {
      setIsResending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-gray-800 border-gray-700">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-yellow-500/10 rounded-full">
              <AlertCircle className="h-8 w-8 text-yellow-500" />
            </div>
          </div>
          <DialogTitle className="text-center text-white">
            {t('auth.signIn.errors.unverifiedEmail')}
          </DialogTitle>
          <DialogDescription className="text-center text-gray-400">
            {t('auth.emailVerification.sent', { email })}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-4">
          <div className="text-sm text-gray-400 space-y-2">
            <p>{t('auth.emailVerification.checkInbox')}</p>
            <p className="text-xs">{t('auth.emailVerification.didntReceive')}</p>
          </div>

          <Button
            onClick={handleResend}
            disabled={isResending}
            className="w-full bg-cyan-500 hover:bg-cyan-600"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isResending ? 'animate-spin' : ''}`} />
            {isResending ? 'Sending...' : t('auth.emailVerification.resendButton')}
          </Button>

          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-full border-gray-600 hover:bg-gray-700"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmailVerificationDialog;
