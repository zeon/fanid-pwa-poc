
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileInformation from '@/components/profile/ProfileInformation';
import FanIdSection from '@/components/profile/FanIdSection';
import ChangePasswordSection from '@/components/profile/ChangePasswordSection';

const UserProfile = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  
  // Get user display data
  const userInfo = {
    name: profile?.username || user?.email?.split('@')[0] || 'User',
    email: user?.email || '',
    initials: profile?.username 
      ? profile.username.slice(0, 2).toUpperCase() 
      : user?.email?.slice(0, 2).toUpperCase() || 'U',
    fanId: user?.id?.slice(0, 12).toUpperCase() || 'N/A'
  };

  const handleGoBack = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <ProfileHeader onGoBack={handleGoBack} />
      
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <ProfileInformation userInfo={userInfo} />
        <FanIdSection fanId={userInfo.fanId} />
        <ChangePasswordSection />
      </div>
    </div>
  );
};

export default UserProfile;
