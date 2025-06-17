
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
    name: 'Neon Nights Festival',
    date: 'December 15, 2024',
    time: '8:00 PM',
    venue: 'Cyber Arena',
    ticketType: 'VIP',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop',
    status: 'upcoming'
  },
  {
    id: '2',
    name: 'Cyberpunk Arena',
    date: 'December 22, 2024',
    time: '9:00 PM',
    venue: 'Neo Tokyo Hall',
    ticketType: 'GA',
    image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=800&h=600&fit=crop',
    status: 'upcoming'
  },
  {
    id: '3',
    name: 'Electric Dreams Concert',
    date: 'January 10, 2025',
    time: '7:30 PM',
    venue: 'Digital Dome',
    ticketType: 'Premium',
    image: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=800&h=600&fit=crop',
    status: 'upcoming'
  },
  {
    id: '4',
    name: 'Synthwave Spectacular',
    date: 'January 25, 2025',
    time: '8:30 PM',
    venue: 'Neon Coliseum',
    ticketType: 'VIP',
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=600&fit=crop',
    status: 'upcoming'
  },
  {
    id: '5',
    name: 'Future Bass Revolution',
    date: 'February 8, 2025',
    time: '9:30 PM',
    venue: 'Holographic Theater',
    ticketType: 'GA',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop',
    status: 'upcoming'
  },
  {
    id: '6',
    name: 'Quantum Beats Festival',
    date: 'February 20, 2025',
    time: '6:00 PM',
    venue: 'Matrix Amphitheater',
    ticketType: 'Premium',
    image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=800&h=600&fit=crop',
    status: 'upcoming'
  }
];

export const pastEvents: Event[] = [
  {
    id: '7',
    name: 'Retro Wave Nights',
    date: 'November 15, 2024',
    time: '8:00 PM',
    venue: 'Vintage Venue',
    ticketType: 'VIP',
    image: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=800&h=600&fit=crop',
    status: 'past'
  },
  {
    id: '8',
    name: 'Digital Dystopia',
    date: 'November 3, 2024',
    time: '9:00 PM',
    venue: 'Underground Club',
    ticketType: 'GA',
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=600&fit=crop',
    status: 'past'
  },
  {
    id: '9',
    name: 'Chrome City Concert',
    date: 'October 28, 2024',
    time: '7:00 PM',
    venue: 'Steel Stadium',
    ticketType: 'Premium',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop',
    status: 'past'
  },
  {
    id: '10',
    name: 'Neon Pulse Party',
    date: 'October 12, 2024',
    time: '10:00 PM',
    venue: 'Glow Garden',
    ticketType: 'VIP',
    image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=800&h=600&fit=crop',
    status: 'past'
  },
  {
    id: '11',
    name: 'Cyber Symphony',
    date: 'September 25, 2024',
    time: '8:30 PM',
    venue: 'Digital Concert Hall',
    ticketType: 'GA',
    image: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=800&h=600&fit=crop',
    status: 'past'
  },
  {
    id: '12',
    name: 'Binary Beats Bash',
    date: 'September 10, 2024',
    time: '9:15 PM',
    venue: 'Code Lounge',
    ticketType: 'Premium',
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=600&fit=crop',
    status: 'past'
  }
];
