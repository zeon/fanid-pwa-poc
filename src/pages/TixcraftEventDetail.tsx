
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ShoppingCart, Users, MapPin, Calendar, Clock } from 'lucide-react';
import { upcomingEvents, pastEvents } from '@/data/eventsData';
import TixcraftSeatMap from '@/components/tixcraft/TixcraftSeatMap';
import TixcraftQuantitySelector from '@/components/tixcraft/TixcraftQuantitySelector';
import TixcraftPurchaseButton from '@/components/tixcraft/TixcraftPurchaseButton';

const TixcraftEventDetail = () => {
  const { t } = useTranslation();
  const { eventid } = useParams<{ eventid: string }>();
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  
  // Find the event in both upcoming and past events
  const event = [...upcomingEvents, ...pastEvents].find(e => e.id === eventid);
  
  if (!event) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">{t('tixcraft.eventNotFound.title')}</h1>
          <p className="text-gray-600">{t('tixcraft.eventNotFound.description')}</p>
          <Link to="/dashboard" className="mt-4 inline-block text-blue-600 hover:text-blue-800">
            Back to FanVerse
          </Link>
        </div>
      </div>
    );
  }

  const handlePurchase = () => {
    console.log('Purchasing tickets:', {
      eventId: event.id,
      quantity: selectedQuantity,
      seats: selectedSeats,
      totalPrice: event.ticketPrice * selectedQuantity
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/dashboard" className="flex items-center space-x-2 hover:text-blue-200">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to FanVerse</span>
            </Link>
          </div>
          <h1 className="text-2xl font-bold">TIXCRAFT</h1>
          <div className="flex items-center space-x-2">
            <ShoppingCart className="w-5 h-5" />
            <span>{t('tixcraft.cart.title')}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6">
        {/* Event Information Section */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Event Image */}
            <div className="lg:col-span-1">
              <img 
                src={event.image} 
                alt={event.name}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
            
            {/* Event Details */}
            <div className="lg:col-span-2 space-y-4">
              <h1 className="text-3xl font-bold text-gray-800">{event.name}</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <span>{event.venue}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span>{t(`eventCard.ticketTypes.${event.ticketType.toLowerCase()}`)}</span>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">{t('tixcraft.ticketPrice')}</div>
                <div className="text-2xl font-bold text-blue-600">NT$ {event.ticketPrice}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Ticket Selection Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Quantity and Seat Selection */}
          <div className="space-y-6">
            {/* Quantity Selection */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">{t('tixcraft.selectQuantity')}</h2>
              <TixcraftQuantitySelector
                quantity={selectedQuantity}
                onQuantityChange={setSelectedQuantity}
                maxQuantity={4}
              />
            </div>

            {/* Seat Map */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">{t('tixcraft.selectSeats')}</h2>
              <TixcraftSeatMap
                selectedSeats={selectedSeats}
                onSeatSelect={setSelectedSeats}
                maxSeats={selectedQuantity}
              />
            </div>
          </div>

          {/* Right Column - Order Summary and Purchase */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">{t('tixcraft.orderSummary')}</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('tixcraft.ticketQuantity')}</span>
                  <span className="font-semibold">{selectedQuantity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('tixcraft.unitPrice')}</span>
                  <span className="font-semibold">NT$ {event.ticketPrice}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>{t('tixcraft.totalAmount')}</span>
                    <span className="text-blue-600">NT$ {event.ticketPrice * selectedQuantity}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Selected Seats Display */}
            {selectedSeats.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">{t('tixcraft.selectedSeats')}</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedSeats.map((seat) => (
                    <span key={seat} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {seat}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Purchase Button */}
            <TixcraftPurchaseButton
              onPurchase={handlePurchase}
              isDisabled={selectedSeats.length !== selectedQuantity}
              totalAmount={event.ticketPrice * selectedQuantity}
              eventId={event.id}
              selectedSeats={selectedSeats}
              selectedQuantity={selectedQuantity}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TixcraftEventDetail;
