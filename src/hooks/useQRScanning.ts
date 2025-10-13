import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { parseQRCodeData } from '@/utils/qrCodeGenerator';

interface TicketData {
  orderId: string;
  eventName: string;
  holderName: string;
  ticketType: string;
  venue: string;
  date: string;
  time: string;
  status: string;
  entriesAllowed: number;
}

interface ScanResult {
  success: boolean;
  ticketData?: TicketData;
  error?: string;
}

export const useQRScanning = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [scannedOrderId, setScannedOrderId] = useState<string | null>(null);

  const processQRCode = async (qrString: string): Promise<ScanResult> => {
    // Parse QR code
    const parsed = parseQRCodeData(qrString);
    
    if (!parsed) {
      return {
        success: false,
        error: 'Invalid QR code format'
      };
    }

    const { username, phoneNumber, ticketOrderId } = parsed;

    try {
      // Fetch ticket order from database
      const { data: order, error } = await supabase
        .from('ticket_orders')
        .select(`
          id,
          status,
          quantity,
          user_id,
          ticket:tickets(name, event:events(name, venue, start_date))
        `)
        .eq('id', ticketOrderId)
        .single();

      if (error || !order) {
        return {
          success: false,
          error: 'Ticket not found'
        };
      }

      // Fetch user profile to validate
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('username, phone')
        .eq('id', order.user_id)
        .single();

      if (profileError || !profile) {
        return {
          success: false,
          error: 'User profile not found'
        };
      }

      // Validate username and phone
      if (profile.username !== username || profile.phone !== phoneNumber) {
        return {
          success: false,
          error: 'User information does not match'
        };
      }

      // Check ticket status
      if (order.status === 'cancelled') {
        return {
          success: false,
          error: 'This ticket has been cancelled'
        };
      }

      if (order.status === 'checked_in') {
        return {
          success: false,
          error: 'This ticket has already been used'
        };
      }

      // Success - return ticket data
      const event = order.ticket.event;
      return {
        success: true,
        ticketData: {
          orderId: order.id,
          eventName: event.name,
          holderName: username,
          ticketType: order.ticket.name,
          venue: event.venue,
          date: new Date(event.start_date).toLocaleDateString(),
          time: new Date(event.start_date).toLocaleTimeString(),
          status: order.status,
          entriesAllowed: order.quantity,
        }
      };

    } catch (error) {
      console.error('QR scan error:', error);
      return {
        success: false,
        error: 'Failed to validate ticket'
      };
    }
  };

  // For manual scanning with camera (simulated for now)
  const startScanning = () => {
    setIsScanning(true);
    
    // Simulate QR code scan after delay
    // In production, this would integrate with actual camera QR scanner
    setTimeout(async () => {
      // Simulate a scanned QR code (for testing)
      const mockQR = "test_user,+1234567890,550e8400-e29b-41d4-a716-446655440000";
      const result = await processQRCode(mockQR);
      
      if (result.success && result.ticketData) {
        setScannedOrderId(result.ticketData.orderId);
      }
      
      setScanResult(result);
      setIsScanning(false);
    }, 2000);
  };

  const confirmEntry = async () => {
    if (!scannedOrderId) {
      console.error('No order ID available for check-in');
      return;
    }

    const { data: session } = await supabase.auth.getSession();
    const staffId = session.session?.user?.id;

    if (!staffId) {
      console.error('No staff user logged in');
      return;
    }

    // Update ticket status to checked_in
    const { error } = await supabase
      .from('ticket_orders')
      .update({
        status: 'checked_in',
        checked_in_at: new Date().toISOString(),
        checked_in_by: staffId,
      })
      .eq('id', scannedOrderId);

    if (error) {
      console.error('Failed to confirm entry:', error);
      return;
    }

    console.log('Entry confirmed for order:', scannedOrderId);
    resetScanner();
  };

  const resetScanner = () => {
    setScanResult(null);
    setScannedOrderId(null);
    setIsScanning(false);
  };

  // Direct scan method for when you already have the QR string
  const scanQRCode = async (qrString: string) => {
    setIsScanning(true);
    const result = await processQRCode(qrString);
    
    if (result.success && result.ticketData) {
      setScannedOrderId(result.ticketData.orderId);
    }
    
    setScanResult(result);
    setIsScanning(false);
    return result;
  };

  return {
    isScanning,
    scanResult,
    startScanning,
    confirmEntry,
    resetScanner,
    scanQRCode, // Export for direct QR code scanning
  };
};
