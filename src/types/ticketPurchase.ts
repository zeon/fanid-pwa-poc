export interface TicketPayment {
  id: string;
  user_id: string;
  payment_method: 'credit_card' | 'atm_transfer';
  amount_paid: number;
  payment_date: string;
  payment_status: 'pending' | 'completed' | 'failed' | 'refunded';
  created_at: string;
  updated_at: string;
}

export interface TicketOrder {
  id: string;
  ticket_id: string;
  user_id: string;
  payment_id: string;
  current_owner_id: string | null;
  transferred_at: string | null;
  transferred_from: string | null;
  quantity: number;
  unit_price: number;
  total_price: number;
  status: 'active' | 'redeemed' | 'checked_in' | 'cancelled' | 'transferred';
  redeemed_at: string | null;
  checked_in_at: string | null;
  checked_in_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface TicketOrderWithDetails extends TicketOrder {
  ticket: {
    id: string;
    name: string;
    description: string | null;
    price: number;
    event_id: string;
  };
  event: {
    id: string;
    name: string;
    venue: string;
    start_date: string;
  };
  payment: TicketPayment;
}

export interface CreatePaymentData {
  userId: string;
  paymentMethod: 'credit_card' | 'atm_transfer';
  totalAmount: number;
}

export interface CreateOrdersData {
  userId: string;
  paymentId: string;
  tickets: {
    ticketId: string;
    quantity: number;
    unitPrice: number;
  }[];
}

export interface PurchaseTicketsData {
  userId: string;
  eventId: string;
  paymentMethod: 'credit_card' | 'atm_transfer';
  totalAmount: number;
  tickets: {
    ticketId: string;
    quantity: number;
    unitPrice: number;
  }[];
}
