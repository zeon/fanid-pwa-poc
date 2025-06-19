
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import TextLanguageSwitcher from '@/components/navigation/TextLanguageSwitcher';

interface ProfileHeaderProps {
  onGoBack: () => void;
}

const ProfileHeader = ({ onGoBack }: ProfileHeaderProps) => {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-800 border-b border-gray-700 p-4">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <button
          onClick={onGoBack}
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
  );
};

export default ProfileHeader;
