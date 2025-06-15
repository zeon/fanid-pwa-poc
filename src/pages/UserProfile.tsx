
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import CyberpunkInput from '@/components/auth/CyberpunkInput';
import CyberpunkButton from '@/components/auth/CyberpunkButton';
import { ArrowLeft, User, Mail, Lock, Edit } from 'lucide-react';

const UserProfile = () => {
  const navigate = useNavigate();
  
  // Mock user data - in a real app this would come from auth context
  const [userInfo, setUserInfo] = useState({
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
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const handleGoBack = () => {
    navigate('/dashboard');
  };

  const handleProfileInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handlePasswordInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validatePasswordForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!passwordData.currentPassword) newErrors.currentPassword = 'Current password is required';
    if (!passwordData.newPassword) newErrors.newPassword = 'New password is required';
    else if (passwordData.newPassword.length < 8) newErrors.newPassword = 'Password must be at least 8 characters';
    if (!passwordData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (passwordData.newPassword !== passwordData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveProfile = () => {
    console.log('Saving profile:', userInfo);
    setIsEditingProfile(false);
    // TODO: Implement actual profile update logic
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
            Back to Dashboard
          </button>
          <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            User Profile
          </h1>
          <div></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Profile Information Card */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl text-white flex items-center gap-2">
              <User className="h-5 w-5 text-cyan-400" />
              Profile Information
            </CardTitle>
            <CyberpunkButton 
              size="sm" 
              variant="secondary"
              onClick={() => setIsEditingProfile(!isEditingProfile)}
            >
              <Edit size={16} />
              {isEditingProfile ? 'Cancel' : 'Edit'}
            </CyberpunkButton>
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

            {isEditingProfile ? (
              <div className="space-y-4">
                <CyberpunkInput
                  label="Full Name"
                  icon={<User size={16} />}
                  value={userInfo.name}
                  onChange={handleProfileInputChange('name')}
                  error={errors.name}
                />
                <CyberpunkInput
                  label="Email"
                  type="email"
                  icon={<Mail size={16} />}
                  value={userInfo.email}
                  onChange={handleProfileInputChange('email')}
                  error={errors.email}
                />
                <div className="flex space-x-4">
                  <CyberpunkButton onClick={handleSaveProfile}>
                    Save Changes
                  </CyberpunkButton>
                  <CyberpunkButton 
                    variant="secondary" 
                    onClick={() => setIsEditingProfile(false)}
                  >
                    Cancel
                  </CyberpunkButton>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-cyan-400 text-sm font-medium uppercase tracking-wide flex items-center gap-2">
                    <User size={16} />
                    Full Name
                  </label>
                  <p className="text-white mt-1">{userInfo.name}</p>
                </div>
                <div>
                  <label className="text-cyan-400 text-sm font-medium uppercase tracking-wide flex items-center gap-2">
                    <Mail size={16} />
                    Email
                  </label>
                  <p className="text-white mt-1">{userInfo.email}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Change Password Card */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center gap-2">
              <Lock className="h-5 w-5 text-cyan-400" />
              Change Password
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <CyberpunkInput
                label="Current Password"
                type="password"
                placeholder="••••••••"
                value={passwordData.currentPassword}
                onChange={handlePasswordInputChange('currentPassword')}
                error={errors.currentPassword}
              />
              <CyberpunkInput
                label="New Password"
                type="password"
                placeholder="••••••••"
                value={passwordData.newPassword}
                onChange={handlePasswordInputChange('newPassword')}
                error={errors.newPassword}
              />
              <CyberpunkInput
                label="Confirm New Password"
                type="password"
                placeholder="••••••••"
                value={passwordData.confirmPassword}
                onChange={handlePasswordInputChange('confirmPassword')}
                error={errors.confirmPassword}
              />
              <CyberpunkButton type="submit">
                Update Password
              </CyberpunkButton>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;
