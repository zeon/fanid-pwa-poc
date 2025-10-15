import React from 'react';
import { Calendar, MapPin, Ticket, ChevronRight } from 'lucide-react';
import { formatEventDate, formatEventTime } from '@/utils/dateFormatters';
import { useTranslation } from 'react-i18next';

interface EventTicketRowProps {
  event: {
    id: string;
    name: string;
    venue: string;
    start_date: string;
  };
  totalQuantity: number;
  onClick: () => void;
}

const EventTicketRow = ({ event, totalQuantity, onClick }: EventTicketRowProps) => {
  const { t } = useTranslation();

  return (
    <div
      onClick={onClick}
      className="group flex items-center justify-between p-4 rounded-lg bg-gray-800/40 hover:bg-gray-700/60 border border-gray-700/50 hover:border-cyan-500/50 transition-all cursor-pointer"
    >
      <div className="flex-1 space-y-2">
        <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">
          {event.name}
        </h3>
        
        <div className="flex flex-wrap gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-cyan-400" />
            <span>{event.venue}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-purple-400" />
            <span>{formatEventDate(event.start_date)} {formatEventTime(event.start_date)}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Ticket className="h-4 w-4 text-pink-400" />
            <span className="font-medium text-white">
              {totalQuantity} {t('tickets.ticketsCount', { count: totalQuantity })}
            </span>
          </div>
        </div>
      </div>
      
      <ChevronRight className="h-5 w-5 text-gray-500 group-hover:text-cyan-400 transition-colors ml-4" />
    </div>
  );
};

export default EventTicketRow;
