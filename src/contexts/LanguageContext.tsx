
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
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
  // Initialize with saved language or default
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('preferred-language');
    return savedLanguage || i18n.language || 'en-US';
  });

  const availableLanguages = [
    { code: 'en-US', name: 'English' },
    { code: 'zh-TW', name: '繁體中文' },
  ];

  const switchLanguage = useCallback((language: string) => {
    i18n.changeLanguage(language);
    setCurrentLanguage(language);
    localStorage.setItem('preferred-language', language);
  }, []);

  // Sync i18n on mount
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
