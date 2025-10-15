
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TicketCard from '@/components/tickets/TicketCard';
import TicketQRDialog from '@/components/tickets/TicketQRDialog';
import { useUserTicketOrders } from '@/hooks/useTicketPurchase';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';

const ActiveTickets = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [selectedTicket, setSelectedTicket] = useState<{ orderIds: string[]; eventName: string } | null>(null);

  const { data: session } = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const { data } = await supabase.auth.getSession();
      return data.session;
    },
  });

  const userId = session?.user?.id;
  const { data: ticketOrders = [], isLoading } = useUserTicketOrders(userId);

  // Filter active tickets only
  const activeTickets = ticketOrders.filter(
    order => order.status === 'active' || order.status === 'redeemed'
  );

  // Group tickets by event and payment (to show as one card)
  const groupedTickets = activeTickets.reduce((acc, order) => {
    const key = `${order.event.id}-${order.payment_id}`;
    if (!acc[key]) {
      acc[key] = {
        event: order.event,
        payment_id: order.payment_id,
        orderIds: [],
        totalQuantity: 0,
      };
    }
    acc[key].orderIds.push(order.id);
    acc[key].totalQuantity += order.quantity;
    return acc;
  }, {} as Record<string, { event: any; payment_id: string; orderIds: string[]; totalQuantity: number }>);

  const groupedTicketsArray = Object.values(groupedTickets);

  const handleShowQR = (orderIds: string[], eventName: string) => {
    setSelectedTicket({ orderIds, eventName });
  };

  const handleCloseQR = () => {
    setSelectedTicket(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900">
      {/* Animated background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/dashboard')}
            className="text-white hover:bg-white/10"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-3xl font-bold text-white">
            {t('tickets.activeTickets')}
          </h1>
        </div>

        {/* Tickets List */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-64 bg-gray-800/50" />
            ))}
          </div>
        ) : groupedTicketsArray.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groupedTicketsArray.map((group) => (
              <TicketCard
                key={`${group.event.id}-${group.payment_id}`}
                eventName={group.event.name}
                venue={group.event.venue}
                date={group.event.start_date}
                quantity={group.totalQuantity}
                onShowQR={() => handleShowQR(group.orderIds, group.event.name)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">{t('tickets.noActiveTickets')}</p>
          </div>
        )}
      </div>

      {/* QR Code Dialog */}
      {selectedTicket && (
        <TicketQRDialog
          isOpen={!!selectedTicket}
          onClose={handleCloseQR}
          ticketOrderIds={selectedTicket.orderIds}
          eventName={selectedTicket.eventName}
        />
      )}
    </div>
  );
};

export default ActiveTickets;
