
import React, { useState } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { ArrowLeft, Shield, CheckCircle, Clock } from 'lucide-react';
import { upcomingEvents, pastEvents } from '@/data/eventsData';
import { Button } from '@/components/ui/button';
import CreditCardForm from '@/components/tixcraft/CreditCardForm';
import BankTransferInfo from '@/components/tixcraft/BankTransferInfo';
import TextLanguageSwitcher from '@/components/navigation/TextLanguageSwitcher';

interface CreditCardFormData {
  cardNumber: string;
  cardholderName: string;
  expiryDate: string;
  cvv: string;
}

const TixcraftPayment = () => {
  const { t } = useTranslation();
  const { eventid } = useParams<{ eventid: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('creditCard');
  const [isProcessing, setIsProcessing] = useState(false);

  const verifiedPurchaseData = location.state?.verifiedPurchaseData;

  const creditCardForm = useForm<CreditCardFormData>({
    defaultValues: {
      cardNumber: '',
      cardholderName: '',
      expiryDate: '',
      cvv: ''
    }
  });

  const watchedFormValues = creditCardForm.watch();
  const isCreditCardFormValid = 
    watchedFormValues.cardNumber?.replace(/\s/g, '').length >= 16 &&
    watchedFormValues.cardholderName?.trim().length >= 2 &&
    watchedFormValues.expiryDate?.length === 5 &&
    watchedFormValues.cvv?.length >= 3;

  if (!verifiedPurchaseData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">Access Denied</h1>
          <p className="text-gray-600 mb-4">Face verification required to access payment.</p>
          <Link to={`/tixcraft/${eventid}`} className="text-blue-600 hover:text-blue-800">
            Return to Event
          </Link>
        </div>
      </div>
    );
  }

  const event = [...upcomingEvents, ...pastEvents].find(e => e.id === eventid);

  if (!event) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">{t('tixcraft.eventNotFound.title')}</h1>
          <p className="text-gray-600">{t('tixcraft.eventNotFound.description')}</p>
        </div>
      </div>
    );
  }

  const handlePayment = async () => {
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      const transactionData = {
        eventId: event.id,
        eventName: event.name,
        quantity: verifiedPurchaseData.selectedQuantity,
        seats: verifiedPurchaseData.selectedSeats,
        totalAmount: verifiedPurchaseData.totalAmount,
        paymentMethod: selectedPaymentMethod,
        transactionId: `TXN-${Date.now()}`,
        purchaseDate: new Date().toISOString(),
        ...(selectedPaymentMethod === 'creditCard' && {
          creditCardInfo: {
            lastFourDigits: watchedFormValues.cardNumber?.slice(-4) || '',
            cardholderName: watchedFormValues.cardholderName || ''
          }
        })
      };

      navigate('/tixcraft/payment-confirmed', {
        state: { transactionData }
      });
    }, 3000);
  };

  const canProceedWithPayment = 
    selectedPaymentMethod === 'bankTransfer' || 
    (selectedPaymentMethod === 'creditCard' && isCreditCardFormValid);

  const referenceNumber = `REF-${event.id}-${Date.now().toString().slice(-6)}`;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link to={`/tixcraft/${eventid}`} className="flex items-center space-x-2 hover:text-blue-200">
            <ArrowLeft className="w-5 h-5" />
            <span>{t('tixcraft.backToEvent')}</span>
          </Link>
          <h1 className="text-2xl font-bold">TIXCRAFT - {t('tixcraft.payment.title')}</h1>
          <div className="flex items-center space-x-4">
            <TextLanguageSwitcher />
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-green-400" />
              <span className="text-sm">Verified</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6">
        {/* Verification Success Banner */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-green-800 font-semibold">{t('tixcraft.payment.verifiedBanner.title')}</span>
          </div>
          <p className="text-green-700 text-sm mt-1">{t('tixcraft.payment.verifiedBanner.description')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('tixcraft.payment.orderSummary')}</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">{t('tixcraft.payment.event')}</span>
                <span className="font-semibold">{event.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{t('tixcraft.payment.date')}</span>
                <span className="font-semibold">{event.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{t('tixcraft.payment.venue')}</span>
                <span className="font-semibold">{event.venue}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{t('tixcraft.payment.quantity')}</span>
                <span className="font-semibold">{verifiedPurchaseData.selectedQuantity}</span>
              </div>
              
              {verifiedPurchaseData.selectedSeats.length > 0 && (
                <div>
                  <span className="text-gray-600">{t('tixcraft.payment.selectedSeats')}</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {verifiedPurchaseData.selectedSeats.map((seat: string) => (
                      <span key={seat} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                        {seat}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="border-t pt-4">
                <div className="flex justify-between text-xl font-bold">
                  <span>{t('tixcraft.payment.totalAmount')}</span>
                  <span className="text-blue-600">NT$ {verifiedPurchaseData.totalAmount}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('tixcraft.payment.paymentMethod')}</h2>
              
              <div className="space-y-4 mb-6">
                <div className="border rounded-lg p-4">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="creditCard"
                      checked={selectedPaymentMethod === 'creditCard'}
                      onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                      className="text-blue-600"
                    />
                    <span className="font-semibold">{t('tixcraft.payment.creditCard')}</span>
                  </label>
                </div>
                
                <div className="border rounded-lg p-4">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bankTransfer"
                      checked={selectedPaymentMethod === 'bankTransfer'}
                      onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                      className="text-blue-600"
                    />
                    <span className="font-semibold">{t('tixcraft.payment.bankTransfer')}</span>
                  </label>
                </div>
              </div>

              {/* Payment Button */}
              <Button
                onClick={handlePayment}
                disabled={isProcessing || !canProceedWithPayment}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center space-x-2 transition-colors"
              >
                {isProcessing ? (
                  <>
                    <Clock className="w-5 h-5 animate-spin" />
                    <span>{t('tixcraft.payment.processingPayment')}</span>
                  </>
                ) : (
                  <span>{t('tixcraft.payment.completePayment', { amount: verifiedPurchaseData.totalAmount })}</span>
                )}
              </Button>

              {/* Security Notice */}
              <div className="mt-4 text-xs text-gray-500 text-center">
                <p>{t('tixcraft.payment.securityNotice')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Method Forms */}
        <div className="mt-8">
          {selectedPaymentMethod === 'creditCard' && (
            <CreditCardForm form={creditCardForm} />
          )}
          
          {selectedPaymentMethod === 'bankTransfer' && (
            <BankTransferInfo 
              totalAmount={verifiedPurchaseData.totalAmount}
              referenceNumber={referenceNumber}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TixcraftPayment;
