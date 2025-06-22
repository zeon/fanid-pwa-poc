
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowLeft, Music } from 'lucide-react';
import TextLanguageSwitcher from '@/components/navigation/TextLanguageSwitcher';

const EntryVerificationComplete = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const eventName = location.state?.eventName || 'Concert';

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* Language switcher positioned at top right */}
      <div className="absolute top-6 right-6 z-20">
        <TextLanguageSwitcher />
      </div>

      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(147, 51, 234, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(147, 51, 234, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '120px 120px'
        }}></div>
      </div>
      
      <div className="absolute top-10 left-20 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-60 h-60 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-green-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mb-4">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
                Fan Verse
              </h1>
              <div className="w-16 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto"></div>
            </div>
          </div>

          {/* Success Card */}
          <div className="relative">
            {/* Outer glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-green-500/20 to-cyan-500/20 rounded-xl blur-xl animate-pulse" style={{ animationDuration: '3s' }}></div>
            <div className="absolute -inset-2 bg-gradient-to-r from-green-400/30 to-cyan-400/30 rounded-lg blur-md"></div>
            
            {/* Card container */}
            <div className="relative bg-gray-800/50 backdrop-blur-sm border border-green-500/30 rounded-lg p-8 shadow-2xl shadow-green-500/25">
              <div className="text-center space-y-6">
                {/* Success Icon */}
                <div className="flex justify-center">
                  <div className="relative">
                    <CheckCircle className="w-20 h-20 text-green-400" />
                    <div className="absolute inset-0 w-20 h-20 bg-green-400/20 rounded-full animate-ping"></div>
                  </div>
                </div>

                {/* Success Message */}
                <div className="space-y-3">
                  <h2 className="text-2xl font-bold text-green-400">
                    {t('entryVerification.success.title')}
                  </h2>
                  <p className="text-gray-300">
                    {t('entryVerification.success.subtitle')}
                  </p>
                </div>

                {/* Event Info */}
                <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600">
                  <div className="flex items-center justify-center gap-3 text-cyan-400">
                    <Music className="w-5 h-5" />
                    <span className="font-medium">{eventName}</span>
                  </div>
                </div>

                {/* Ready Message */}
                <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                  <p className="text-green-400 font-medium">
                    {t('entryVerification.success.readyMessage')}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-4">
                  <Button
                    onClick={() => navigate('/active-tickets')}
                    className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-bold py-3"
                  >
                    {t('entryVerification.success.backToTickets')}
                  </Button>
                  
                  <Button
                    onClick={() => navigate('/dashboard')}
                    variant="outline"
                    className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    {t('entryVerification.success.backToDashboard')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntryVerificationComplete;
