export interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  venue: string;
  ticketType: string;
  image: string;
  status: 'upcoming' | 'past';
  description: string;
  promoPhotos: string[];
  merchandise: MerchandiseItem[];
  ticketPrice: number;
  artistInfo: string;
  duration: string;
  ticketQuantity?: number; // Add this new field
}

export interface MerchandiseItem {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

export const upcomingEvents: Event[] = [
  {
    id: '1',
    name: 'aMEI ASMR 世界巡演',
    date: 'December 15, 2024',
    time: '8:00 PM',
    venue: '台北大巨蛋',
    ticketType: 'VIP',
    image: 'https://res.klook.com/image/upload/v1670819982/zcuus1washxpnahgwsxz.jpg',
    status: 'upcoming',
    description: 'Join aMEI for an unforgettable ASMR world tour experience at the iconic Taipei Dome. This unique concert combines her powerful vocals with immersive ASMR elements, creating a one-of-a-kind sensory journey that will captivate all your senses.',
    promoPhotos: [
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=800&h=600&fit=crop'
    ],
    merchandise: [
      {
        id: 'm1',
        name: 'aMEI ASMR Tour T-Shirt',
        price: 1200,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
        description: 'Official tour merchandise with holographic design'
      },
      {
        id: 'm2',
        name: 'Concert Poster',
        price: 800,
        image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
        description: 'Limited edition signed poster'
      }
    ],
    ticketPrice: 3500,
    artistInfo: 'aMEI is one of Taiwan\'s most iconic singers, known for her powerful voice and innovative performances.',
    duration: '3 hours',
    ticketQuantity: 2
  },
  {
    id: '2',
    name: 'BLACKPINK WORLD TOUR ＜DEADLINE＞',
    date: 'December 22, 2024',
    time: '9:00 PM',
    venue: 'Kaohsiung National Stadium',
    ticketType: 'GA',
    image: 'https://static.tixcraft.com/images/activity/25_blackpink_8a9d32f4f90351e8152527c74c8104aa.jpg',
    status: 'upcoming',
    description: 'BLACKPINK returns with their most explosive world tour yet! Experience the global phenomenon live as they perform their biggest hits and new tracks in an unforgettable show filled with cutting-edge visuals and choreography.',
    promoPhotos: [
      'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&h=600&fit=crop'
    ],
    merchandise: [
      {
        id: 'm3',
        name: 'BLACKPINK Lightstick',
        price: 2500,
        image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=400&fit=crop',
        description: 'Official concert lightstick with LED effects'
      },
      {
        id: 'm4',
        name: 'Tour Hoodie',
        price: 2800,
        image: 'https://images.unsplash.com/photo-1556821840-3a9c6e1fcb84?w=400&h=400&fit=crop',
        description: 'Premium quality hoodie with tour dates'
      }
    ],
    ticketPrice: 4200,
    artistInfo: 'BLACKPINK is the biggest K-pop girl group in the world, breaking records and barriers globally.',
    duration: '2.5 hours',
    ticketQuantity: 3
  },
  {
    id: '3',
    name: 'ONEREPUBLIC 2025 LIVE',
    date: 'January 10, 2025',
    time: '7:30 PM',
    venue: 'K-Arena',
    ticketType: 'Premium',
    image: 'https://static.tixcraft.com/images/activity/25_1rkhh_9ad765114964bcecbef2c6708102c619.jpg',
    status: 'upcoming',
    description: 'OneRepublic brings their electrifying live performance to K-Arena. Experience their chart-topping hits and new material in an intimate venue setting.',
    promoPhotos: [
      'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=800&h=600&fit=crop'
    ],
    merchandise: [
      {
        id: 'm5',
        name: 'OneRepublic Vinyl',
        price: 1500,
        image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
        description: 'Limited edition vinyl record'
      }
    ],
    ticketPrice: 2800,
    artistInfo: 'OneRepublic is known for their anthemic pop-rock sound and incredible live performances.',
    duration: '2 hours',
    ticketQuantity: 1
  },
  {
    id: '4',
    name: 'Energy ALL IN 全面進擊',
    date: 'January 25, 2025',
    time: '8:30 PM',
    venue: '高雄巨蛋',
    ticketType: 'VIP',
    image: 'https://static.tixcraft.com/images/activity/25_energykh_f2b38c3efea6cdbf75ff0b04f71221b0.jpg',
    status: 'upcoming',
    description: 'Energy returns with their most energetic performance yet! Get ready for non-stop entertainment and high-energy performances.',
    promoPhotos: [
      'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&h=600&fit=crop'
    ],
    merchandise: [
      {
        id: 'm6',
        name: 'Energy Band Tee',
        price: 1000,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
        description: 'Classic band t-shirt design'
      }
    ],
    ticketPrice: 3200,
    artistInfo: 'Energy is one of Taiwan\'s most beloved boy bands with decades of hits.',
    duration: '2.5 hours'
  },
  {
    id: '5',
    name: 'Dua Lipa',
    date: 'February 8, 2025',
    time: '9:30 PM',
    venue: 'Holographic Theater',
    ticketType: 'GA',
    image: 'https://cdn.prgloo.com/media/a20bad0aa6ce454582961777ccbb6354.jpg?width=968&height=1452',
    status: 'upcoming',
    description: 'Dua Lipa brings her futuristic pop spectacle to the revolutionary Holographic Theater. Experience music like never before with cutting-edge holographic technology.',
    promoPhotos: [
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=800&h=600&fit=crop'
    ],
    merchandise: [
      {
        id: 'm7',
        name: 'Holographic Poster',
        price: 1800,
        image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
        description: 'Interactive holographic poster'
      }
    ],
    ticketPrice: 3800,
    artistInfo: 'Dua Lipa is a global pop sensation known for her danceable hits and stunning performances.',
    duration: '2 hours'
  },
  {
    id: '6',
    name: 'Bruno Mars',
    date: 'February 20, 2025',
    time: '6:00 PM',
    venue: 'Matrix Amphitheater',
    ticketType: 'Premium',
    image: 'https://blog.myvideo.net.tw/wp-content/uploads/2024/06/24_brunomars_70fcd73cd1520c17b09.webp',
    status: 'upcoming',
    description: 'Bruno Mars brings his legendary showmanship to the Matrix Amphitheater. Prepare for an evening of funk, soul, and pure entertainment.',
    promoPhotos: [
      'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=800&h=600&fit=crop'
    ],
    merchandise: [
      {
        id: 'm8',
        name: 'Bruno Mars Hat',
        price: 1500,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
        description: 'Signature fedora hat'
      }
    ],
    ticketPrice: 4500,
    artistInfo: 'Bruno Mars is a multi-Grammy winning artist known for his incredible live performances.',
    duration: '2.5 hours'
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
    status: 'past',
    description: 'An incredible past performance by aMEI that showcased her amazing vocal range and stage presence.',
    promoPhotos: [
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop'
    ],
    merchandise: [],
    ticketPrice: 3500,
    artistInfo: 'aMEI delivered an unforgettable performance.',
    duration: '3 hours'
  },
  {
    id: '8',
    name: 'BTS',
    date: 'November 3, 2024',
    time: '9:00 PM',
    venue: 'Underground Club',
    ticketType: 'GA',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop',
    status: 'past',
    description: 'A memorable BTS performance that fans will never forget.',
    promoPhotos: [],
    merchandise: [],
    ticketPrice: 4000,
    artistInfo: 'BTS brought their amazing energy to the intimate venue.',
    duration: '2.5 hours'
  },
  {
    id: '9',
    name: 'Ariana Grande',
    date: 'October 28, 2024',
    time: '7:00 PM',
    venue: 'Steel Stadium',
    ticketType: 'Premium',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
    status: 'past',
    description: 'Ariana Grande delivered a powerful vocal performance.',
    promoPhotos: [],
    merchandise: [],
    ticketPrice: 3200,
    artistInfo: 'Ariana showcased her incredible range.',
    duration: '2 hours'
  },
  {
    id: '10',
    name: 'Ed Sheeran',
    date: 'October 12, 2024',
    time: '10:00 PM',
    venue: 'Glow Garden',
    ticketType: 'VIP',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
    status: 'past',
    description: 'An intimate acoustic performance by Ed Sheeran.',
    promoPhotos: [],
    merchandise: [],
    ticketPrice: 2800,
    artistInfo: 'Ed performed his greatest hits acoustically.',
    duration: '2.5 hours'
  },
  {
    id: '11',
    name: 'Olivia Rodrigo',
    date: 'September 25, 2024',
    time: '8:30 PM',
    venue: 'Digital Concert Hall',
    ticketType: 'GA',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop',
    status: 'past',
    description: 'Olivia Rodrigo\'s emotional performance touched hearts.',
    promoPhotos: [],
    merchandise: [],
    ticketPrice: 2500,
    artistInfo: 'Olivia connected deeply with her audience.',
    duration: '1.5 hours'
  },
  {
    id: '12',
    name: 'Post Malone',
    date: 'September 10, 2024',
    time: '9:15 PM',
    venue: 'Code Lounge',
    ticketType: 'Premium',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
    status: 'past',
    description: 'Post Malone brought his unique style to Code Lounge.',
    promoPhotos: [],
    merchandise: [],
    ticketPrice: 3000,
    artistInfo: 'Post Malone performed his chart-topping hits.',
    duration: '2 hours'
  }
];
