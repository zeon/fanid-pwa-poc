import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { 
  TicketPayment, 
  TicketOrder, 
  TicketOrderWithDetails,
  CreatePaymentData,
  CreateOrdersData,
  PurchaseTicketsData
} from '@/types/ticketPurchase';
import { generateQRCodeImage, QRCodeData } from '@/utils/qrCodeGenerator';

/**
 * Create a payment record
 */
export const useCreateTicketPayment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: CreatePaymentData) => {
      const { data: payment, error } = await supabase
        .from('ticket_payments')
        .insert({
          user_id: data.userId,
          payment_method: data.paymentMethod,
          amount_paid: data.totalAmount,
          payment_status: 'completed',
        })
        .select()
        .single();
      
      if (error) throw error;
      return payment as TicketPayment;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-payments'] });
    },
  });
};

/**
 * Create ticket order records and update sold count
 */
export const useCreateTicketOrders = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: CreateOrdersData) => {
      // Split each ticket purchase into individual orders (one per ticket)
      const orders = data.tickets.flatMap(ticket => 
        Array.from({ length: ticket.quantity }, () => ({
          ticket_id: ticket.ticketId,
          user_id: data.userId,
          payment_id: data.paymentId,
          quantity: 1, // Each order represents 1 individual ticket
          unit_price: ticket.unitPrice,
          total_price: ticket.unitPrice,
          status: 'active' as const,
        }))
      );
      
      const { data: createdOrders, error } = await supabase
        .from('ticket_orders')
        .insert(orders)
        .select();
      
      if (error) throw error;
      
      // Update ticket sold count for each ticket
      for (const ticket of data.tickets) {
        const { error: updateError } = await supabase.rpc('increment_ticket_sold', {
          p_ticket_id: ticket.ticketId,
          p_increment_by: ticket.quantity,
        });
        
        if (updateError) throw updateError;
      }
      
      return createdOrders as TicketOrder[];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-orders'] });
      queryClient.invalidateQueries({ queryKey: ['events'] });
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
    },
  });
};

/**
 * Orchestrator hook: Create payment + orders in one transaction
 */
export const usePurchaseTickets = () => {
  const createPayment = useCreateTicketPayment();
  const createOrders = useCreateTicketOrders();
  
  return useMutation({
    mutationFn: async (purchaseData: PurchaseTicketsData) => {
      // Step 1: Create payment record
      const payment = await createPayment.mutateAsync({
        userId: purchaseData.userId,
        paymentMethod: purchaseData.paymentMethod,
        totalAmount: purchaseData.totalAmount,
      });
      
      // Step 2: Create ticket orders linked to payment
      const orders = await createOrders.mutateAsync({
        userId: purchaseData.userId,
        paymentId: payment.id,
        tickets: purchaseData.tickets,
      });
      
      return { payment, orders };
    },
  });
};

/**
 * Fetch user's ticket orders (owned or purchased)
 */
export const useUserTicketOrders = (userId?: string) => {
  return useQuery({
    queryKey: ['user-orders', userId],
    queryFn: async () => {
      if (!userId) return [];
      
      const { data, error } = await supabase
        .from('ticket_orders')
        .select(`
          *,
          ticket:tickets(*),
          event:tickets(event:events(*)),
          payment:ticket_payments(*)
        `)
        .or(`user_id.eq.${userId},current_owner_id.eq.${userId}`)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as unknown as TicketOrderWithDetails[];
    },
    enabled: !!userId,
  });
};

/**
 * Check how many tickets user has purchased for an event
 */
export const useUserEventTicketCount = (userId: string, eventId: string) => {
  return useQuery({
    queryKey: ['user-event-ticket-count', userId, eventId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ticket_orders')
        .select('quantity, ticket:tickets!inner(event_id)')
        .eq('user_id', userId)
        .eq('tickets.event_id', eventId)
        .in('status', ['active', 'redeemed', 'checked_in']);
      
      if (error) throw error;
      
      const totalTickets = data.reduce((sum: number, order: any) => sum + order.quantity, 0);
      return {
        count: totalTickets,
        remaining: Math.max(0, 4 - totalTickets),
      };
    },
    enabled: !!userId && !!eventId,
  });
};

/**
 * Generate QR code for a single ticket order
 */
export const useTicketQRCode = (orderId: string | undefined) => {
  return useQuery({
    queryKey: ['ticket-qr', orderId],
    queryFn: async () => {
      if (!orderId) throw new Error('Order ID is required');
      
      // Fetch order with user profile data
      const { data: order, error } = await supabase
        .from('ticket_orders')
        .select(`
          id,
          user_id,
          current_owner_id,
          profiles:user_id(username, phone)
        `)
        .eq('id', orderId)
        .single();
      
      if (error) throw error;
      if (!order) throw new Error('Order not found');
      
      const profile = order.profiles as any;
      
      if (!profile?.username || !profile?.phone) {
        throw new Error('User profile incomplete');
      }
      
      const qrData: QRCodeData = {
        username: profile.username,
        phoneNumber: profile.phone,
        ticketOrderId: order.id,
      };
      
      const qrImageUrl = await generateQRCodeImage(qrData);
      return qrImageUrl;
    },
    enabled: !!orderId,
    staleTime: Infinity, // QR codes never change
    gcTime: Infinity,
  });
};

/**
 * Generate QR codes for multiple ticket orders
 */
export const useTicketOrderQRCodes = (orderIds: string[]) => {
  return useQuery({
    queryKey: ['ticket-qrs', orderIds],
    queryFn: async () => {
      const qrCodes = await Promise.all(
        orderIds.map(async (orderId) => {
          const { data: order, error } = await supabase
            .from('ticket_orders')
            .select(`
              id,
              user_id,
              profiles:user_id(username, phone)
            `)
            .eq('id', orderId)
            .single();
          
          if (error) throw error;
          
          const profile = order.profiles as any;
          
          const qrData: QRCodeData = {
            username: profile.username,
            phoneNumber: profile.phone,
            ticketOrderId: order.id,
          };
          
          const qrImageUrl = await generateQRCodeImage(qrData);
          return { orderId, qrImageUrl };
        })
      );
      
      return qrCodes;
    },
    enabled: orderIds.length > 0,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
