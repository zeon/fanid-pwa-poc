import React from 'react';
import { Badge } from '@/components/ui/badge';
import CyberpunkButton from '@/components/auth/CyberpunkButton';

interface TicketCardProps {
  ticket: {
    id: string;
    name: string;
    price: number;
    description?: string | null;
    quantity: number;
    sold: number;
    available: number;
  };
  eventName: string;
  onPurchase: (ticketId: string) => void;
}

const TicketCard = ({ ticket, eventName, onPurchase }: TicketCardProps) => {
  const isSoldOut = ticket.available <= 0;

  return (
    <div className="relative overflow-hidden rounded-lg bg-gray-800/80 backdrop-blur-sm border border-gray-700 hover:border-cyan-400/50 transition-all duration-300 p-6">
      {isSoldOut && (
        <Badge className="absolute top-4 right-4 bg-red-500/20 text-red-400 border-red-500/50">
          Sold Out
        </Badge>
      )}

      <div className="space-y-4">
        <div>
          <h3 className="text-2xl font-bold text-white mb-1">{ticket.name}</h3>
          {ticket.description && (
            <p className="text-gray-400 text-sm">{ticket.description}</p>
          )}
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-cyan-400">
            ${ticket.price.toFixed(2)}
          </span>
          <span className="text-gray-400 text-sm">per ticket</span>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-700">
          <span className="text-gray-400 text-sm">
            {isSoldOut ? (
              'No tickets available'
            ) : (
              `${ticket.available} tickets remaining`
            )}
          </span>
        </div>

        <CyberpunkButton
          onClick={() => onPurchase(ticket.id)}
          disabled={isSoldOut}
          className="w-full"
        >
          {isSoldOut ? 'Sold Out' : 'Purchase Ticket'}
        </CyberpunkButton>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
};

export default TicketCard;
