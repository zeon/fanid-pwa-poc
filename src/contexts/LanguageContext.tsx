
import React, { createContext, useContext, useState, useEffect } from 'react';
import i18n from '@/i18n/config';

interface LanguageContextType {
  currentLanguage: string;
  switchLanguage: (language: string) => void;
  availableLanguages: { code: string; name: string }[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const availableLanguages = [
    { code: 'en-US', name: 'English' },
    { code: 'zh-TW', name: '繁體中文' },
  ];

  const [currentLanguage, setCurrentLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('preferred-language');
    return savedLanguage || i18n.language || 'en-US';
  });

  const switchLanguage = (language: string) => {
    i18n.changeLanguage(language);
    setCurrentLanguage(language);
    localStorage.setItem('preferred-language', language);
  };

  useEffect(() => {
    if (currentLanguage) {
      i18n.changeLanguage(currentLanguage);
    }
  }, [currentLanguage]);

  return (
    <LanguageContext.Provider value={{ currentLanguage, switchLanguage, availableLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
};
