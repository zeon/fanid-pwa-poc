
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import CyberpunkButton from '@/components/auth/CyberpunkButton';
import { Crown, Star } from 'lucide-react';

interface Artist {
  id: number;
  name: string;
  image: string;
  isMember: boolean;
  isUserMember: boolean;
}

interface ArtistCardProps {
  artist: Artist;
  onJoinClick: (artist: Artist) => void;
  onEnterClick?: (artist: Artist) => void;
}

const ArtistCard = ({ artist, onJoinClick, onEnterClick }: ArtistCardProps) => {
  const { t } = useTranslation();

  const handleJoinClick = () => {
    onJoinClick(artist);
  };

  const handleEnterClick = () => {
    if (onEnterClick) {
      onEnterClick(artist);
    }
  };

  return (
    <Card className="bg-gray-700/50 border-gray-600 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105 relative overflow-hidden">
      {/* Membership Ribbon */}
      {artist.isUserMember && (
        <div className="absolute top-0 right-0 z-10">
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-3 py-1 text-xs font-bold transform rotate-12 translate-x-2 -translate-y-1 shadow-lg">
            <Crown className="inline w-3 h-3 mr-1" />
            {t('dashboard.membership.member')}
          </div>
        </div>
      )}

      <CardContent className="p-0">
        {/* Artist Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={artist.image}
            alt={artist.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
        </div>

        {/* Artist Info */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold text-white">{artist.name}</h3>
            {artist.isMember && !artist.isUserMember && (
              <Star className="w-5 h-5 text-yellow-400" />
            )}
          </div>

          {/* Action Button */}
          <CyberpunkButton
            onClick={artist.isUserMember ? handleEnterClick : handleJoinClick}
            variant={artist.isUserMember ? "secondary" : "primary"}
            size="sm"
            className="w-full"
          >
            {artist.isUserMember
              ? t('dashboard.membership.enter')
              : t('dashboard.membership.join')
            }
          </CyberpunkButton>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArtistCard;
