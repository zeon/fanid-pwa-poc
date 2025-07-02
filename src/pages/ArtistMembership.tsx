
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Crown, Gift, ShoppingBag, Clock, Star, Music } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

  const benefits = [
    {
      icon: Clock,
      title: 'Early Access Queue',
      description: 'Get priority access to ticket sales - jump ahead of the line!',
      titleZh: '優先購票通道',
      descriptionZh: '享有票券優先購買權 - 跳過排隊！'
    },
    {
      icon: ShoppingBag,
      title: 'Limited Edition Merchandise',
      description: 'Exclusive merchandise only available to VIP members',
      titleZh: '限量版周邊商品',
      descriptionZh: '僅限VIP會員專享的獨家周邊商品'
    },
    {
      icon: Gift,
      title: 'Free Monthly Gift',
      description: 'Receive surprise gifts and collectibles each month',
      titleZh: '每月免費禮品',
      descriptionZh: '每月收到驚喜禮品和收藏品'
    },
    {
      icon: Star,
      title: 'Exclusive Content',
      description: 'Behind-the-scenes videos and exclusive performances',
      titleZh: '獨家內容',
      descriptionZh: '幕後花絮影片和獨家演出'
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

        {/* Member Benefits */}
        <Card className="bg-gray-800/50 border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-white flex items-center">
              <Crown className="w-6 h-6 text-yellow-400 mr-3" />
              Your VIP Benefits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-gray-700/50 rounded-lg p-6 hover:bg-gray-700/70 transition-colors">
                  <div className="flex items-start space-x-4">
                    <div className="bg-cyan-500/20 p-3 rounded-lg">
                      <benefit.icon className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                      <p className="text-gray-300 text-sm">{benefit.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Exclusive Content */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl text-white flex items-center">
              <Star className="w-6 h-6 text-purple-400 mr-3" />
              Exclusive Content
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
