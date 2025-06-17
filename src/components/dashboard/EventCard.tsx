
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin } from 'lucide-react';

interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  venue: string;
  ticketType: string;
  image: string;
  status?: 'upcoming' | 'past';
}

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  const { t } = useTranslation();

  const getTicketTypeBadgeColor = (ticketType: string) => {
    switch (ticketType.toLowerCase()) {
      case 'vip':
        return 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white';
      case 'ga':
        return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white';
      case 'premium':
        return 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white';
      default:
        return 'bg-gray-600 text-gray-200';
    }
  };

  const getTranslatedTicketType = (ticketType: string) => {
    const translationKey = `eventCard.ticketTypes.${ticketType.toLowerCase()}`;
    return t(translationKey, { defaultValue: ticketType });
  };

  return (
    <div className="group relative overflow-hidden rounded-lg bg-gray-700/50 backdrop-blur-sm border border-gray-600 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/20">
      <div className="aspect-video overflow-hidden">
        <img 
          src={event.image} 
          alt={event.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
      </div>
      
      <div className="absolute top-3 right-3">
        <Badge className={`${getTicketTypeBadgeColor(event.ticketType)} font-bold text-xs px-2 py-1`}>
          {getTranslatedTicketType(event.ticketType)}
        </Badge>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg text-white mb-2 group-hover:text-cyan-400 transition-colors">
          {event.name}
        </h3>
        
        <div className="flex items-center text-gray-400 text-sm mb-2">
          <Calendar className="w-4 h-4 mr-2" />
          <span>{event.date} • {event.time}</span>
        </div>
        
        <div className="flex items-center text-gray-400 text-sm">
          <MapPin className="w-4 h-4 mr-2" />
          <span>{event.venue}</span>
        </div>
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
};

export default EventCard;
