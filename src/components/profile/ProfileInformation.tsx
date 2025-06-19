
import React from 'react';
import { User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface UserInfo {
  name: string;
  email: string;
  initials: string;
  fanId: string;
}

interface ProfileInformationProps {
  userInfo: UserInfo;
}

const ProfileInformation = ({ userInfo }: ProfileInformationProps) => {
  const { t } = useTranslation();

  return (
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
      </CardContent>
    </Card>
  );
};

export default ProfileInformation;
