
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ArtistCard from '@/components/dashboard/ArtistCard';
import MembershipPaymentDialog from '@/components/dashboard/MembershipPaymentDialog';
import MembershipPaymentSuccessDialog from '@/components/dashboard/MembershipPaymentSuccessDialog';
import { useArtistMembership } from '@/contexts/ArtistMembershipContext';

interface Artist {
  id: number;
  name: string;
  image: string;
  isMember: boolean;
  isUserMember: boolean;
}

const MembershipSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { artists, updateMembershipStatus } = useArtistMembership();

  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const handleJoinClick = (artist: Artist) => {
    setSelectedArtist(artist);
    setShowPaymentDialog(true);
  };

  const handleEnterClick = (artist: Artist) => {
    navigate(`/artist-membership/${artist.id}`);
  };

  const handlePaymentSuccess = (artistId: number) => {
    // Update the artist's membership status using context
    updateMembershipStatus(artistId, true);
    
    // Close payment dialog and show success dialog
    setShowPaymentDialog(false);
    setShowSuccessDialog(true);
  };

  const handleClosePaymentDialog = () => {
    setShowPaymentDialog(false);
    setSelectedArtist(null);
  };

  const handleCloseSuccessDialog = () => {
    setShowSuccessDialog(false);
    setSelectedArtist(null);
  };

  return (
    <>
      <Card className="bg-gray-800/80 backdrop-blur-sm border-gray-700">
        <CardHeader>
          <CardTitle className="text-xl text-white">{t('dashboard.membership.title')}</CardTitle>
          <p className="text-gray-400 text-sm">{t('dashboard.membership.subtitle')}</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artists.map((artist) => (
              <ArtistCard 
                key={artist.id} 
                artist={artist} 
                onJoinClick={handleJoinClick}
                onEnterClick={handleEnterClick}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      <MembershipPaymentDialog
        isOpen={showPaymentDialog}
        onClose={handleClosePaymentDialog}
        artist={selectedArtist}
        onPaymentSuccess={handlePaymentSuccess}
      />

      <MembershipPaymentSuccessDialog
        isOpen={showSuccessDialog}
        onClose={handleCloseSuccessDialog}
        artist={selectedArtist}
      />
    </>
  );
};

export default MembershipSection;
