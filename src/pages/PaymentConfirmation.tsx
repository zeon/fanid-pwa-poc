
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CheckCircle, Calendar, MapPin, Users, Ticket, Home } from 'lucide-react';
import CyberpunkButton from '@/components/auth/CyberpunkButton';
import { upcomingEvents, pastEvents } from '@/data/eventsData';

const PaymentConfirmation = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  
  const purchaseData = location.state?.purchaseData;
  
  // Find the event details
  const event = [...upcomingEvents, ...pastEvents].find(e => e.id === purchaseData?.eventId);
  
  if (!purchaseData || !event) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">{t('payment.confirmation.notFound.title')}</h1>
          <p className="text-gray-400 mb-6">{t('payment.confirmation.notFound.description')}</p>
          <CyberpunkButton onClick={() => navigate('/dashboard')}>
            {t('payment.confirmation.backToDashboard')}
          </CyberpunkButton>
        </div>
      </div>
    );
  }

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}></div>
      </div>
      
      <div className="absolute top-10 left-20 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-60 h-60 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
        <div className="w-full max-w-2xl">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="mb-6">
              <CheckCircle className="w-24 h-24 text-green-400 mx-auto mb-4 animate-pulse" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
                {t('payment.confirmation.success.title')}
              </h1>
              <p className="text-gray-400 text-lg">{t('payment.confirmation.success.subtitle')}</p>
            </div>
          </div>

          {/* Confirmation Details */}
          <div className="relative">
            {/* Outer glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-green-500/20 to-cyan-500/20 rounded-xl blur-xl animate-pulse" style={{ animationDuration: '3s' }}></div>
            
            {/* Form container */}
            <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-8 shadow-2xl shadow-green-500/25">
              <div className="space-y-6">
                {/* Event Information */}
                <div className="bg-gradient-to-r from-gray-800/90 to-gray-700/90 backdrop-blur-sm border border-gray-600 rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Ticket className="w-6 h-6 text-cyan-400" />
                    <h2 className="text-2xl font-bold text-white">{t('payment.confirmation.ticketDetails')}</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-white">{event.name}</h3>
                      <div className="flex items-center space-x-2 text-gray-300">
                        <Calendar className="w-4 h-4 text-purple-400" />
                        <span className="text-sm">{event.date}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-300">
                        <MapPin className="w-4 h-4 text-green-400" />
                        <span className="text-sm">{event.venue}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                        <div className="text-sm text-gray-400 mb-1">{t('payment.confirmation.orderNumber')}</div>
                        <div className="text-lg font-bold text-green-400">FV-{Date.now().toString().slice(-8)}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Purchase Summary */}
                <div className="bg-gradient-to-r from-gray-800/90 to-gray-700/90 backdrop-blur-sm border border-gray-600 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-white mb-4">{t('payment.confirmation.purchaseSummary')}</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-300">{t('payment.confirmation.quantity')}</span>
                      <span className="font-semibold text-white">{purchaseData.quantity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">{t('payment.confirmation.unitPrice')}</span>
                      <span className="font-semibold text-white">${purchaseData.unitPrice}</span>
                    </div>
                    {purchaseData.seats && purchaseData.seats.length > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-300">{t('payment.confirmation.seats')}</span>
                        <div className="flex flex-wrap gap-1">
                          {purchaseData.seats.map((seat: string) => (
                            <span key={seat} className="bg-cyan-800 text-cyan-200 px-2 py-1 rounded text-xs">
                              {seat}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="border-t border-gray-600 pt-3">
                      <div className="flex justify-between text-lg font-bold">
                        <span className="text-white">{t('payment.confirmation.totalPaid')}</span>
                        <span className="text-green-400">${purchaseData.totalPrice}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Next Steps */}
                <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-lg p-4">
                  <h4 className="font-semibold text-cyan-400 mb-2">{t('payment.confirmation.nextSteps.title')}</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• {t('payment.confirmation.nextSteps.email')}</li>
                    <li>• {t('payment.confirmation.nextSteps.mobile')}</li>
                    <li>• {t('payment.confirmation.nextSteps.venue')}</li>
                  </ul>
                </div>

                {/* Action Button */}
                <CyberpunkButton
                  variant="primary"
                  size="lg"
                  onClick={handleBackToDashboard}
                  className="w-full"
                >
                  <Home className="w-5 h-5" />
                  {t('payment.confirmation.backToDashboard')}
                </CyberpunkButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmation;
