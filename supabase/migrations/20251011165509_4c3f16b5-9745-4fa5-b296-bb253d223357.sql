-- Add public read access to active tickets so users can view available tickets
CREATE POLICY "Public can view active tickets"
ON public.tickets 
FOR SELECT 
USING (status = 'active');