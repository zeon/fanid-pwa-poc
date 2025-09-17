
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';

const TextLanguageSwitcher = () => {
  const { t } = useTranslation();
  const { currentLanguage, switchLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-2 text-xs">
      <button
        onClick={() => switchLanguage('zh-TW')}
        className={`transition-colors ${
          currentLanguage === 'zh-TW' 
            ? 'text-cyan-400 font-medium' 
            : 'text-gray-400 hover:text-white'
        }`}
      >
        繁體中文
      </button>
      <span className="text-gray-500">|</span>
      <button
        onClick={() => switchLanguage('en-US')}
        className={`transition-colors ${
          currentLanguage === 'en-US' 
            ? 'text-cyan-400 font-medium' 
            : 'text-gray-400 hover:text-white'
        }`}
      >
        English
      </button>
    </div>
  );
};

export default TextLanguageSwitcher;
