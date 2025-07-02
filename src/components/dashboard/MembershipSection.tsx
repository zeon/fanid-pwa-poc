
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ArtistCard from '@/components/dashboard/ArtistCard';
import MembershipPaymentDialog from '@/components/dashboard/MembershipPaymentDialog';
import MembershipPaymentSuccessDialog from '@/components/dashboard/MembershipPaymentSuccessDialog';

interface Artist {
  id: number;
  name: string;
  image: string;
  isMember: boolean;
  isUserMember: boolean;
}

const MembershipSection = () => {
  const { t } = useTranslation();
  const [artists, setArtists] = useState<Artist[]>([
    {
      id: 1,
      name: '阿妹',
      image: 'https://img.ltn.com.tw/Upload/ent/page/800/2024/09/18/phpOqkt14.jpg',
      isMember: true,
      isUserMember: true
    },
    {
      id: 2,
      name: '周杰倫',
      image: 'https://media.nownews.com/nn_media/thumbnail/2024/10/1729659811782-0b8ca40ae6954936a5185c7ea55f4d98-800x526.webp?unShow=false',
      isMember: false,
      isUserMember: false
    },
    {
      id: 3,
      name: '五月天',
      image: 'https://cdn.hk01.com/di/media/images/dw/20201109/402509627490570240781906.jpeg/PDt8V7e5E1VDwKOXk3JDpfcz18CsAgo-6XFDbelxQ20?v=w1600r16_9',
      isMember: false,
      isUserMember: false
    }
  ]);

  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const handleJoinClick = (artist: Artist) => {
    setSelectedArtist(artist);
    setShowPaymentDialog(true);
  };

  const handlePaymentSuccess = (artistId: number) => {
    // Update the artist's membership status
    setArtists(prev => prev.map(artist => 
      artist.id === artistId 
        ? { ...artist, isUserMember: true }
        : artist
    ));
    
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
