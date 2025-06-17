
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
    name: 'Blackpink',
    date: 'December 22, 2024',
    time: '9:00 PM',
    venue: 'Neo Tokyo Hall',
    ticketType: 'GA',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop',
    status: 'upcoming'
  },
  {
    id: '3',
    name: 'The Weeknd',
    date: 'January 10, 2025',
    time: '7:30 PM',
    venue: 'Digital Dome',
    ticketType: 'Premium',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
    status: 'upcoming'
  },
  {
    id: '4',
    name: 'Billie Eilish',
    date: 'January 25, 2025',
    time: '8:30 PM',
    venue: 'Neon Coliseum',
    ticketType: 'VIP',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
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
    name: 'Taylor Swift',
    date: 'November 15, 2024',
    time: '8:00 PM',
    venue: 'Vintage Venue',
    ticketType: 'VIP',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
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
