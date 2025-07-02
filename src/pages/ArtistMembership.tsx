
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Crown, Gift, ShoppingBag, Clock, Star, Music } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import CyberpunkButton from '@/components/auth/CyberpunkButton';

const ArtistMembership = () => {
  const { t } = useTranslation();
  const { artistId } = useParams();
  const navigate = useNavigate();

  // Mock artist data - in a real app this would be fetched based on artistId
  const artist = {
    id: parseInt(artistId || '1'),
    name: '阿妹',
    image: 'https://img.ltn.com.tw/Upload/ent/page/800/2024/09/18/phpOqkt14.jpg',
    coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&h=400',
  };

  // Mock merchandise data
  const merchandiseItems = [
    {
      id: 1,
      name: 'VIP Concert Tee',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=300&h=300',
      originalPrice: 890,
      memberPrice: 623,
      discount: 30
    },
    {
      id: 2,
      name: 'Limited Edition Vinyl',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=300&h=300',
      originalPrice: 1200,
      memberPrice: 840,
      discount: 30
    },
    {
      id: 3,
      name: 'Exclusive Photo Book',
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=300&h=300',
      originalPrice: 650,
      memberPrice: 455,
      discount: 30
    }
  ];

  // Mock monthly gifts data
  const monthlyGifts = [
    {
      month: 'December 2024',
      name: 'Exclusive Badge Set',
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=200&h=200',
      status: 'available'
    },
    {
      month: 'January 2025',
      name: 'Special Photo Cards',
      image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=200&h=200',
      status: 'upcoming'
    }
  ];

  const exclusiveContent = [
    {
      title: 'Behind the Scenes: Studio Sessions',
      duration: '15:32',
      thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=300&h=200',
      type: 'Video'
    },
    {
      title: 'Exclusive Acoustic Performance',
      duration: '8:45',
      thumbnail: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=300&h=200',
      type: 'Video'
    },
    {
      title: 'Voice Messages from Artist',
      duration: '3:21',
      thumbnail: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=300&h=200',
      type: 'Audio'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header with Cover Image */}
      <div className="relative h-80 overflow-hidden">
        <img
          src={artist.coverImage}
          alt={`${artist.name} cover`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
        
        {/* Back Button */}
        <button
          onClick={() => navigate('/dashboard')}
          className="absolute top-6 left-6 p-3 bg-gray-800/80 rounded-full hover:bg-gray-700/80 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        {/* Artist Info */}
        <div className="absolute bottom-6 left-6 flex items-end space-x-6">
          <img
            src={artist.image}
            alt={artist.name}
            className="w-32 h-32 rounded-full object-cover border-4 border-yellow-400"
          />
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <Crown className="w-8 h-8 text-yellow-400" />
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-4 py-1 rounded-full text-sm font-bold">
                VIP MEMBER
              </span>
            </div>
            <h1 className="text-4xl font-bold mb-2">{artist.name}</h1>
            <p className="text-gray-300">Exclusive Member Community</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Welcome Message */}
        <Card className="bg-gradient-to-r from-purple-900/50 to-cyan-900/50 border-purple-500/30 mb-8">
          <CardContent className="p-8 text-center">
            <Music className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Welcome to the VIP Experience!</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              As a VIP member of {artist.name}'s exclusive community, you now have access to premium benefits, 
              exclusive content, and special privileges that make your fan experience truly extraordinary.
            </p>
          </CardContent>
        </Card>

        {/* Early Access Queue Section */}
        <Card className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border-cyan-500/30 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-white flex items-center">
              <Clock className="w-6 h-6 text-cyan-400 mr-3" />
              {t('dashboard.artistMembership.earlyAccess.title')}
            </CardTitle>
            <p className="text-gray-300">{t('dashboard.artistMembership.earlyAccess.subtitle')}</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-800/50 rounded-lg p-6 text-center">
                <div className="text-cyan-400 text-2xl font-bold mb-2">{t('dashboard.artistMembership.earlyAccess.position')}</div>
                <p className="text-gray-300 text-sm">{t('dashboard.artistMembership.earlyAccess.queueStatus')}</p>
                <Badge className="mt-2 bg-green-500/20 text-green-400 border-green-500/30">
                  {t('dashboard.artistMembership.earlyAccess.queueActive')}
                </Badge>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-6 text-center">
                <div className="text-yellow-400 text-2xl font-bold mb-2">{t('dashboard.artistMembership.earlyAccess.timeLeft')}</div>
                <p className="text-gray-300 text-sm">{t('dashboard.artistMembership.earlyAccess.nextSale')}</p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-6 flex items-center justify-center">
                <CyberpunkButton variant="primary" size="sm" className="w-full">
                  <Clock className="w-4 h-4 mr-2" />
                  {t('dashboard.artistMembership.earlyAccess.joinQueue')}
                </CyberpunkButton>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Exclusive Merchandise Section */}
        <Card className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-500/30 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-white flex items-center">
              <ShoppingBag className="w-6 h-6 text-purple-400 mr-3" />
              {t('dashboard.artistMembership.merchandise.title')}
            </CardTitle>
            <p className="text-gray-300">{t('dashboard.artistMembership.merchandise.subtitle')}</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {merchandiseItems.map((item) => (
                <div key={item.id} className="bg-gray-800/50 rounded-lg overflow-hidden hover:scale-105 transition-transform">
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 object-cover"
                    />
                    <Badge className="absolute top-3 right-3 bg-red-500/90 text-white">
                      {t('dashboard.artistMembership.merchandise.discount')}
                    </Badge>
                    <Badge className="absolute top-3 left-3 bg-yellow-500/90 text-black">
                      {t('dashboard.artistMembership.merchandise.limitedEdition')}
                    </Badge>
                  </div>
                  <div className="p-4">
                    <h4 className="text-white font-semibold mb-2">{item.name}</h4>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="text-gray-400 line-through text-sm">${item.originalPrice}</span>
                        <span className="text-cyan-400 font-bold ml-2">${item.memberPrice}</span>
                      </div>
                    </div>
                    <CyberpunkButton variant="secondary" size="sm" className="w-full">
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      {t('dashboard.artistMembership.merchandise.shopNow')}
                    </CyberpunkButton>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Monthly VIP Gifts Section */}
        <Card className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border-green-500/30 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-white flex items-center">
              <Gift className="w-6 h-6 text-green-400 mr-3" />
              {t('dashboard.artistMembership.monthlyGift.title')}
            </CardTitle>
            <p className="text-gray-300">{t('dashboard.artistMembership.monthlyGift.subtitle')}</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {monthlyGifts.map((gift, index) => (
                <div key={index} className="bg-gray-800/50 rounded-lg p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={gift.image}
                      alt={gift.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <h4 className="text-white font-semibold">{gift.name}</h4>
                      <p className="text-gray-400 text-sm">{gift.month}</p>
                      <Badge className={gift.status === 'available' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'}>
                        {gift.status === 'available' ? t('dashboard.artistMembership.monthlyGift.available') : t('dashboard.artistMembership.monthlyGift.nextGift')}
                      </Badge>
                    </div>
                  </div>
                  <CyberpunkButton 
                    variant={gift.status === 'available' ? 'primary' : 'secondary'} 
                    size="sm" 
                    className="w-full"
                    disabled={gift.status !== 'available'}
                  >
                    <Gift className="w-4 h-4 mr-2" />
                    {gift.status === 'available' ? t('dashboard.artistMembership.monthlyGift.claimGift') : t('dashboard.artistMembership.monthlyGift.nextGift')}
                  </CyberpunkButton>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Remaining Benefits - Exclusive Content */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl text-white flex items-center">
              <Star className="w-6 h-6 text-purple-400 mr-3" />
              {t('dashboard.artistMembership.remainingBenefits.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {exclusiveContent.map((content, index) => (
                <div key={index} className="bg-gray-700/50 rounded-lg overflow-hidden hover:scale-105 transition-transform cursor-pointer">
                  <div className="relative">
                    <img
                      src={content.thumbnail}
                      alt={content.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                    <div className="absolute bottom-2 left-2">
                      <span className="bg-cyan-500/80 text-white px-2 py-1 rounded text-xs font-medium">
                        {content.type}
                      </span>
                    </div>
                    <div className="absolute bottom-2 right-2">
                      <span className="bg-gray-900/80 text-white px-2 py-1 rounded text-xs">
                        {content.duration}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="text-white font-medium">{content.title}</h4>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 text-center">
              <CyberpunkButton variant="primary" size="sm">
                View All Exclusive Content
              </CyberpunkButton>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ArtistMembership;
