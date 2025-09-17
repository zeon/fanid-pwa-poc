
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LandingNavbar from '@/components/landing/LandingNavbar';

const Index = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <LandingNavbar />

      {/* Hero Section */}
      <div 
        className="relative min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: 'url(/fanid-hero-background.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50"></div>
        
        {/* Animated dots */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full animate-floating-dots"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${60 + Math.random() * 40}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            {t('landing.hero.title')}
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed max-w-3xl mx-auto">
            {t('landing.hero.subtitle')}
          </p>
        </div>
      </div>

      {/* Entry Staff Section - Bottom of page */}
      <div className="bg-gray-800 border-t border-gray-700 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link to="/entry-staff">
            <Button 
              variant="outline" 
              size="lg"
              className="bg-orange-500/10 border-orange-400 text-orange-400 hover:bg-orange-500/20 hover:text-orange-300 px-8 py-4 text-lg font-semibold"
            >
              <QrCode className="mr-2 h-6 w-6" />
              {t('landing.button.entryStuff')}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
