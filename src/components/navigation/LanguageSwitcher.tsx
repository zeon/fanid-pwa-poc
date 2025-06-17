
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Languages } from 'lucide-react';

const LanguageSwitcher = () => {
  const { t } = useTranslation();
  const { currentLanguage, switchLanguage, availableLanguages } = useLanguage();

  const currentLangName = availableLanguages.find(lang => lang.code === currentLanguage)?.name || 'English';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400">
          <Languages className="w-4 h-4" />
          <span className="text-sm font-medium">{currentLangName}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-48 bg-gray-800 border-gray-700 text-white"
      >
        {availableLanguages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => switchLanguage(language.code)}
            className={`cursor-pointer text-gray-300 hover:text-white hover:bg-gray-700 focus:bg-gray-700 focus:text-white ${
              currentLanguage === language.code ? 'bg-gray-700 text-white' : ''
            }`}
          >
            {language.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
