import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Globe } from 'lucide-react';

const ContactUsSection = () => {
  const { t } = useTranslation();

  const contactInfo = [
    {
      icon: Mail,
      label: t('landing.contact.info.email.label'),
      value: t('landing.contact.info.email.value'),
      gradient: 'from-cyan-500 to-blue-500'
    },
    {
      icon: Globe,
      label: t('landing.contact.info.website.label'),
      value: t('landing.contact.info.website.value'),
      gradient: 'from-purple-500 to-pink-500'
    }
  ];

  return (
    <section id="contact" className="relative py-20 bg-gray-900 overflow-hidden">
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
        <div className="absolute top-20 left-10 w-32 h-32 bg-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            {t('landing.contact.title')}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t('landing.contact.subtitle')}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Centered Contact Information */}
        <div className="max-w-md mx-auto">
          <div className="space-y-6">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <Card
                  key={index}
                  className="group bg-gray-800/30 border-gray-700 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-center space-x-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${info.gradient} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-center">
                        <h4 className="text-white font-semibold group-hover:text-cyan-300 transition-colors duration-300">
                          {info.label}
                        </h4>
                        <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                          {info.value}
                        </p>
                      </div>
                    </div>
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

export default ContactUsSection;