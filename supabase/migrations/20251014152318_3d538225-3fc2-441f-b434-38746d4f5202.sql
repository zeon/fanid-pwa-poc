-- Drop the existing foreign key that points to auth.users
ALTER TABLE public.ticket_orders
DROP CONSTRAINT ticket_orders_user_id_fkey;

-- Add new foreign key constraint pointing to profiles.id instead
ALTER TABLE public.ticket_orders
ADD CONSTRAINT ticket_orders_user_id_fkey 
FOREIGN KEY (user_id) 
REFERENCES public.profiles(id) 
ON DELETE CASCADE;

-- Add comment for documentation
COMMENT ON CONSTRAINT ticket_orders_user_id_fkey ON public.ticket_orders 
IS 'Links ticket orders to the user profile who purchased them';