
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { QrCode, Calendar, MapPin } from 'lucide-react';
import { Event } from '@/data/eventsData';

interface TicketCardProps {
  event: Event;
  onShowQR: () => void;
}

const TicketCard = ({ event, onShowQR }: TicketCardProps) => {
  const { t } = useTranslation();

  return (
    <Card className="bg-gray-800/80 backdrop-blur-sm border-gray-700 hover:border-cyan-400/50 transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2">{event.name}</h3>
            <div className="space-y-2">
              <div className="flex items-center text-gray-400">
                <Calendar className="h-4 w-4 mr-2 text-cyan-400" />
                <span>{event.date} • {event.time}</span>
              </div>
              <div className="flex items-center text-gray-400">
                <MapPin className="h-4 w-4 mr-2 text-purple-400" />
                <span>{event.venue}</span>
              </div>
            </div>
          </div>
          <div className="ml-4">
            <img 
              src={event.image} 
              alt={event.name}
              className="w-20 h-20 object-cover rounded-lg"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <span className="text-gray-400">{t('tickets.ticketFor')}: </span>
            <span className="text-cyan-400 font-medium">{event.ticketType}</span>
          </div>
          <Button 
            onClick={onShowQR}
            className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-medium"
          >
            <QrCode className="h-4 w-4 mr-2" />
            {t('tickets.showQRCode')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TicketCard;
