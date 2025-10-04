import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Profile {
  id: string;
  username: string | null;
  phone: string | null;
  id_last_five: string | null;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  roles: string[];
  loading: boolean;
  isAdmin: boolean;
  emailVerified: boolean;
  signUp: (email: string, password: string, metadata: {
    username: string;
    phone: string;
    id_last_five: string;
  }) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  hasRole: (role: string) => boolean;
  updateProfile: (data: Partial<Profile>) => Promise<{ error: any }>;
  resendVerificationEmail: () => Promise<{ error: any }>;
  checkEmailVerification: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [roles, setRoles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [emailVerified, setEmailVerified] = useState(false);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setEmailVerified(!!session?.user?.email_confirmed_at);
        
        // Defer fetching profile and roles with setTimeout
        if (session?.user) {
          setTimeout(() => {
            fetchProfileAndRoles(session.user.id);
          }, 0);
        } else {
          setProfile(null);
          setRoles([]);
          setLoading(false);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setEmailVerified(!!session?.user?.email_confirmed_at);
      
      if (session?.user) {
        fetchProfileAndRoles(session.user.id);
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfileAndRoles = async (userId: string) => {
    try {
      // Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (profileError) throw profileError;
      setProfile(profileData);

      // Fetch roles
      const { data: rolesData, error: rolesError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId);

      if (rolesError) throw rolesError;
      setRoles(rolesData.map(r => r.role));
    } catch (error) {
      console.error('Error fetching profile/roles:', error);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, metadata: {
    username: string;
    phone: string;
    id_last_five: string;
  }) => {
    try {
      // Check if email already exists
      const { data: existingUser } = await supabase.auth.signInWithPassword({
        email,
        password: 'dummy-check'
      });
      
      // If we get a response (even error), email might exist
      // Better check: try to sign up and check the error
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/verify-email`,
          data: metadata
        }
      });

      // Supabase returns success even for duplicate emails (for security)
      // But we can check if a user was actually created
      if (!error && data.user && !data.user.identities?.length) {
        return { 
          error: { 
            message: 'user_repeated_signup',
            status: 200 
          } 
        };
      }

      return { error };
    } catch (error) {
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      return { error };
    } catch (error) {
      return { error };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      setProfile(null);
      setRoles([]);
      toast.success('Signed out successfully');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Failed to sign out');
    }
  };

  const hasRole = (role: string): boolean => {
    return roles.includes(role);
  };

  const updateProfile = async (data: Partial<Profile>) => {
    if (!user) return { error: new Error('No user logged in') };

    try {
      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', user.id);

      if (!error) {
        setProfile(prev => prev ? { ...prev, ...data } : null);
        toast.success('Profile updated successfully');
      }

      return { error };
    } catch (error) {
      return { error };
    }
  };

  const resendVerificationEmail = async () => {
    try {
      if (!session) {
        return { error: new Error('No active session') };
      }

      const { error } = await supabase.functions.invoke('resend-verification-email', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      return { error };
    } catch (error) {
      return { error };
    }
  };

  const checkEmailVerification = async (): Promise<boolean> => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const verified = !!session?.user?.email_confirmed_at;
      setEmailVerified(verified);
      return verified;
    } catch (error) {
      console.error('Error checking email verification:', error);
      return false;
    }
  };

  const isAdmin = roles.includes('admin');

  const value = {
    user,
    session,
    profile,
    roles,
    loading,
    isAdmin,
    emailVerified,
    signUp,
    signIn,
    signOut,
    hasRole,
    updateProfile,
    resendVerificationEmail,
    checkEmailVerification
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
