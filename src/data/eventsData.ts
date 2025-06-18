
export interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  venue: string;
  ticketType: string;
  image: string;
  status: 'upcoming' | 'past';
}

export const upcomingEvents: Event[] = [
  {
    id: '1',
    name: 'Lady Gaga',
    date: 'December 15, 2024',
    time: '8:00 PM',
    venue: 'Cyber Arena',
    ticketType: 'VIP',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
    status: 'upcoming'
  },
  {
    id: '2',
    name: 'BLACKPINK WORLD TOUR＜DEADLINE＞IN KAOHSIUNG',
    date: 'December 22, 2024',
    time: '9:00 PM',
    venue: 'Kaohsiung National Stadium',
    ticketType: 'GA',
    image: 'https://static.tixcraft.com/images/activity/25_blackpink_8a9d32f4f90351e8152527c74c8104aa.jpg',
    status: 'upcoming'
  },
  {
    id: '3',
    name: 'ONEREPUBLIC 2025 LIVE IN KAOHSIUNG',
    date: 'January 10, 2025',
    time: '7:30 PM',
    venue: 'K-Arena',
    ticketType: 'Premium',
    image: 'https://static.tixcraft.com/images/activity/25_1rkhh_9ad765114964bcecbef2c6708102c619.jpg',
    status: 'upcoming'
  },
  {
    id: '4',
    name: 'Energy ALL IN全面進擊 演唱會',
    date: 'January 25, 2025',
    time: '8:30 PM',
    venue: '高雄巨蛋',
    ticketType: 'VIP',
    image: 'https://static.tixcraft.com/images/activity/25_energykh_f2b38c3efea6cdbf75ff0b04f71221b0.jpg',
    status: 'upcoming'
  },
  {
    id: '5',
    name: 'Dua Lipa',
    date: 'February 8, 2025',
    time: '9:30 PM',
    venue: 'Holographic Theater',
    ticketType: 'GA',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop',
    status: 'upcoming'
  },
  {
    id: '6',
    name: 'Bruno Mars',
    date: 'February 20, 2025',
    time: '6:00 PM',
    venue: 'Matrix Amphitheater',
    ticketType: 'Premium',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
    status: 'upcoming'
  }
];

export const pastEvents: Event[] = [
  {
    id: '7',
    name: 'aMEI ASMR Maxxx @ Taipei Dome 世界巡迴演唱會',
    date: 'December 21, 2024',
    time: '8:00 PM',
    venue: '台北大巨蛋',
    ticketType: 'VIP',
    image: 'https://img.news.ebc.net.tw/EbcNews/news/2024/09/26/1727355118_74057.jpg?w=1',
    status: 'past'
  },
  {
    id: '8',
    name: 'BTS',
    date: 'November 3, 2024',
    time: '9:00 PM',
    venue: 'Underground Club',
    ticketType: 'GA',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop',
    status: 'past'
  },
  {
    id: '9',
    name: 'Ariana Grande',
    date: 'October 28, 2024',
    time: '7:00 PM',
    venue: 'Steel Stadium',
    ticketType: 'Premium',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
    status: 'past'
  },
  {
    id: '10',
    name: 'Ed Sheeran',
    date: 'October 12, 2024',
    time: '10:00 PM',
    venue: 'Glow Garden',
    ticketType: 'VIP',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
    status: 'past'
  },
  {
    id: '11',
    name: 'Olivia Rodrigo',
    date: 'September 25, 2024',
    time: '8:30 PM',
    venue: 'Digital Concert Hall',
    ticketType: 'GA',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop',
    status: 'past'
  },
  {
    id: '12',
    name: 'Post Malone',
    date: 'September 10, 2024',
    time: '9:15 PM',
    venue: 'Code Lounge',
    ticketType: 'Premium',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
    status: 'past'
  }
];
