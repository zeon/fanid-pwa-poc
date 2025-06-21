
import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { upcomingEvents, pastEvents } from '@/data/eventsData';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import EventDetailBanner from '@/components/event/EventDetailBanner';
import EventInfo from '@/components/event/EventInfo';
import PromoGallery from '@/components/event/PromoGallery';
import MerchandiseSection from '@/components/event/MerchandiseSection';
import TicketPurchase from '@/components/event/TicketPurchase';

const EventDetail = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  
  // Mock user data - in a real app this would come from auth context
  const user = {
    name: 'Alex Chen',
    email: 'alex.chen@example.com',
    initials: 'AC'
  };
  
  // Find the event in both upcoming and past events
  const event = [...upcomingEvents, ...pastEvents].find(e => e.id === id);
  
  if (!event) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">{t('eventDetail.notFound.title')}</h1>
          <p className="text-gray-400">{t('eventDetail.notFound.description')}</p>
        </div>
      </div>
    );
  }

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

      {/* Header */}
      <DashboardHeader user={user} />

      {/* Event Banner */}
      <EventDetailBanner image={event.image} title={event.name} />

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-8 space-y-8">
        
        {/* Ticket Purchase Section - Only for upcoming events */}
        {event.status === 'upcoming' && (
          <TicketPurchase
            eventId={event.id}
            eventName={event.name}
            date={event.date}
            venue={event.venue}
            price={event.ticketPrice}
            ticketType={event.ticketType}
          />
        )}

        {/* Event Information */}
        <EventInfo event={event} />

        {/* Promo Gallery */}
        <PromoGallery photos={event.promoPhotos} eventName={event.name} />

        {/* Merchandise Section - Only for upcoming events */}
        {event.status === 'upcoming' && (
          <MerchandiseSection merchandise={event.merchandise} />
        )}
      </div>
    </div>
  );
};

export default EventDetail;
