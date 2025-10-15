
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Calendar, Ticket as TicketIcon, ListChecks } from 'lucide-react';
import TicketQRDialog from '@/components/tickets/TicketQRDialog';
import EventTicketRow from '@/components/tickets/EventTicketRow';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { useUserTicketOrders } from '@/hooks/useTicketPurchase';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

const ActiveTickets = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user, profile } = useAuth();
  const [selectedTicket, setSelectedTicket] = useState<{ 
    orderIds: string[]; 
    eventName: string;
    eventVenue: string;
    eventDate: string;
  } | null>(null);

  // Get user display data for header
  const userDisplayData = {
    name: profile?.username || user?.email?.split('@')[0] || 'User',
    email: user?.email || '',
    initials: profile?.username 
      ? profile.username.slice(0, 2).toUpperCase() 
      : user?.email?.slice(0, 2).toUpperCase() || 'U'
  };

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

  // Group tickets by event only (not by payment)
  const groupedTickets = useMemo(() => {
    return activeTickets.reduce((acc, order) => {
      // Handle nested event structure from query: event:tickets(event:events(*))
      const eventData = (order.event as any)?.event || order.event;
      const eventId = eventData?.id;
      if (!eventId) return acc;
      
      if (!acc[eventId]) {
        acc[eventId] = {
          event: eventData,
          orderIds: [],
          totalQuantity: 0,
        };
      }
      acc[eventId].orderIds.push(order.id);
      acc[eventId].totalQuantity += order.quantity;
      return acc;
    }, {} as Record<string, { event: any; orderIds: string[]; totalQuantity: number }>);
  }, [activeTickets]);

  const groupedTicketsArray = Object.values(groupedTickets);

  // Calculate summary stats
  const totalEvents = groupedTicketsArray.length;
  const totalTickets = groupedTicketsArray.reduce((sum, group) => sum + group.totalQuantity, 0);
  const nextEvent = useMemo(() => {
    const upcoming = groupedTicketsArray
      .filter(group => new Date(group.event.start_date) > new Date())
      .sort((a, b) => new Date(a.event.start_date).getTime() - new Date(b.event.start_date).getTime());
    return upcoming[0];
  }, [groupedTicketsArray]);

  const handleShowQR = (orderIds: string[], eventName: string, eventVenue: string, eventDate: string) => {
    setSelectedTicket({ orderIds, eventName, eventVenue, eventDate });
  };

  const handleCloseQR = () => {
    setSelectedTicket(null);
  };

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
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(147, 51, 234, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(147, 51, 234, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '120px 120px'
        }}></div>
      </div>
      
      <div className="absolute top-10 left-20 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-60 h-60 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

      {/* Header */}
      <DashboardHeader user={userDisplayData} />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6 relative z-10">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">{t('tickets.activeTickets')}</h2>
          <p className="text-gray-400">{t('tickets.activeTicketsSubtitle')}</p>
        </div>

        {isLoading ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-24 bg-gray-800/50" />
              ))}
            </div>
            <Skeleton className="h-64 bg-gray-800/50" />
          </>
        ) : groupedTicketsArray.length > 0 ? (
          <>
            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card className="bg-gray-800/80 backdrop-blur-sm border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm mb-1">{t('tickets.totalEvents')}</p>
                      <p className="text-3xl font-bold text-white">{totalEvents}</p>
                    </div>
                    <ListChecks className="h-10 w-10 text-cyan-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/80 backdrop-blur-sm border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm mb-1">{t('tickets.totalTickets')}</p>
                      <p className="text-3xl font-bold text-white">{totalTickets}</p>
                    </div>
                    <TicketIcon className="h-10 w-10 text-purple-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/80 backdrop-blur-sm border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm mb-1">{t('tickets.nextEvent')}</p>
                      <p className="text-lg font-bold text-white truncate">
                        {nextEvent ? new Date(nextEvent.event.start_date).toLocaleDateString() : '-'}
                      </p>
                    </div>
                    <Calendar className="h-10 w-10 text-pink-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Events List */}
            <Card className="bg-gray-800/80 backdrop-blur-sm border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">{t('tickets.yourEvents')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {groupedTicketsArray.map((group) => (
                    <EventTicketRow
                      key={group.event.id}
                      event={group.event}
                      totalQuantity={group.totalQuantity}
                      onClick={() => handleShowQR(
                        group.orderIds, 
                        group.event.name,
                        group.event.venue,
                        group.event.start_date
                      )}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <Card className="bg-gray-800/80 backdrop-blur-sm border-gray-700">
            <CardContent className="py-16 text-center">
              <TicketIcon className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">{t('tickets.noActiveTickets')}</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* QR Code Dialog */}
      {selectedTicket && (
        <TicketQRDialog
          isOpen={!!selectedTicket}
          onClose={handleCloseQR}
          ticketOrderIds={selectedTicket.orderIds}
          eventName={selectedTicket.eventName}
          eventVenue={selectedTicket.eventVenue}
          eventDate={selectedTicket.eventDate}
        />
      )}
    </div>
  );
};

export default ActiveTickets;
