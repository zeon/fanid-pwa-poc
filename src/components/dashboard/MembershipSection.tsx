
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ArtistCard from '@/components/dashboard/ArtistCard';

const MembershipSection = () => {
  const { t } = useTranslation();

  // Mock artist data - in a real app this would come from an API
  const artists = [
    {
      id: 1,
      name: 'Taylor Swift',
      image: '/lovable-uploads/246d4fa3-f3c0-4a99-87f2-59e45c844aaf.png',
      isMember: true,
      isUserMember: true
    },
    {
      id: 2,
      name: 'Ed Sheeran',
      image: '/lovable-uploads/2ad563c3-1d96-484a-8dd3-e48291a2b95d.png',
      isMember: false,
      isUserMember: false
    },
    {
      id: 3,
      name: 'Ariana Grande',
      image: '/lovable-uploads/2bc911c8-cdb2-4ffc-a233-b6188f01db67.png',
      isMember: false,
      isUserMember: false
    }
  ];

  return (
    <Card className="bg-gray-800/80 backdrop-blur-sm border-gray-700">
      <CardHeader>
        <CardTitle className="text-xl text-white">{t('dashboard.membership.title')}</CardTitle>
        <p className="text-gray-400 text-sm">{t('dashboard.membership.subtitle')}</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {artists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MembershipSection;
