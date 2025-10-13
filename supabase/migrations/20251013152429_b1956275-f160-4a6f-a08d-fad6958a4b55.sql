-- ============================================
-- PHASE 1: Ticket Purchase System Schema
-- ============================================

-- Table to store payment transactions
CREATE TABLE IF NOT EXISTS public.ticket_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Payment details
  payment_method TEXT NOT NULL CHECK (payment_method IN ('credit_card', 'atm_transfer')),
  amount_paid NUMERIC(10, 2) NOT NULL CHECK (amount_paid > 0),
  payment_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  
  -- Payment status tracking
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (
    payment_status IN ('pending', 'completed', 'failed', 'refunded')
  ),
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_ticket_payments_user_id ON public.ticket_payments(user_id);
CREATE INDEX idx_ticket_payments_status ON public.ticket_payments(payment_status);
CREATE INDEX idx_ticket_payments_date ON public.ticket_payments(payment_date DESC);

-- Auto-update trigger
CREATE TRIGGER update_ticket_payments_updated_at
  BEFORE UPDATE ON public.ticket_payments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Comments
COMMENT ON TABLE public.ticket_payments IS 'Stores payment transactions for ticket purchases. One payment can contain multiple ticket orders (1:N relationship).';
COMMENT ON COLUMN public.ticket_payments.user_id IS 'User who made the payment (original purchaser)';
COMMENT ON COLUMN public.ticket_payments.amount_paid IS 'Total amount paid for all tickets in this transaction';

-- ============================================
-- Table to store individual ticket orders
-- ============================================

CREATE TABLE IF NOT EXISTS public.ticket_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Foreign keys
  ticket_id UUID NOT NULL REFERENCES public.tickets(id) ON DELETE RESTRICT,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  payment_id UUID NOT NULL REFERENCES public.ticket_payments(id) ON DELETE CASCADE,
  
  -- Transfer tracking (for future use)
  current_owner_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  transferred_at TIMESTAMP WITH TIME ZONE,
  transferred_from UUID REFERENCES auth.users(id),
  
  -- Order details
  quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity >= 1),
  unit_price NUMERIC(10, 2) NOT NULL CHECK (unit_price >= 0),
  total_price NUMERIC(10, 2) NOT NULL CHECK (total_price >= 0),
  
  -- Ticket lifecycle status
  status TEXT NOT NULL DEFAULT 'active' CHECK (
    status IN ('active', 'redeemed', 'checked_in', 'cancelled', 'transferred')
  ),
  
  -- Check-in tracking
  redeemed_at TIMESTAMP WITH TIME ZONE,
  checked_in_at TIMESTAMP WITH TIME ZONE,
  checked_in_by UUID REFERENCES auth.users(id),
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_ticket_orders_user_id ON public.ticket_orders(user_id);
CREATE INDEX idx_ticket_orders_current_owner ON public.ticket_orders(current_owner_id);
CREATE INDEX idx_ticket_orders_payment_id ON public.ticket_orders(payment_id);
CREATE INDEX idx_ticket_orders_ticket_id ON public.ticket_orders(ticket_id);
CREATE INDEX idx_ticket_orders_status ON public.ticket_orders(status);

-- Composite index for event-based limit checks
CREATE INDEX idx_ticket_orders_user_event ON public.ticket_orders(user_id, ticket_id) 
  WHERE status NOT IN ('cancelled', 'transferred');

-- Auto-update trigger
CREATE TRIGGER update_ticket_orders_updated_at
  BEFORE UPDATE ON public.ticket_orders
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Data validation constraints
ALTER TABLE public.ticket_orders
ADD CONSTRAINT check_transfer_consistency 
CHECK (
  (current_owner_id IS NULL AND transferred_at IS NULL) OR
  (current_owner_id IS NOT NULL AND transferred_at IS NOT NULL)
);

ALTER TABLE public.ticket_orders
ADD CONSTRAINT check_price_calculation
CHECK (total_price = quantity * unit_price);

-- Comments
COMMENT ON TABLE public.ticket_orders IS 'Stores individual ticket orders. Each order represents one or more tickets of the same type purchased in a single transaction.';
COMMENT ON COLUMN public.ticket_orders.user_id IS 'Original purchaser - used for 4-ticket limit enforcement (NEVER changes)';
COMMENT ON COLUMN public.ticket_orders.current_owner_id IS 'Current owner after transfer (NULL = not transferred, owner is user_id)';
COMMENT ON COLUMN public.ticket_orders.quantity IS 'Number of tickets in this order (can purchase multiple of same type)';
COMMENT ON COLUMN public.ticket_orders.unit_price IS 'Price per ticket at time of purchase (historical record)';
COMMENT ON COLUMN public.ticket_orders.total_price IS 'Total price for this order (quantity × unit_price)';
COMMENT ON COLUMN public.ticket_orders.status IS 'active: valid ticket | redeemed: QR scanned | checked_in: entered venue | cancelled: refunded | transferred: moved to another user';

-- ============================================
-- Business Logic Functions
-- ============================================

-- Function: Enforce 4-Ticket Limit Per Event
CREATE OR REPLACE FUNCTION public.check_max_tickets_per_event()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Check total tickets purchased by this user for this event
  -- Uses user_id (original purchaser) NOT current_owner_id
  IF (
    SELECT COALESCE(SUM(quantity), 0)
    FROM ticket_orders o
    JOIN tickets t ON o.ticket_id = t.id
    WHERE o.user_id = NEW.user_id
      AND t.event_id = (SELECT event_id FROM tickets WHERE id = NEW.ticket_id)
      AND o.status NOT IN ('cancelled', 'transferred')
  ) + NEW.quantity > 4 THEN
    RAISE EXCEPTION 'Cannot purchase more than 4 tickets per event. You have reached the limit.';
  END IF;
  
  RETURN NEW;
END;
$$;

-- Trigger to enforce limit on INSERT
CREATE TRIGGER enforce_max_tickets_per_event
  BEFORE INSERT ON public.ticket_orders
  FOR EACH ROW
  EXECUTE FUNCTION public.check_max_tickets_per_event();

COMMENT ON FUNCTION public.check_max_tickets_per_event IS 'Enforces maximum 4 tickets per event per user based on original purchase (user_id), not current ownership';

-- Function: Update Ticket Sold Count
CREATE OR REPLACE FUNCTION public.increment_ticket_sold(
  p_ticket_id UUID,
  p_increment_by INTEGER
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.tickets
  SET sold = sold + p_increment_by,
      updated_at = NOW()
  WHERE id = p_ticket_id;
  
  -- Verify we didn't oversell
  IF (SELECT sold > quantity FROM tickets WHERE id = p_ticket_id) THEN
    RAISE EXCEPTION 'Cannot sell more tickets than available. Ticket ID: %', p_ticket_id;
  END IF;
END;
$$;

COMMENT ON FUNCTION public.increment_ticket_sold IS 'Safely increments the sold count for a ticket and validates against overselling';

-- Function: Transfer Ticket (Future Use)
CREATE OR REPLACE FUNCTION public.transfer_ticket_order(
  p_order_id UUID,
  p_new_owner_id UUID,
  p_current_user_id UUID
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_current_owner UUID;
BEGIN
  -- Get current owner (could be user_id or current_owner_id)
  SELECT COALESCE(current_owner_id, user_id) INTO v_current_owner
  FROM ticket_orders
  WHERE id = p_order_id;
  
  -- Verify current user is the owner
  IF v_current_owner != p_current_user_id THEN
    RAISE EXCEPTION 'You do not own this ticket';
  END IF;
  
  -- Verify ticket is transferable (active or redeemed only)
  IF NOT EXISTS (
    SELECT 1 FROM ticket_orders 
    WHERE id = p_order_id 
    AND status IN ('active', 'redeemed')
  ) THEN
    RAISE EXCEPTION 'This ticket cannot be transferred';
  END IF;
  
  -- Perform transfer
  UPDATE ticket_orders
  SET current_owner_id = p_new_owner_id,
      transferred_at = NOW(),
      transferred_from = p_current_user_id,
      status = 'transferred',
      updated_at = NOW()
  WHERE id = p_order_id;
END;
$$;

COMMENT ON FUNCTION public.transfer_ticket_order IS 'Transfers a ticket order from current owner to a new user. Validates ownership and ticket status.';

-- ============================================
-- Row-Level Security Policies
-- ============================================

-- RLS for ticket_payments
ALTER TABLE public.ticket_payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own payments"
ON public.ticket_payments FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can create own payments"
ON public.ticket_payments FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all payments"
ON public.ticket_payments FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update all payments"
ON public.ticket_payments FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete payments"
ON public.ticket_payments FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- RLS for ticket_orders
ALTER TABLE public.ticket_orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own or received orders"
ON public.ticket_orders FOR SELECT
TO authenticated
USING (
  auth.uid() = user_id OR 
  auth.uid() = current_owner_id
);

CREATE POLICY "Users can create own orders"
ON public.ticket_orders FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update owned orders"
ON public.ticket_orders FOR UPDATE
TO authenticated
USING (
  auth.uid() = COALESCE(current_owner_id, user_id)
);

CREATE POLICY "Admins can view all orders"
ON public.ticket_orders FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update all orders"
ON public.ticket_orders FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete orders"
ON public.ticket_orders FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Staff can check in orders"
ON public.ticket_orders FOR UPDATE
TO authenticated
USING (
  status IN ('active', 'redeemed')
)
WITH CHECK (
  status IN ('redeemed', 'checked_in')
);

-- ============================================
-- Helpful View
-- ============================================

CREATE OR REPLACE VIEW public.active_tickets_view AS
SELECT 
  o.id AS order_id,
  o.user_id AS original_purchaser,
  COALESCE(o.current_owner_id, o.user_id) AS current_owner,
  o.ticket_id,
  t.name AS ticket_name,
  t.event_id,
  e.name AS event_name,
  e.start_date AS event_date,
  e.venue AS event_venue,
  o.quantity,
  o.unit_price,
  o.total_price,
  o.status,
  o.created_at AS purchased_at,
  o.transferred_at,
  o.transferred_from,
  p.payment_method,
  p.payment_date
FROM ticket_orders o
JOIN tickets t ON o.ticket_id = t.id
JOIN events e ON t.event_id = e.id
JOIN ticket_payments p ON o.payment_id = p.id
WHERE o.status NOT IN ('cancelled');

COMMENT ON VIEW public.active_tickets_view IS 'Convenient view showing all active tickets with ownership and event details';

GRANT SELECT ON public.active_tickets_view TO authenticated;