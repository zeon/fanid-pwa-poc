
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
      image: 'https://www.bin-music.com.tw/album/album/671625b9869aa+w700.jpg',
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
