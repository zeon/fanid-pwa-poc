
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Crown, Star, Users, Gift, Calendar, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import CyberpunkButton from '@/components/auth/CyberpunkButton';
import MembershipPaymentDialog from './MembershipPaymentDialog';
import { useMembershipOperations } from '@/hooks/useMembershipOperations';
import { toast } from 'sonner';

const MembershipSectionWithContext = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { purchaseMembership, checkMembershipStatus } = useMembershipOperations();
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<{ id: number; name: string } | null>(null);

  const artists = [
    {
      id: 1,
      name: '阿妹',
      image: 'https://img.ltn.com.tw/Upload/ent/page/800/2024/09/18/phpOqkt14.jpg',
      membershipFee: 'NT$299/月',
      benefits: ['早鳥購票', '限定商品', '月月好禮', '獨家內容']
    },
    {
      id: 2,
      name: 'Jay Chou',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=300&h=400',
      membershipFee: 'NT$399/月',
      benefits: ['VIP座位', '見面會優先', '簽名商品', '幕後花絮']
    }
  ];

  const handleJoinMembership = (artist: { id: number; name: string }) => {
    setSelectedArtist(artist);
    setIsPaymentDialogOpen(true);
  };

  const handlePaymentSuccess = async () => {
    if (!selectedArtist) return;

    const success = await purchaseMembership(selectedArtist.id);
    
    if (success) {
      toast.success(t('dashboard.membership.paymentSuccess'));
      setIsPaymentDialogOpen(false);
      setSelectedArtist(null);
    } else {
      toast.error('Payment failed. Please try again.');
    }
  };

  const handleAccessMembership = (artistId: number) => {
    navigate(`/artist-membership/${artistId}`);
  };

  return (
    <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50">
      <CardHeader>
        <CardTitle className="text-2xl text-white flex items-center">
          <Crown className="w-6 h-6 text-yellow-400 mr-3" />
          {t('dashboard.membership.title')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {artists.map((artist) => {
            const isMember = checkMembershipStatus(artist.id);
            
            return (
              <div key={artist.id} className="bg-gray-700/50 border border-gray-600/50 rounded-lg p-6 hover:scale-105 transition-transform">
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={artist.image}
                    alt={artist.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-cyan-400"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-white">{artist.name}</h3>
                    {isMember ? (
                      <Badge className="bg-gradient-to-r from-cyan-400 to-purple-400 text-black">
                        <Crown className="w-3 h-3 mr-1" />
                        {t('dashboard.membership.status.active')}
                      </Badge>
                    ) : (
                      <p className="text-gray-300 text-sm">{artist.membershipFee}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  {artist.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-300">
                      <Star className="w-4 h-4 text-yellow-400 mr-2 flex-shrink-0" />
                      {benefit}
                    </div>
                  ))}
                </div>

                {isMember ? (
                  <CyberpunkButton
                    variant="primary"
                    size="sm"
                    className="w-full"
                    onClick={() => handleAccessMembership(artist.id)}
                  >
                    <ArrowRight className="w-4 h-4 mr-2" />
                    {t('dashboard.membership.actions.access')}
                  </CyberpunkButton>
                ) : (
                  <CyberpunkButton
                    variant="primary"
                    size="sm"
                    className="w-full"
                    onClick={() => handleJoinMembership(artist)}
                  >
                    <Crown className="w-4 h-4 mr-2" />
                    {t('dashboard.membership.actions.join')}
                  </CyberpunkButton>
                )}
              </div>
            );
          })}
        </div>

        <MembershipPaymentDialog
          isOpen={isPaymentDialogOpen}
          onClose={() => setIsPaymentDialogOpen(false)}
          onPaymentSuccess={handlePaymentSuccess}
          artistName={selectedArtist?.name || ''}
          membershipFee="NT$299"
        />
      </CardContent>
    </Card>
  );
};

export default MembershipSectionWithContext;
