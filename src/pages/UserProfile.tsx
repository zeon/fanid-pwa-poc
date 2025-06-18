
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import CyberpunkInput from '@/components/auth/CyberpunkInput';
import CyberpunkButton from '@/components/auth/CyberpunkButton';
import TextLanguageSwitcher from '@/components/navigation/TextLanguageSwitcher';
import { ArrowLeft, User, Mail, Lock } from 'lucide-react';

const UserProfile = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  // Mock user data - in a real app this would come from auth context
  const [userInfo] = useState({
    name: 'Alex Chen',
    email: 'alex.chen@example.com',
    initials: 'AC'
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleGoBack = () => {
    navigate('/dashboard');
  };

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
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft size={20} />
            {t('profile.backToDashboard')}
          </button>
          <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            {t('profile.title')}
          </h1>
          <TextLanguageSwitcher />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Profile Information Card */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center gap-2">
              <User className="h-5 w-5 text-cyan-400" />
              {t('profile.profileInformation')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-6">
              <Avatar className="w-20 h-20">
                <AvatarImage src="" alt={userInfo.name} />
                <AvatarFallback className="bg-gradient-to-r from-cyan-400 to-purple-400 text-white font-bold text-2xl">
                  {userInfo.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white">{userInfo.name}</h3>
                <p className="text-gray-400">{userInfo.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-cyan-400 text-sm font-medium uppercase tracking-wide flex items-center gap-2">
                  <User size={16} />
                  {t('profile.fullName')}
                </label>
                <p className="text-white mt-1">{userInfo.name}</p>
              </div>
              <div>
                <label className="text-cyan-400 text-sm font-medium uppercase tracking-wide flex items-center gap-2">
                  <Mail size={16} />
                  {t('profile.email')}
                </label>
                <p className="text-white mt-1">{userInfo.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Change Password Card */}
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
      </div>
    </div>
  );
};

export default UserProfile;
