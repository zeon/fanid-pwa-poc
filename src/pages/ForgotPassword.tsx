import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import CyberpunkInput from '@/components/auth/CyberpunkInput';
import CyberpunkButton from '@/components/auth/CyberpunkButton';
import TextLanguageSwitcher from '@/components/navigation/TextLanguageSwitcher';
import { z } from 'zod';

const ForgotPassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { requestPasswordReset } = useAuth();
  
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const emailSchema = z.string().email();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    try {
      emailSchema.parse(email);
    } catch (error) {
      toast.error(t('auth.toast.signUp.invalidEmail'));
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await requestPasswordReset(email);
      
      if (error) {
        toast.error(t('auth.toast.passwordReset.resetFailed'));
      } else {
        setEmailSent(true);
        toast.success(t('auth.toast.passwordReset.emailSent'));
        
        // Redirect to sign in after 3 seconds
        setTimeout(() => {
          navigate(`/signin?message=password_reset_sent&email=${encodeURIComponent(email)}`);
        }, 3000);
      }
    } catch (error) {
      toast.error(t('auth.toast.passwordReset.resetFailed'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden flex items-center justify-center p-4">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(0,0,0,0))]" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Language Switcher */}
      <div className="absolute top-6 right-6 z-10">
        <TextLanguageSwitcher />
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-gray-800/50 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-8 shadow-2xl shadow-cyan-500/20">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-500/20 rounded-full mb-4">
              <Mail className="w-8 h-8 text-cyan-400" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2 tracking-wider">
              {t('auth.forgotPassword.title')}
            </h1>
            <p className="text-gray-400">
              {emailSent 
                ? t('auth.forgotPassword.checkYourEmail')
                : t('auth.forgotPassword.subtitle')
              }
            </p>
          </div>

          {!emailSent ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <CyberpunkInput
                label={t('auth.forgotPassword.email')}
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <CyberpunkButton 
                type="submit"
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting 
                  ? t('auth.toast.passwordReset.sending') 
                  : t('auth.forgotPassword.sendResetLink')
                }
              </CyberpunkButton>

              <button
                type="button"
                onClick={() => navigate('/signin')}
                className="w-full text-center text-cyan-400 hover:text-cyan-300 transition-colors text-sm"
              >
                {t('auth.forgotPassword.backToSignIn')}
              </button>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <div className="text-green-400 text-lg">
                ✓ {t('auth.forgotPassword.emailSentSuccess')}
              </div>
              <p className="text-gray-400 text-sm">
                {t('auth.forgotPassword.redirecting')}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
