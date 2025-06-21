
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CheckCircle, Download, Home, Calendar, MapPin, Ticket } from 'lucide-react';

const TixcraftPaymentConfirmed = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const transactionData = location.state?.transactionData;

  if (!transactionData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">No Transaction Data</h1>
          <p className="text-gray-600 mb-4">Unable to find transaction information.</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="text-blue-600 hover:text-blue-800"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const handleDownloadTicket = () => {
    console.log('Downloading ticket for transaction:', transactionData.transactionId);
    // Here you would implement actual ticket download logic
    alert('Ticket download started!');
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Success Header */}
      <div className="bg-green-600 text-white py-8">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <CheckCircle className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-2">Payment Successful!</h1>
          <p className="text-green-100">Your tickets have been purchased successfully</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Transaction Details */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Transaction Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div>
                <span className="text-gray-600 text-sm">Transaction ID</span>
                <p className="font-semibold text-lg">{transactionData.transactionId}</p>
              </div>
              <div>
                <span className="text-gray-600 text-sm">Purchase Date</span>
                <p className="font-semibold">{new Date(transactionData.purchaseDate).toLocaleString()}</p>
              </div>
              <div>
                <span className="text-gray-600 text-sm">Payment Method</span>
                <p className="font-semibold capitalize">{transactionData.paymentMethod.replace(/([A-Z])/g, ' $1')}</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <span className="text-gray-600 text-sm">Event</span>
                <p className="font-semibold">{transactionData.eventName}</p>
              </div>
              <div>
                <span className="text-gray-600 text-sm">Quantity</span>
                <p className="font-semibold">{transactionData.quantity} ticket(s)</p>
              </div>
              <div>
                <span className="text-gray-600 text-sm">Total Amount</span>
                <p className="font-semibold text-xl text-green-600">NT$ {transactionData.totalAmount}</p>
              </div>
            </div>
          </div>

          {/* Selected Seats */}
          {transactionData.seats && transactionData.seats.length > 0 && (
            <div className="mt-6">
              <span className="text-gray-600 text-sm">Selected Seats</span>
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

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <button
            onClick={handleDownloadTicket}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center space-x-2 transition-colors"
          >
            <Download className="w-5 h-5" />
            <span>Download Tickets</span>
          </button>
          
          <button
            onClick={handleBackToDashboard}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center space-x-2 transition-colors"
          >
            <Home className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </button>
        </div>

        {/* Next Steps */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-bold text-blue-800 mb-4">What's Next?</h3>
          <div className="space-y-3 text-blue-700">
            <div className="flex items-center space-x-2">
              <Ticket className="w-5 h-5" />
              <span>Your tickets will be sent to your email within 24 hours</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Save the event date in your calendar</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5" />
              <span>Check venue details and arrival instructions</span>
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="text-center mt-6 text-gray-600">
          <p className="text-sm">
            Having issues? Contact our support team at{' '}
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
