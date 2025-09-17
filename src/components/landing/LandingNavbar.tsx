import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import TextLanguageSwitcher from '@/components/navigation/TextLanguageSwitcher';

const LandingNavbar = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { key: 'theChallenge', href: '#challenge' },
    { key: 'ourSolution', href: '#solution' },
    { key: 'businessModel', href: '#business-model' },
    { key: 'ourTeam', href: '#team' },
    { key: 'contactUs', href: '#contact' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/60 backdrop-blur-md border-b border-gray-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              FanID
            </Link>
          </div>

          {/* Desktop Navigation */}
          {!isMobile && (
            <>
              {/* Navigation Links */}
              <div className="flex items-baseline space-x-8">
                {navItems.map((item) => (
                  <a
                    key={item.key}
                    href={item.href}
                    className="text-gray-300 hover:text-cyan-400 px-3 py-2 text-sm font-medium transition-colors duration-200"
                    onClick={(e) => {
                      e.preventDefault();
                      const target = document.querySelector(item.href) as HTMLElement;
                      if (target) {
                        const navbarHeight = 64; // Height of fixed navbar
                        const targetPosition = target.offsetTop - navbarHeight;
                        const startPosition = window.pageYOffset;
                        const distance = targetPosition - startPosition;
                        const duration = Math.min(1000, Math.abs(distance) * 0.8); // Max 1s, adaptive based on distance
                        
                        let start: number | null = null;
                        
                        function smoothScroll(timestamp: number) {
                          if (!start) start = timestamp;
                          const progress = timestamp - start;
                          const percentage = Math.min(progress / duration, 1);
                          
                          // Easing function with acceleration near target
                          const easeInOutCubic = percentage < 0.5 
                            ? 4 * percentage * percentage * percentage 
                            : 1 - Math.pow(-2 * percentage + 2, 3) / 2;
                          
                          window.scrollTo({
                            top: startPosition + distance * easeInOutCubic,
                            behavior: 'auto'
                          });
                          
                          if (progress < duration) {
                            requestAnimationFrame(smoothScroll);
                          }
                        }
                        
                        requestAnimationFrame(smoothScroll);
                      }
                    }}
                  >
                    {t(`landing.navbar.${item.key}`)}
                  </a>
                ))}
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
            </>
          )}

          {/* Mobile hamburger button */}
          {isMobile && (
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          )}
        </div>

        {/* Mobile menu */}
        {isMobile && isMenuOpen && (
          <div className="bg-gray-900/95 backdrop-blur-md border-t border-gray-800/50">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  className="text-gray-300 hover:text-cyan-400 block px-3 py-2 text-base font-medium transition-colors duration-200"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMenuOpen(false);
                    const target = document.querySelector(item.href) as HTMLElement;
                    if (target) {
                      const navbarHeight = 64;
                      const targetPosition = target.offsetTop - navbarHeight;
                      const startPosition = window.pageYOffset;
                      const distance = targetPosition - startPosition;
                      const duration = Math.min(1000, Math.abs(distance) * 0.8);
                      
                      let start: number | null = null;
                      
                      function smoothScroll(timestamp: number) {
                        if (!start) start = timestamp;
                        const progress = timestamp - start;
                        const percentage = Math.min(progress / duration, 1);
                        
                        const easeInOutCubic = percentage < 0.5 
                          ? 4 * percentage * percentage * percentage 
                          : 1 - Math.pow(-2 * percentage + 2, 3) / 2;
                        
                        window.scrollTo({
                          top: startPosition + distance * easeInOutCubic,
                          behavior: 'auto'
                        });
                        
                        if (progress < duration) {
                          requestAnimationFrame(smoothScroll);
                        }
                      }
                      
                      requestAnimationFrame(smoothScroll);
                    }
                  }}
                >
                  {t(`landing.navbar.${item.key}`)}
                </a>
              ))}
              
              <div className="border-t border-gray-800/50 pt-4 mt-4">
                <div className="px-3 py-2 flex justify-center">
                  <TextLanguageSwitcher />
                </div>
                
                <div className="space-y-2 px-3">
                  <Link to="/signin" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="w-full text-gray-300 hover:text-white hover:bg-gray-700">
                      {t('landing.header.signIn')}
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white">
                      {t('landing.header.getStarted')}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default LandingNavbar;