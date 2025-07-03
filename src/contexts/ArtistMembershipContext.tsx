
import React, { createContext, useContext, useState, useEffect } from 'react';
import { artistsData, Artist } from '@/data/artistsData';

interface ArtistMembershipContextType {
  artists: Artist[];
  updateMembershipStatus: (artistId: number, isUserMember: boolean) => void;
  getArtistById: (id: number) => Artist | undefined;
}

const ArtistMembershipContext = createContext<ArtistMembershipContextType | undefined>(undefined);

export const useArtistMembership = () => {
  const context = useContext(ArtistMembershipContext);
  if (!context) {
    throw new Error('useArtistMembership must be used within an ArtistMembershipProvider');
  }
  return context;
};

export const ArtistMembershipProvider = ({ children }: { children: React.ReactNode }) => {
  const [artists, setArtists] = useState<Artist[]>(() => {
    // Try to load from localStorage on initialization
    const saved = localStorage.getItem('artistMemberships');
    if (saved) {
      try {
        const savedData = JSON.parse(saved);
        // Merge saved data with original data to ensure we have all artists
        return artistsData.map(artist => {
          const savedArtist = savedData.find((a: Artist) => a.id === artist.id);
          return savedArtist ? { ...artist, isUserMember: savedArtist.isUserMember } : artist;
        });
      } catch (error) {
        console.error('Failed to parse saved membership data:', error);
      }
    }
    return artistsData;
  });

  // Save to localStorage whenever artists state changes
  useEffect(() => {
    localStorage.setItem('artistMemberships', JSON.stringify(artists));
  }, [artists]);

  const updateMembershipStatus = (artistId: number, isUserMember: boolean) => {
    setArtists(prev => prev.map(artist => 
      artist.id === artistId 
        ? { ...artist, isUserMember }
        : artist
    ));
  };

  const getArtistById = (id: number): Artist | undefined => {
    return artists.find(artist => artist.id === id);
  };

  return (
    <ArtistMembershipContext.Provider value={{ 
      artists, 
      updateMembershipStatus, 
      getArtistById 
    }}>
      {children}
    </ArtistMembershipContext.Provider>
  );
};
