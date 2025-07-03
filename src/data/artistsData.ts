
export interface Artist {
  id: number;
  name: string;
  image: string;
  coverImage: string;
  isMember: boolean;
  isUserMember: boolean;
}

export const artistsData: Artist[] = [
  {
    id: 1,
    name: '阿妹',
    image: 'https://img.ltn.com.tw/Upload/ent/page/800/2024/09/18/phpOqkt14.jpg',
    coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&h=400',
    isMember: true,
    isUserMember: true
  },
  {
    id: 2,
    name: '周杰倫',
    image: 'https://media.nownews.com/nn_media/thumbnail/2024/10/1729659811782-0b8ca40ae6954936a5185c7ea55f4d98-800x526.webp?unShow=false',
    coverImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&h=400',
    isMember: false,
    isUserMember: false
  },
  {
    id: 3,
    name: '五月天',
    image: 'https://cdn.hk01.com/di/media/images/dw/20201109/402509627490570240781906.jpeg/PDt8V7e5E1VDwKOXk3JDpfcz18CsAgo-6XFDbelxQ20?v=w1600r16_9',
    coverImage: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&h=400',
    isMember: false,
    isUserMember: false
  }
];

export const getArtistById = (id: number): Artist | undefined => {
  return artistsData.find(artist => artist.id === id);
};
