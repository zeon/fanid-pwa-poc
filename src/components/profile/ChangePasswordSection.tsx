
import React, { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CyberpunkInput from '@/components/auth/CyberpunkInput';
import CyberpunkButton from '@/components/auth/CyberpunkButton';
import { useAuth } from '@/contexts/AuthContext';
import { changePasswordSchema } from '@/utils/validation';

const ChangePasswordSection = () => {
  const { t } = useTranslation();
  const { changePassword } = useAuth();
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePasswordInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validatePasswordForm = () => {
    try {
      changePasswordSchema.parse({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
        confirmNewPassword: passwordData.confirmPassword
      });
      setErrors({});
      return true;
    } catch (error: any) {
      const newErrors: Record<string, string> = {};
      error.errors?.forEach((err: any) => {
        const field = err.path[0];
        if (field === 'currentPassword') {
          newErrors.currentPassword = t('profile.validation.currentPasswordRequired');
        } else if (field === 'newPassword') {
          newErrors.newPassword = err.message === 'Password must be at least 8 characters'
            ? t('profile.validation.passwordTooShort')
            : t('profile.validation.newPasswordRequired');
        } else if (field === 'confirmNewPassword') {
          newErrors.confirmPassword = err.message.includes('match')
            ? t('profile.validation.passwordMismatch')
            : t('profile.validation.confirmPasswordRequired');
        }
      });
      setErrors(newErrors);
      return false;
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePasswordForm()) {
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading(t('profile.toast.changingPassword'));

    try {
      const { error } = await changePassword(
        passwordData.currentPassword,
        passwordData.newPassword
      );

      if (error) {
        toast.dismiss(toastId);
        if (error.message === 'Current password is incorrect') {
          toast.error(t('profile.toast.wrongCurrentPassword'));
          setErrors({ currentPassword: t('profile.toast.wrongCurrentPassword') });
        } else {
          toast.error(t('profile.toast.passwordChangeFailed'));
        }
      } else {
        toast.dismiss(toastId);
        toast.success(t('profile.toast.passwordChanged'));
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setErrors({});
      }
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(t('profile.toast.passwordChangeFailed'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-xl text-white flex items-center gap-2">
          <Lock className="h-5 w-5 text-cyan-400" />
          {t('profile.changePassword')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleChangePassword} className="space-y-4">
          <div className="relative">
            <CyberpunkInput
              label={t('profile.currentPassword')}
              type={showPasswords.current ? 'text' : 'password'}
              placeholder="••••••••"
              value={passwordData.currentPassword}
              onChange={handlePasswordInputChange('currentPassword')}
              error={errors.currentPassword}
            />
            <button
              type="button"
              onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
              className="absolute right-3 top-9 text-gray-400 hover:text-cyan-400 transition-colors"
            >
              {showPasswords.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <div className="relative">
            <CyberpunkInput
              label={t('profile.newPassword')}
              type={showPasswords.new ? 'text' : 'password'}
              placeholder="••••••••"
              value={passwordData.newPassword}
              onChange={handlePasswordInputChange('newPassword')}
              error={errors.newPassword}
            />
            <button
              type="button"
              onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
              className="absolute right-3 top-9 text-gray-400 hover:text-cyan-400 transition-colors"
            >
              {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <div className="relative">
            <CyberpunkInput
              label={t('profile.confirmNewPassword')}
              type={showPasswords.confirm ? 'text' : 'password'}
              placeholder="••••••••"
              value={passwordData.confirmPassword}
              onChange={handlePasswordInputChange('confirmPassword')}
              error={errors.confirmPassword}
            />
            <button
              type="button"
              onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
              className="absolute right-3 top-9 text-gray-400 hover:text-cyan-400 transition-colors"
            >
              {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <CyberpunkButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? t('profile.toast.changingPassword') : t('profile.updatePassword')}
          </CyberpunkButton>
        </form>
      </CardContent>
    </Card>
  );
};

export default ChangePasswordSection;
