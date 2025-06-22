
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Fingerprint, Zap, Shield, Music, QrCode } from 'lucide-react';
import TextLanguageSwitcher from '@/components/navigation/TextLanguageSwitcher';

const Index = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* Enhanced Background Effects with reduced grid opacity */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(147, 51, 234, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(147, 51, 234, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px'
        }}></div>
      </div>
      
      <div className="absolute top-20 left-10 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-pink-500/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-1/3 left-1/4 w-36 h-36 bg-cyan-500/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '3s' }}></div>

      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Main header row */}
          <div className="flex items-center justify-between mb-4 md:mb-0">
            <div className="flex items-center space-x-4">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                FanID
              </h1>
              <div className="w-12 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400"></div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <TextLanguageSwitcher />
              <Link to="/signin">
                <Button variant="outline" className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black">
                  {t('landing.header.signIn')}
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400">
                  {t('landing.header.getStarted')}
                </Button>
              </Link>
            </div>
            <div className="flex md:hidden items-center space-x-2">
              <Link to="/signin">
                <Button variant="outline" size="sm" className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black">
                  {t('landing.header.signIn')}
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="sm" className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400">
                  {t('landing.header.getStarted')}
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Mobile language switcher row */}
          <div className="flex md:hidden justify-center">
            <TextLanguageSwitcher />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            {t('landing.hero.title')}
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            {t('landing.hero.subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/signup">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-bold px-8 py-4 text-lg"
              >
                <Fingerprint className="mr-2" size={24} />
                {t('landing.hero.createAccount')}
              </Button>
            </Link>
            <Link to="/signin">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black font-bold px-8 py-4 text-lg"
              >
                {t('landing.hero.accessPortal')}
              </Button>
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 text-center hover:border-cyan-400/50 transition-all duration-300 hover:scale-105">
              <Fingerprint className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">{t('landing.features.biometric.title')}</h3>
              <p className="text-gray-400">{t('landing.features.biometric.description')}</p>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 text-center hover:border-purple-400/50 transition-all duration-300 hover:scale-105">
              <Zap className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">{t('landing.features.instant.title')}</h3>
              <p className="text-gray-400">{t('landing.features.instant.description')}</p>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 text-center hover:border-pink-400/50 transition-all duration-300 hover:scale-105">
              <Music className="w-12 h-12 text-pink-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">{t('landing.features.immersive.title')}</h3>
              <p className="text-gray-400">{t('landing.features.immersive.description')}</p>
            </div>
          </div>

          {/* Entry Staff Access Button */}
          <div className="mt-16 pt-8 border-t border-gray-700">
            <Link to="/entry-staff">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-black font-bold px-8 py-4 text-lg"
              >
                <QrCode className="mr-2" size={24} />
                {t('landing.button.entryStuff')}
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
