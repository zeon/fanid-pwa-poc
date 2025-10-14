-- Allow free tickets by updating the amount_paid constraint
-- Drop the old constraint that requires amount > 0
ALTER TABLE ticket_payments 
DROP CONSTRAINT IF EXISTS ticket_payments_amount_paid_check;

-- Add new constraint that allows amount >= 0 (to support free tickets)
ALTER TABLE ticket_payments 
ADD CONSTRAINT ticket_payments_amount_paid_check 
CHECK (amount_paid >= 0);