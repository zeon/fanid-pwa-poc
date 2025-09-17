import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Shield, Clock } from 'lucide-react';

const ChallengeSection = () => {
  const { t } = useTranslation();

  const challenges = [
    {
      key: 'scalping',
      title: t('landing.challenge.scalping.title'),
      description: t('landing.challenge.scalping.description'),
      icon: Users,
    },
    {
      key: 'counterfeiting', 
      title: t('landing.challenge.counterfeiting.title'),
      description: t('landing.challenge.counterfeiting.description'),
      icon: Shield,
    },
    {
      key: 'inefficiency',
      title: t('landing.challenge.inefficiency.title'),
      description: t('landing.challenge.inefficiency.description'),
      icon: Clock,
    },
  ];

  return (
    <section id="challenge" className="relative py-20 bg-gray-900">
      {/* Cyberpunk grid background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      {/* Neon glow effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            {t('landing.challenge.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        {/* Challenge Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {challenges.map((challenge, index) => {
            const IconComponent = challenge.icon;
            return (
              <Card
                key={challenge.key}
                className="group relative overflow-hidden bg-gray-800/50 border-gray-700 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/25"
              >
                {/* Gradient border effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                
                <CardHeader className="relative z-10 pb-4 text-center">
                  <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300">
                    {challenge.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="relative z-10 text-center">
                  <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                    {challenge.description}
                  </p>
                </CardContent>

                {/* Floating glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur"></div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ChallengeSection;