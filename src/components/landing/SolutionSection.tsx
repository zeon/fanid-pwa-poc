import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, CheckCircle, Zap, Sparkles, Lock, Smartphone, Server } from 'lucide-react';

const SolutionSection = () => {
  const { t } = useTranslation();

  const features = [
    {
      key: 'security',
      title: t('landing.solution.features.security.title'),
      description: t('landing.solution.features.security.description'),
      icon: Shield,
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      key: 'verification',
      title: t('landing.solution.features.verification.title'),
      description: t('landing.solution.features.verification.description'),
      icon: CheckCircle,
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      key: 'efficiency',
      title: t('landing.solution.features.efficiency.title'),
      description: t('landing.solution.features.efficiency.description'),
      icon: Zap,
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      key: 'engaging',
      title: t('landing.solution.features.engaging.title'),
      description: t('landing.solution.features.engaging.description'),
      icon: Sparkles,
      gradient: 'from-purple-500 to-pink-500'
    },
  ];

  const zkFeatures = [
    {
      key: 'clientEncryption',
      title: t('landing.solution.zkTechnology.clientEncryption.title'),
      description: t('landing.solution.zkTechnology.clientEncryption.description'),
      icon: Lock,
    },
    {
      key: 'noExtraCost',
      title: t('landing.solution.zkTechnology.noExtraCost.title'),
      description: t('landing.solution.zkTechnology.noExtraCost.description'),
      icon: Smartphone,
    },
    {
      key: 'serverSecurity',
      title: t('landing.solution.zkTechnology.serverSecurity.title'),
      description: t('landing.solution.zkTechnology.serverSecurity.description'),
      icon: Server,
    },
  ];

  return (
    <section id="solution" className="relative py-20 bg-gray-900 overflow-hidden">
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
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            {t('landing.solution.title')}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t('landing.solution.subtitle')}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card
                key={feature.key}
                className="group relative overflow-hidden bg-gray-800/50 border-gray-700 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/25"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <CardHeader className="relative z-10 text-center pb-4">
                  <div className={`mx-auto mb-4 w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-white group-hover:text-cyan-300 transition-colors duration-300">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="relative z-10 text-center">
                  <p className="text-gray-300 text-sm leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                    {feature.description}
                  </p>
                </CardContent>

                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur"></div>
              </Card>
            );
          })}
        </div>

        {/* Split Layout: ZK Technology & Verification Flow */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Side: Zero-Knowledge Technology */}
          <div className="space-y-6">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                {t('landing.solution.zkTechnology.title')}
              </h3>
            </div>
            
            <div className="space-y-4">
              {zkFeatures.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div
                    key={feature.key}
                    className="flex items-start space-x-4 p-4 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-colors duration-300 group"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors duration-300">
                        {feature.title}
                      </h4>
                      <p className="text-gray-300 text-sm leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Side: Verification Flow */}
          <div className="text-center">
            <div className="relative">
              {/* Circular Progress Background */}
              <div className="mx-auto w-64 h-64 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 flex items-center justify-center relative overflow-hidden">
                {/* Animated border */}
                <div className="absolute inset-2 rounded-full border-2 border-dashed border-cyan-400/50 animate-spin" style={{ animationDuration: '8s' }}></div>
                
                {/* Phone Icon */}
                <div className="relative z-10 w-20 h-20 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-2xl">
                  <Smartphone className="w-10 h-10 text-white" />
                </div>
                
                {/* Floating particles */}
                <div className="absolute inset-0">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-cyan-400 rounded-full opacity-60 animate-ping"
                      style={{
                        left: `${20 + (i * 10)}%`,
                        top: `${20 + (i * 8)}%`,
                        animationDelay: `${i * 0.5}s`,
                        animationDuration: '2s'
                      }}
                    />
                  ))}
                </div>
              </div>
              
              {/* Verification Flow Text */}
              <div className="mt-8">
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  {t('landing.solution.verificationFlow.title')}
                </h3>
                <p className="text-lg text-gray-300 font-medium">
                  {t('landing.solution.verificationFlow.subtitle')}
                </p>
              </div>

              {/* Process Steps */}
              <div className="mt-8 flex justify-center space-x-4">
                {['掃描', '驗證', '通過'].map((step, index) => (
                  <div key={step} className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {index + 1}
                    </div>
                    {index < 2 && (
                      <div className="w-8 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 mx-2"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;