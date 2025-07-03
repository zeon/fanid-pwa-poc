
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ArtistMembershipState {
  [artistId: number]: boolean;
}

interface ArtistMembershipContextType {
  membershipStatuses: ArtistMembershipState;
  updateMembershipStatus: (artistId: number, status: boolean) => void;
  isMember: (artistId: number) => boolean;
}

const ArtistMembershipContext = createContext<ArtistMembershipContextType | undefined>(undefined);

const STORAGE_KEY = 'artistMembershipStatuses';

export const ArtistMembershipProvider = ({ children }: { children: ReactNode }) => {
  const [membershipStatuses, setMembershipStatuses] = useState<ArtistMembershipState>({});

  // Load from localStorage on initialization
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setMembershipStatuses(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load membership statuses from localStorage:', error);
    }
  }, []);

  // Save to localStorage whenever statuses change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(membershipStatuses));
    } catch (error) {
      console.error('Failed to save membership statuses to localStorage:', error);
    }
  }, [membershipStatuses]);

  const updateMembershipStatus = (artistId: number, status: boolean) => {
    setMembershipStatuses(prev => ({
      ...prev,
      [artistId]: status
    }));
  };

  const isMember = (artistId: number) => {
    return membershipStatuses[artistId] || false;
  };

  return (
    <ArtistMembershipContext.Provider 
      value={{ 
        membershipStatuses, 
        updateMembershipStatus, 
        isMember 
      }}
    >
      {children}
    </ArtistMembershipContext.Provider>
  );
};

export const useArtistMembership = () => {
  const context = useContext(ArtistMembershipContext);
  if (context === undefined) {
    throw new Error('useArtistMembership must be used within an ArtistMembershipProvider');
  }
  return context;
};
