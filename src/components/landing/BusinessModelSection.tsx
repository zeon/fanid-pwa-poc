import React from 'react';
import { useTranslation } from 'react-i18next';
import { TrendingUp, Star, Globe, CheckCircle, Target, Zap, Shield, Rocket } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const BusinessModelSection = () => {
  const { t } = useTranslation();

  const metrics = [
    {
      key: 'marketSize',
      icon: TrendingUp,
      gradient: 'from-cyan-400 to-blue-500'
    },
    {
      key: 'growth',
      icon: Star,
      gradient: 'from-purple-400 to-pink-500'
    },
    {
      key: 'efficiency',
      icon: Globe,
      gradient: 'from-green-400 to-emerald-500'
    }
  ];

  const advantages = [
    {
      key: 0,
      icon: Target,
      gradient: 'from-cyan-400 to-cyan-600'
    },
    {
      key: 1,
      icon: Zap,
      gradient: 'from-purple-400 to-purple-600'
    },
    {
      key: 2,
      icon: Shield,
      gradient: 'from-green-400 to-green-600'
    },
    {
      key: 3,
      icon: Rocket,
      gradient: 'from-orange-400 to-red-500'
    }
  ];

  return (
    <section id="business-model" className="relative py-20 bg-gray-900 overflow-hidden">
      {/* Cyberpunk grid background */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      {/* Neon glow effects */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            {t('landing.businessModel.title')}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t('landing.businessModel.subtitle')}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto mt-6 rounded-full"></div>
        </div>


        {/* Advantages Section */}
        <div className="relative">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                {t('landing.businessModel.advantages.title')}
              </span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {advantages.map((advantage) => {
              const Icon = advantage.icon;
              return (
                <Card 
                  key={advantage.key}
                  className="group bg-gray-800/50 border-gray-700 backdrop-blur-sm hover:border-green-400/50 transition-all duration-300 hover:scale-105"
                >
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className={`absolute inset-0 bg-gradient-to-r ${advantage.gradient} rounded-lg blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300`}></div>
                        <div className={`relative w-12 h-12 bg-gradient-to-r ${advantage.gradient} rounded-lg flex items-center justify-center`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <CardTitle className="text-xl text-white group-hover:text-green-400 transition-colors duration-300">
                          {t(`landing.businessModel.advantages.features.${advantage.key}.title`)}
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 leading-relaxed">
                      {t(`landing.businessModel.advantages.features.${advantage.key}.description`)}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessModelSection;