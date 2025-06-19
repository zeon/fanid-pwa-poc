
import React, { useState } from 'react';
import { Lock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CyberpunkInput from '@/components/auth/CyberpunkInput';
import CyberpunkButton from '@/components/auth/CyberpunkButton';

const ChangePasswordSection = () => {
  const { t } = useTranslation();
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handlePasswordInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validatePasswordForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!passwordData.currentPassword) newErrors.currentPassword = t('profile.validation.currentPasswordRequired');
    if (!passwordData.newPassword) newErrors.newPassword = t('profile.validation.newPasswordRequired');
    else if (passwordData.newPassword.length < 8) newErrors.newPassword = t('profile.validation.passwordTooShort');
    if (!passwordData.confirmPassword) newErrors.confirmPassword = t('profile.validation.confirmPasswordRequired');
    else if (passwordData.newPassword !== passwordData.confirmPassword) newErrors.confirmPassword = t('profile.validation.passwordMismatch');
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (validatePasswordForm()) {
      console.log('Changing password...');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      // TODO: Implement actual password change logic
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
          <CyberpunkInput
            label={t('profile.currentPassword')}
            type="password"
            placeholder="••••••••"
            value={passwordData.currentPassword}
            onChange={handlePasswordInputChange('currentPassword')}
            error={errors.currentPassword}
          />
          <CyberpunkInput
            label={t('profile.newPassword')}
            type="password"
            placeholder="••••••••"
            value={passwordData.newPassword}
            onChange={handlePasswordInputChange('newPassword')}
            error={errors.newPassword}
          />
          <CyberpunkInput
            label={t('profile.confirmNewPassword')}
            type="password"
            placeholder="••••••••"
            value={passwordData.confirmPassword}
            onChange={handlePasswordInputChange('confirmPassword')}
            error={errors.confirmPassword}
          />
          <CyberpunkButton type="submit">
            {t('profile.updatePassword')}
          </CyberpunkButton>
        </form>
      </CardContent>
    </Card>
  );
};

export default ChangePasswordSection;
