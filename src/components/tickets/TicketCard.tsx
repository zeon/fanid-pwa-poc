import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, Ticket } from 'lucide-react';

interface TicketCardProps {
  eventName: string;
  venue: string;
  date: string;
  quantity: number;
  onShowQR: () => void;
}

const TicketCard = ({ eventName, venue, date, quantity, onShowQR }: TicketCardProps) => {
  const { t } = useTranslation();

  return (
    <Card className="bg-gray-800/80 border-gray-700 hover:border-cyan-500/50 transition-all">
      <CardContent className="p-6">
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">{eventName}</h3>
          
          <div className="space-y-2 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{venue}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{new Date(date).toLocaleDateString()}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Ticket className="h-4 w-4" />
              <span>{t('tickets.quantity')}: {quantity}</span>
            </div>
          </div>
          
          <Button
            onClick={onShowQR}
            className="w-full bg-cyan-600 hover:bg-cyan-700"
          >
            {t('tickets.showQRCode')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TicketCard;
