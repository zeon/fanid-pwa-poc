import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import TextLanguageSwitcher from '@/components/navigation/TextLanguageSwitcher';

const LandingNavbar = () => {
  const { t } = useTranslation();

  const navItems = [
    { key: 'theChallenge', href: '#challenge' },
    { key: 'ourSolution', href: '#solution' },
    { key: 'businessModel', href: '#business-model' },
    { key: 'ourTeam', href: '#team' },
    { key: 'contactUs', href: '#contact' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              FanID
            </Link>
          </div>

          {/* Navigation Links - Hidden on mobile */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  className="text-gray-300 hover:text-cyan-400 px-3 py-2 text-sm font-medium transition-colors duration-200"
                >
                  {t(`landing.navbar.${item.key}`)}
                </a>
              ))}
            </div>
          </div>

          {/* Right side - Language switcher and buttons */}
          <div className="flex items-center space-x-4">
            <TextLanguageSwitcher />
            <Link to="/signin">
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-gray-700">
                {t('landing.header.signIn')}
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="sm" className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white">
                {t('landing.header.getStarted')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default LandingNavbar;