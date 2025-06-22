
import React, { useState } from 'react';
import { Ticket, Calendar, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import CyberpunkButton from '@/components/auth/CyberpunkButton';
import TixcraftLoginDialog from '@/components/tixcraft/TixcraftLoginDialog';
import TixcraftPermissionGranted from '@/components/tixcraft/TixcraftPermissionGranted';

interface TicketPurchaseProps {
  eventId: string;
  eventName: string;
  date: string;
  venue: string;
  price: number;
  ticketType: string;
}

const TicketPurchase = ({ eventId, eventName, date, venue, price, ticketType }: TicketPurchaseProps) => {
  const { t } = useTranslation();
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showPermissionGranted, setShowPermissionGranted] = useState(false);

  const handlePurchaseClick = () => {
    console.log('Opening Tixcraft login dialog for:', eventName);
    setShowLoginDialog(true);
  };

  const handleGrantPermission = () => {
    console.log('Permission granted, redirecting to Tixcraft...');
    setShowLoginDialog(false);
    setShowPermissionGranted(true);
  };

  const handleCloseDialog = () => {
    setShowLoginDialog(false);
  };

  if (showPermissionGranted) {
    return <TixcraftPermissionGranted eventId={eventId} />;
  }

  return (
    <div className="bg-gradient-to-r from-gray-800/90 to-gray-700/90 backdrop-blur-sm border border-gray-600 rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-4">
        <Ticket className="w-6 h-6 text-cyan-400" />
        <h2 className="text-2xl font-bold text-white">{t('eventDetail.tickets.title')}</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-gray-300">
            <Calendar className="w-4 h-4 text-purple-400" />
            <span className="text-sm">{date}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-300">
            <MapPin className="w-4 h-4 text-green-400" />
            <span className="text-sm">{venue}</span>
          </div>
          <div className="pt-2">
            <span className="text-xs text-gray-400 uppercase tracking-wide">
              {t(`eventCard.ticketTypes.${ticketType.toLowerCase()}`)} {t('eventDetail.tickets.ticket')}
            </span>
            <div className="text-3xl font-bold text-cyan-400">${price}</div>
          </div>
        </div>
        
        <div className="flex flex-col space-y-3">
          <CyberpunkButton
            variant="primary"
            size="lg"
            onClick={handlePurchaseClick}
            className="w-full"
          >
            <Ticket className="w-5 h-5" />
            {t('eventDetail.tickets.buyNow')}
          </CyberpunkButton>
          
          <p className="text-xs text-gray-400 text-center">
            {t('eventDetail.tickets.secureCheckout')}
          </p>
        </div>
      </div>

      <TixcraftLoginDialog
        isOpen={showLoginDialog}
        onClose={handleCloseDialog}
        onGrantPermission={handleGrantPermission}
        eventName={eventName}
      />
    </div>
  );
};

export default TicketPurchase;
