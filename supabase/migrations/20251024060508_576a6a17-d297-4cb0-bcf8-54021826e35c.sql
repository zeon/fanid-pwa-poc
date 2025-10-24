-- Add fanid_enrolled column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN fanid_enrolled BOOLEAN NOT NULL DEFAULT false;

-- Update the handle_new_user function to explicitly set fanid_enrolled to false
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Insert profile with data from raw_user_meta_data, email, and verification status
  INSERT INTO public.profiles (
    id, 
    username, 
    phone, 
    id_last_five, 
    email,
    email_verified,
    fanid_enrolled
  )
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'username',
    NEW.raw_user_meta_data->>'phone',
    NEW.raw_user_meta_data->>'id_last_five',
    NEW.email,
    -- Set email_verified based on whether email_confirmed_at exists
    (NEW.email_confirmed_at IS NOT NULL),
    false  -- Initialize fanid_enrolled to false
  );
  
  -- Assign default 'user' role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  RETURN NEW;
END;
$$;