-- Fix ambiguous column reference in check_max_tickets_per_event function
CREATE OR REPLACE FUNCTION public.check_max_tickets_per_event()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  -- Check total tickets purchased by this user for this event
  -- Uses user_id (original purchaser) NOT current_owner_id
  -- Explicitly qualify quantity column to avoid ambiguity
  IF (
    SELECT COALESCE(SUM(o.quantity), 0)
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
$function$;