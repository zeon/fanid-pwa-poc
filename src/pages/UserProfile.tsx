
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileInformation from '@/components/profile/ProfileInformation';
import FanIdSection from '@/components/profile/FanIdSection';
import ChangePasswordSection from '@/components/profile/ChangePasswordSection';

const UserProfile = () => {
  const navigate = useNavigate();
  
  // Mock user data - in a real app this would come from auth context
  const [userInfo] = useState({
    name: 'Alex Chen',
    email: 'alex.chen@example.com',
    initials: 'AC',
    fanId: 'FC2024AC001'
  });

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
