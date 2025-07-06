
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Event } from '@/data/eventsData';

const TixcraftRefund = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { event, selectedTicket } = location.state as { 
    event: Event; 
    selectedTicket: string; 
  };

  const isEligible = event?.refundEligible ?? false;

  const handleConfirmRefund = async () => {
    setIsProcessing(true);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Navigate to dashboard with refund success state
    navigate('/dashboard', {
      state: { 
        showRefundSuccess: true,
        refundedEvent: event
      }
    });
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  if (!event) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p>Event not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Tixcraft Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="max-w-4xl mx-auto flex items-center space-x-4">
          <Button
            onClick={handleBackToDashboard}
            variant="ghost"
            className="text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('tixcraft.refund.backToDashboard')}
          </Button>
          <div className="w-8 h-0.5 bg-gray-300"></div>
          <h1 className="text-2xl font-bold text-gray-900">
            {t('tixcraft.refund.title')}
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-6">
        <div className="space-y-6">
          {/* Event Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <img 
                  src={event.image} 
                  alt={event.name} 
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <h2 className="text-xl font-bold">{event.name}</h2>
                  <p className="text-gray-600">{event.date} • {event.venue}</p>
                </div>
              </CardTitle>
            </CardHeader>
          </Card>

          {/* Refund Status Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                {isEligible ? (
                  <CheckCircle className="h-6 w-6 text-green-500" />
                ) : (
                  <XCircle className="h-6 w-6 text-red-500" />
                )}
                <span className={isEligible ? 'text-green-700' : 'text-red-700'}>
                  {isEligible ? t('tixcraft.refund.eligible.title') : t('tixcraft.refund.ineligible.title')}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                {isEligible 
                  ? t('tixcraft.refund.eligible.description')
                  : t('tixcraft.refund.ineligible.description')
                }
              </p>

              {!isEligible && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-700 text-sm">
                    {t('tixcraft.refund.ineligible.reason')}
                  </p>
                </div>
              )}

              {isEligible && (
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-green-700">
                        {t('tixcraft.refund.eligible.refundAmount')}
                      </span>
                      <span className="text-xl font-bold text-green-700">
                        NT$ {event.ticketPrice?.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-green-600 text-sm">
                      {t('tixcraft.refund.eligible.processingTime')}
                    </p>
                  </div>

                  <Button
                    onClick={handleConfirmRefund}
                    disabled={isProcessing}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-3"
                  >
                    {isProcessing 
                      ? 'Processing...' 
                      : t('tixcraft.refund.eligible.confirmRefund')
                    }
                  </Button>
                </div>
              )}

              {!isEligible && (
                <Button
                  onClick={handleBackToDashboard}
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3"
                >
                  {t('tixcraft.refund.backToDashboard')}
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TixcraftRefund;
