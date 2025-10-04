import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import CyberpunkInput from '@/components/auth/CyberpunkInput';
import CyberpunkButton from '@/components/auth/CyberpunkButton';
import TextLanguageSwitcher from '@/components/navigation/TextLanguageSwitcher';
import { changePasswordSchema } from '@/utils/validation';

const ResetPassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { resetPassword } = useAuth();
  
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    // Check if we have a valid recovery token in the URL
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const type = hashParams.get('type');
    
    if (type !== 'recovery') {
      toast.error(t('auth.toast.passwordReset.invalidToken'));
      navigate('/signin');
    }
  }, [navigate, t]);

  const validateForm = () => {
    try {
      changePasswordSchema.parse({
        currentPassword: 'dummy', // Not used in reset flow
        newPassword,
        confirmNewPassword: confirmPassword
      });
      setErrors({});
      return true;
    } catch (error: any) {
      const newErrors: Record<string, string> = {};
      error.errors?.forEach((err: any) => {
        if (err.path[0] === 'newPassword') {
          newErrors.newPassword = err.message;
        } else if (err.path[0] === 'confirmNewPassword') {
          newErrors.confirmPassword = err.message;
        }
      });
      setErrors(newErrors);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await resetPassword(newPassword);
      
      if (error) {
        toast.error(t('auth.toast.passwordReset.resetFailed'));
      } else {
        toast.success(t('auth.toast.passwordReset.resetSuccess'));
        
        // Redirect to dashboard after successful reset
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      }
    } catch (error) {
      toast.error(t('auth.toast.passwordReset.resetFailed'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPasswordStrength = (password: string): { strength: string; color: string } => {
    if (password.length === 0) return { strength: '', color: '' };
    if (password.length < 8) return { strength: t('auth.resetPassword.weak'), color: 'text-red-500' };
    if (password.length < 12) return { strength: t('auth.resetPassword.medium'), color: 'text-yellow-500' };
    return { strength: t('auth.resetPassword.strong'), color: 'text-green-500' };
  };

  const passwordStrength = getPasswordStrength(newPassword);

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
              <Lock className="w-8 h-8 text-cyan-400" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2 tracking-wider">
              {t('auth.resetPassword.title')}
            </h1>
            <p className="text-gray-400">
              {t('auth.resetPassword.subtitle')}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <CyberpunkInput
                label={t('auth.resetPassword.newPassword')}
                type={showNewPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  if (errors.newPassword) {
                    setErrors(prev => ({ ...prev, newPassword: '' }));
                  }
                }}
                error={errors.newPassword}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-9 text-gray-400 hover:text-cyan-400 transition-colors"
              >
                {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
              {newPassword && (
                <div className="mt-2 text-sm">
                  <span className="text-gray-400">{t('auth.resetPassword.passwordStrength')}: </span>
                  <span className={passwordStrength.color}>{passwordStrength.strength}</span>
                </div>
              )}
            </div>

            <div className="relative">
              <CyberpunkInput
                label={t('auth.resetPassword.confirmPassword')}
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (errors.confirmPassword) {
                    setErrors(prev => ({ ...prev, confirmPassword: '' }));
                  }
                }}
                error={errors.confirmPassword}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-9 text-gray-400 hover:text-cyan-400 transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <CyberpunkButton 
              type="submit"
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting 
                ? t('auth.resetPassword.resetting') 
                : t('auth.resetPassword.resetButton')
              }
            </CyberpunkButton>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
