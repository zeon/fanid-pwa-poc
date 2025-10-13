
import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEvent } from '@/hooks/useEvents';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import EventDetailBanner from '@/components/event/EventDetailBanner';
import EventInfo from '@/components/event/EventInfo';
import PromoGallery from '@/components/event/PromoGallery';
import MerchandiseSection from '@/components/event/MerchandiseSection';
import TicketListSection from '@/components/event/TicketListSection';
import { Skeleton } from '@/components/ui/skeleton';

const EventDetail = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const { data: event, isLoading, error } = useEvent(id);
  
  // Mock user data - in a real app this would come from auth context
  const user = {
    name: 'Alex Chen',
    email: 'alex.chen@example.com',
    initials: 'AC'
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <DashboardHeader user={user} />
        <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
          <Skeleton className="h-80 w-full bg-gray-700/50" />
          <Skeleton className="h-64 w-full bg-gray-700/50" />
        </div>
      </div>
    );
  }
  
  if (error || !event) {
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
        
        {/* Ticket Section - Only for upcoming events */}
        <TicketListSection
          eventId={event.id}
          eventName={event.name}
          eventDate={event.date}
          eventStatus={event.status}
        />

        {/* Event Information */}
        <EventInfo event={event} />

        {/* Promo Gallery - Only if photos exist */}
        {event.promoPhotos && event.promoPhotos.length > 0 && (
          <PromoGallery photos={event.promoPhotos} eventName={event.name} />
        )}

        {/* Merchandise Section - Only for upcoming events and if merchandise exists */}
        {event.status === 'upcoming' && event.merchandise && event.merchandise.length > 0 && (
          <MerchandiseSection merchandise={event.merchandise} />
        )}
      </div>
    </div>
  );
};

export default EventDetail;
