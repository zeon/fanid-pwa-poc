
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Crown, Music } from 'lucide-react';

interface ArtistMembershipHeaderProps {
  artist: {
    id: number;
    name: string;
    image: string;
    coverImage: string;
  };
}

const ArtistMembershipHeader = ({ artist }: ArtistMembershipHeaderProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
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
          className="w-32 h-32 rounded-full object-cover border-4 border-cyan-400"
        />
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <Crown className="w-8 h-8 text-cyan-400" />
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 text-black px-4 py-1 rounded-full text-sm font-bold">
              {t('dashboard.artistMembership.badges.vipMember')}
            </span>
          </div>
          <h1 className="text-4xl font-bold mb-2">{artist.name}</h1>
          <p className="text-gray-300">{t('dashboard.artistMembership.community.exclusiveMemberCommunity')}</p>
        </div>
      </div>
    </div>
  );
};

export default ArtistMembershipHeader;
