
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { RotateCcw, X } from 'lucide-react';
import { Event } from '@/data/eventsData';

interface TicketRefundDialogProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event;
}

const TicketRefundDialog = ({
  isOpen,
  onClose,
  event
}: TicketRefundDialogProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedTicket, setSelectedTicket] = useState('');

  const handleReset = () => {
    setSelectedTicket('');
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  const handleRefund = () => {
    if (!selectedTicket) return;
    
    // Navigate to Tixcraft refund page with event data
    navigate(`/tixcraft/${event.id}/refund`, {
      state: { 
        event,
        selectedTicket
      }
    });
    handleClose();
  };

  const renderTicketOptions = () => {
    const ticketCount = event.ticketQuantity || 1;
    const options = [];
    
    for (let i = 1; i <= ticketCount; i++) {
      const translatedText = t('tickets.refund.ticketNumber', { number: i });
      const ticketLabel = translatedText.includes('{{number}}') 
        ? `Ticket #${i}` 
        : translatedText;
      
      options.push(
        <div key={i} className="flex items-center space-x-2">
          <RadioGroupItem 
            value={`ticket-${i}`} 
            id={`refund-ticket-${i}`}
            aria-describedby={`refund-ticket-${i}-description`}
          />
          <Label 
            htmlFor={`refund-ticket-${i}`} 
            className="text-white cursor-pointer"
            id={`refund-ticket-${i}-description`}
          >
            {ticketLabel} - {event.ticketType}
          </Label>
        </div>
      );
    }
    return options;
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-red-400">
            {t('tickets.refund.title')}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 mt-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">{event.name}</h3>
            <p className="text-gray-400 text-sm">{event.date} • {event.venue}</p>
          </div>
          
          <div className="space-y-3">
            <Label className="text-white">{t('tickets.refund.selectTicket')}</Label>
            <RadioGroup 
              value={selectedTicket} 
              onValueChange={setSelectedTicket} 
              className="space-y-2"
              aria-label={t('tickets.refund.selectTicket')}
            >
              {renderTicketOptions()}
            </RadioGroup>
          </div>
          
          <div className="flex space-x-3 pt-4">
            <Button
              onClick={handleClose}
              variant="outline"
              className="flex-1 border-gray-600 hover:bg-gray-700 text-gray-500"
            >
              <X className="h-4 w-4 mr-2" />
              {t('common.cancel')}
            </Button>
            <Button
              onClick={handleRefund}
              disabled={!selectedTicket}
              className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              {t('tickets.refund.refund')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TicketRefundDialog;
