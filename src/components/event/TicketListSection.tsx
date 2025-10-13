import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useEventTickets } from '@/hooks/useEvents';
import TicketCard from './TicketCard';
import { Skeleton } from '@/components/ui/skeleton';
import TicketPurchaseDialog from './TicketPurchaseDialog';
import TicketPurchaseSuccessDialog from './TicketPurchaseSuccessDialog';

interface TicketListSectionProps {
  eventId: string;
  eventName: string;
  eventDate: string;
  eventStatus: 'upcoming' | 'past';
}

const TicketListSection = ({ 
  eventId, 
  eventName, 
  eventDate,
  eventStatus 
}: TicketListSectionProps) => {
  const { t } = useTranslation();
  const { data: tickets = [], isLoading } = useEventTickets(eventId);
  
  const [showPurchaseDialog, setShowPurchaseDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [purchaseData, setPurchaseData] = useState<{ paymentId: string; orderIds: string[] } | null>(null);

  if (eventStatus === 'past') {
    return null;
  }

  const handlePurchase = (ticketId: string) => {
    const ticket = tickets.find(t => t.id === ticketId);
    if (!ticket) return;
    
    setSelectedTicket(ticket);
    setShowPurchaseDialog(true);
  };

  const handlePurchaseSuccess = (paymentId: string, orderIds: string[]) => {
    setShowPurchaseDialog(false);
    setPurchaseData({ paymentId, orderIds });
    setShowSuccessDialog(true);
  };

  if (isLoading) {
    return (
      <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-6">{t('eventDetail.tickets.title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-64 w-full bg-gray-700/50" />
          ))}
        </div>
      </div>
    );
  }

  if (tickets.length === 0) {
    return (
      <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-4">{t('eventDetail.tickets.title')}</h2>
        <p className="text-gray-400 text-center py-8">{t('eventDetail.tickets.noTickets')}</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-6">{t('eventDetail.tickets.title')}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              eventName={eventName}
              onPurchase={handlePurchase}
            />
          ))}
        </div>
      </div>

      {selectedTicket && (
        <TicketPurchaseDialog
          isOpen={showPurchaseDialog}
          onClose={() => setShowPurchaseDialog(false)}
          ticket={selectedTicket}
          eventName={eventName}
          eventDate={eventDate}
          eventId={eventId}
          onSuccess={handlePurchaseSuccess}
        />
      )}

      {purchaseData && (
        <TicketPurchaseSuccessDialog
          isOpen={showSuccessDialog}
          onClose={() => setShowSuccessDialog(false)}
          paymentId={purchaseData.paymentId}
          orderIds={purchaseData.orderIds}
        />
      )}
    </>
  );
};

export default TicketListSection;
