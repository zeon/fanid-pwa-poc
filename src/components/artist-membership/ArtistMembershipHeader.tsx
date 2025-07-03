
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
        className="absolute top-6 left-6 p-3 bg-gray-800/80 rounded-full hover:bg-gray-700/80 transition-colors z-10"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>

      {/* Artist Info */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-4xl px-6">
        <div className="flex flex-col md:flex-row items-center md:items-end justify-center md:space-x-6 space-y-4 md:space-y-0">
          <img
            src={artist.image}
            alt={artist.name}
            className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-cyan-400 flex-shrink-0"
          />
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-3 mb-2">
              <Crown className="w-6 h-6 md:w-8 md:h-8 text-cyan-400" />
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 text-black px-3 py-1 md:px-4 md:py-1 rounded-full text-xs md:text-sm font-bold">
                {t('dashboard.artistMembership.badges.vipMember')}
              </span>
            </div>
            <h1 className="text-2xl md:text-4xl font-bold mb-2">{artist.name}</h1>
            <p className="text-gray-300 text-sm md:text-base">{t('dashboard.artistMembership.community.exclusiveMemberCommunity')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistMembershipHeader;
