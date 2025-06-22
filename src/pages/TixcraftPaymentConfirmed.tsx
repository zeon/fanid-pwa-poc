
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CheckCircle, Home, Calendar, MapPin, Ticket } from 'lucide-react';

const TixcraftPaymentConfirmed = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const transactionData = location.state?.transactionData;

  if (!transactionData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">{t('tixcraft.paymentConfirmed.noTransactionData')}</h1>
          <p className="text-gray-600 mb-4">{t('tixcraft.paymentConfirmed.noTransactionDescription')}</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="text-blue-600 hover:text-blue-800"
          >
            {t('tixcraft.paymentConfirmed.goToDashboard')}
          </button>
        </div>
      </div>
    );
  }

  const handleBackToDashboard = () => {
    navigate('/dashboard', {
      state: {
        fromPurchase: true,
        transactionData: transactionData
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Success Header */}
      <div className="bg-green-600 text-white py-8">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <CheckCircle className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-2">{t('tixcraft.paymentConfirmed.title')}</h1>
          <p className="text-green-100">{t('tixcraft.paymentConfirmed.description')}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Transaction Details */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('tixcraft.paymentConfirmed.transactionDetails')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div>
                <span className="text-gray-600 text-sm">{t('tixcraft.paymentConfirmed.transactionId')}</span>
                <p className="font-semibold text-lg">{transactionData.transactionId}</p>
              </div>
              <div>
                <span className="text-gray-600 text-sm">{t('tixcraft.paymentConfirmed.purchaseDate')}</span>
                <p className="font-semibold">{new Date(transactionData.purchaseDate).toLocaleString()}</p>
              </div>
              <div>
                <span className="text-gray-600 text-sm">{t('tixcraft.paymentConfirmed.paymentMethod')}</span>
                <p className="font-semibold capitalize">{transactionData.paymentMethod.replace(/([A-Z])/g, ' $1')}</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <span className="text-gray-600 text-sm">{t('tixcraft.paymentConfirmed.event')}</span>
                <p className="font-semibold">{transactionData.eventName}</p>
              </div>
              <div>
                <span className="text-gray-600 text-sm">{t('tixcraft.paymentConfirmed.quantity')}</span>
                <p className="font-semibold">{transactionData.quantity} {t('tixcraft.paymentConfirmed.tickets')}</p>
              </div>
              <div>
                <span className="text-gray-600 text-sm">{t('tixcraft.paymentConfirmed.totalAmount')}</span>
                <p className="font-semibold text-xl text-green-600">NT$ {transactionData.totalAmount}</p>
              </div>
            </div>
          </div>

          {/* Selected Seats */}
          {transactionData.seats && transactionData.seats.length > 0 && (
            <div className="mt-6">
              <span className="text-gray-600 text-sm">{t('tixcraft.paymentConfirmed.selectedSeats')}</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {transactionData.seats.map((seat: string) => (
                  <span key={seat} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {seat}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="mb-6">
          <button
            onClick={handleBackToDashboard}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center space-x-2 transition-colors"
          >
            <Home className="w-5 h-5" />
            <span>{t('tixcraft.paymentConfirmed.backToFanVerse')}</span>
          </button>
        </div>

        {/* Next Steps */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-bold text-blue-800 mb-4">{t('tixcraft.paymentConfirmed.whatsNext')}</h3>
          <div className="space-y-3 text-blue-700">
            <div className="flex items-center space-x-2">
              <Ticket className="w-5 h-5" />
              <span>{t('tixcraft.paymentConfirmed.emailNotification')}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>{t('tixcraft.paymentConfirmed.saveEventDate')}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5" />
              <span>{t('tixcraft.paymentConfirmed.checkVenueDetails')}</span>
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="text-center mt-6 text-gray-600">
          <p className="text-sm">
            {t('tixcraft.paymentConfirmed.supportContact')}{' '}
            <a href="mailto:support@tixcraft.com" className="text-blue-600 hover:text-blue-800">
              support@tixcraft.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TixcraftPaymentConfirmed;
