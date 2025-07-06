import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel } from '@/components/ui/alert-dialog';
import { Send, X } from 'lucide-react';
import { Event } from '@/data/eventsData';

interface TicketTransferDialogProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event;
}

type TransferStep = 'form' | 'confirmation' | 'success' | 'not-found';

const TicketTransferDialog = ({
  isOpen,
  onClose,
  event
}: TicketTransferDialogProps) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [selectedTicket, setSelectedTicket] = useState('');
  const [currentStep, setCurrentStep] = useState<TransferStep>('form');
  const [isLoading, setIsLoading] = useState(false);

  const handleReset = () => {
    setEmail('');
    setSelectedTicket('');
    setCurrentStep('form');
    setIsLoading(false);
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  const handleTransfer = async () => {
    if (!email || !selectedTicket) return;
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if user exists based on event ID (aMEI event has ID '1')
    if (event.id === '1') {
      setCurrentStep('confirmation');
    } else {
      setCurrentStep('not-found');
    }
    setIsLoading(false);
  };

  const handleConfirmTransfer = async () => {
    setIsLoading(true);

    // Simulate transfer process
    await new Promise(resolve => setTimeout(resolve, 1000));
    setCurrentStep('success');
    setIsLoading(false);
  };

  const handleNotFoundClose = () => {
    setCurrentStep('form');
  };

  const renderTicketOptions = () => {
    const ticketCount = event.ticketQuantity || 1;
    const options = [];
    
    for (let i = 1; i <= ticketCount; i++) {
      // Debug translation interpolation
      const translatedText = t('tickets.transfer.ticketNumber', { number: i });
      
      // Create fallback display
      const ticketLabel = translatedText.includes('{{number}}') 
        ? `Ticket #${i}` 
        : translatedText;      
     
      options.push(
        <div key={i} className="flex items-center space-x-2">
          <RadioGroupItem 
            value={`ticket-${i}`} 
            id={`ticket-${i}`}
            aria-describedby={`ticket-${i}-description`}
          />
          <Label 
            htmlFor={`ticket-${i}`} 
            className="text-white cursor-pointer"
            id={`ticket-${i}-description`}
          >
            {ticketLabel} - {event.ticketType}
          </Label>
        </div>
      );
    }
    return options;
  };

  return (
    <>
      <Dialog open={isOpen && currentStep === 'form'} onOpenChange={handleClose}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-cyan-400">
              {t('tickets.transfer.title')}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 mt-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">{event.name}</h3>
              <p className="text-gray-400 text-sm">{event.date} • {event.venue}</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                {t('tickets.transfer.recipientEmail')}
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('tickets.transfer.emailPlaceholder')}
                className="bg-gray-700 border-gray-600 text-white"
                aria-describedby="email-helper"
              />
              <div id="email-helper" className="sr-only">
                {t('tickets.transfer.emailPlaceholder')}
              </div>
            </div>
            
            <div className="space-y-3">
              <Label className="text-white">{t('tickets.transfer.selectTicket')}</Label>
              <RadioGroup 
                value={selectedTicket} 
                onValueChange={setSelectedTicket} 
                className="space-y-2"
                aria-label={t('tickets.transfer.selectTicket')}
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
                onClick={handleTransfer}
                disabled={!email || !selectedTicket || isLoading}
                className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
              >
                <Send className="h-4 w-4 mr-2" />
                {isLoading ? t('tickets.transfer.transferring') : t('tickets.transfer.transfer')}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      
      <AlertDialog open={currentStep === 'confirmation'} onOpenChange={() => {}}>
        <AlertDialogContent className="bg-gray-800 border-gray-700 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-cyan-400">
              {t('tickets.transfer.confirmTitle')}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-300">
              {t('tickets.transfer.confirmMessage')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleClose} className="border-gray-600 text-gray-300 hover:bg-gray-700">
              {t('common.cancel')}
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmTransfer} disabled={isLoading} className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600">
              {isLoading ? t('tickets.transfer.confirming') : t('common.confirm')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={currentStep === 'success'} onOpenChange={() => {}}>
        <AlertDialogContent className="bg-gray-800 border-gray-700 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-green-400">
              {t('tickets.transfer.successTitle')}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-300">
              {t('tickets.transfer.successMessage')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleClose} className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
              {t('common.ok')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={currentStep === 'not-found'} onOpenChange={() => {}}>
        <AlertDialogContent className="bg-gray-800 border-gray-700 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-400">
              {t('tickets.transfer.notFoundTitle')}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-300">
              {t('tickets.transfer.notFoundMessage')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleNotFoundClose} className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800">
              {t('common.ok')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default TicketTransferDialog;
