
import React from 'react';
import { useParams } from 'react-router-dom';
import ArtistMembershipHeader from '@/components/artist-membership/ArtistMembershipHeader';
import WelcomeSection from '@/components/artist-membership/WelcomeSection';
import EarlyAccessSection from '@/components/artist-membership/EarlyAccessSection';
import MerchandiseSection from '@/components/artist-membership/MerchandiseSection';
import MonthlyGiftsSection from '@/components/artist-membership/MonthlyGiftsSection';
import ExclusiveContentSection from '@/components/artist-membership/ExclusiveContentSection';

const ArtistMembership = () => {
  const { artistId } = useParams();

  // Mock artist data - in a real app this would be fetched based on artistId
  const artist = {
    id: parseInt(artistId || '1'),
    name: '阿妹',
    image: 'https://img.ltn.com.tw/Upload/ent/page/800/2024/09/18/phpOqkt14.jpg',
    coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&h=400',
  };

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
