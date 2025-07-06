
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { QrCode, Calendar, MapPin, Send, Ticket } from 'lucide-react';
import { Event } from '@/data/eventsData';
import TicketTransferDialog from './TicketTransferDialog';

interface TicketCardProps {
  event: Event;
  onShowQR: () => void;
}

const TicketCard = ({ event, onShowQR }: TicketCardProps) => {
  const { t } = useTranslation();
  const [showTransferDialog, setShowTransferDialog] = useState(false);

  return (
    <>
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
                <div className="flex items-center text-gray-400">
                  <Ticket className="h-4 w-4 mr-2 text-green-400" />
                  <span>{t('tickets.ticketQuantity', { count: event.ticketQuantity || 1 })}</span>
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
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm">
              <span className="text-gray-400">{t('tickets.ticketFor')}: </span>
              <span className="text-cyan-400 font-medium">{event.ticketType}</span>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <Button 
              onClick={onShowQR}
              className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-medium"
            >
              <QrCode className="h-4 w-4 mr-2" />
              {t('tickets.showQRCode')}
            </Button>
            <Button
              onClick={() => setShowTransferDialog(true)}
              variant="outline"
              className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              <Send className="h-4 w-4 mr-2" />
              {t('tickets.transfer.transfer')}
            </Button>
          </div>
        </CardContent>
      </Card>

      <TicketTransferDialog
        isOpen={showTransferDialog}
        onClose={() => setShowTransferDialog(false)}
        event={event}
      />
    </>
  );
};

export default TicketCard;
