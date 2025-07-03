
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import ArtistMembershipHeader from '@/components/artist-membership/ArtistMembershipHeader';
import WelcomeSection from '@/components/artist-membership/WelcomeSection';
import EarlyAccessSection from '@/components/artist-membership/EarlyAccessSection';
import MerchandiseSection from '@/components/artist-membership/MerchandiseSection';
import MonthlyGiftsSection from '@/components/artist-membership/MonthlyGiftsSection';
import ExclusiveContentSection from '@/components/artist-membership/ExclusiveContentSection';
import { useArtistMembership } from '@/contexts/ArtistMembershipContext';

const ArtistMembership = () => {
  const { artistId } = useParams();
  const { getArtistById } = useArtistMembership();
  
  // Get artist data based on the artistId parameter from global context
  const artist = getArtistById(parseInt(artistId || '0'));

  // If artist not found, redirect to dashboard
  if (!artist) {
    return <Navigate to="/dashboard" replace />;
  }

  // If user is not a member of this artist, redirect to dashboard
  if (!artist.isUserMember) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <ArtistMembershipHeader artist={artist} />

      <div className="max-w-6xl mx-auto p-6">
        <WelcomeSection artistName={artist.name} />
        <EarlyAccessSection />
        <MerchandiseSection />
        <MonthlyGiftsSection />
        <ExclusiveContentSection />
      </div>
    </div>
  );
};

export default ArtistMembership;
