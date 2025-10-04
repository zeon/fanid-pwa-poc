import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface EmailVerificationBannerProps {
  email: string;
  onClose?: () => void;
}

const EmailVerificationBanner = ({ email, onClose }: EmailVerificationBannerProps) => {
  const { t } = useTranslation();
  const [cooldown, setCooldown] = useState(0);
  const [attempts, setAttempts] = useState(3);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const handleResend = async () => {
    if (cooldown > 0 || attempts <= 0 || isResending) return;

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
      setCooldown(60);
      setAttempts(prev => prev - 1);
    } catch (error) {
      console.error('Error resending verification:', error);
      toast.error(t('auth.emailVerification.resendError'));
    } finally {
      setIsResending(false);
    }
  };

  return (
    <Alert className="bg-yellow-500/10 border-yellow-500/50 mb-6">
      <Mail className="h-4 w-4 text-yellow-500" />
      <AlertDescription className="flex flex-col gap-3">
        <div className="text-yellow-100">
          <p className="font-medium">{t('auth.emailVerification.title')}</p>
          <p className="text-sm text-yellow-200/80 mt-1">
            {t('auth.emailVerification.sent', { email })}
          </p>
          <p className="text-xs text-yellow-200/60 mt-2">
            {t('auth.emailVerification.checkInbox')}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Button
            size="sm"
            variant="outline"
            onClick={handleResend}
            disabled={cooldown > 0 || attempts <= 0 || isResending}
            className="border-yellow-500/50 hover:bg-yellow-500/20"
          >
            <RefreshCw className={`h-3 w-3 mr-1 ${isResending ? 'animate-spin' : ''}`} />
            {cooldown > 0
              ? t('auth.emailVerification.cooldown', { seconds: cooldown })
              : t('auth.emailVerification.resendButton')}
          </Button>

          {attempts < 3 && (
            <span className="text-xs text-yellow-200/60">
              {attempts > 0
                ? t('auth.emailVerification.attemptsLeft', { count: attempts })
                : t('auth.emailVerification.noAttemptsLeft')}
            </span>
          )}
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default EmailVerificationBanner;
