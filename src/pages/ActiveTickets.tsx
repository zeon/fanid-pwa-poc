
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TicketCard from '@/components/tickets/TicketCard';
import TicketQRDialog from '@/components/tickets/TicketQRDialog';
import { upcomingEvents } from '@/data/eventsData';

const ActiveTickets = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  
  // Use first 3 events as active tickets
  const activeTickets = upcomingEvents.slice(0, 3);
  
  const handleShowQR = (eventName: string) => {
    setSelectedTicket(eventName);
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
      <div className="bg-gray-800/80 backdrop-blur-sm border-b border-gray-700 p-4 relative z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => navigate('/dashboard')}
              variant="ghost"
              className="text-gray-400 hover:text-white hover:bg-gray-700"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t('tickets.backToDashboard')}
            </Button>
            <div className="w-8 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400"></div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              {t('tickets.activeTickets')}
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-6 relative z-10">
        {activeTickets.length > 0 ? (
          <div className="space-y-6">
            {activeTickets.map((event) => (
              <TicketCard
                key={event.id}
                event={event}
                onShowQR={() => handleShowQR(event.name)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              {t('tickets.noActiveTickets')}
            </h3>
            <p className="text-gray-400">
              {t('tickets.noActiveTicketsDesc')}
            </p>
          </div>
        )}
      </div>

      {/* QR Code Dialog */}
      {selectedTicket && (
        <TicketQRDialog
          isOpen={!!selectedTicket}
          onClose={handleCloseQR}
          eventName={selectedTicket}
        />
      )}
    </div>
  );
};

export default ActiveTickets;
