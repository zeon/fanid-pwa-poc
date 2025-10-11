import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { formatEventDate, formatEventTime, formatDuration } from '@/utils/dateFormatters';

interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  venue: string;
  image: string;
  status: 'upcoming' | 'past';
  description: string;
  artistInfo: string;
  duration: string;
  ticketType: string;
  ticketPrice: number;
  promoPhotos: string[];
  merchandise: any[];
}

interface Ticket {
  id: string;
  name: string;
  description: string | null;
  price: number;
  quantity: number;
  sold: number;
  available: number;
}

// Transform database event to UI format
const transformEvent = (dbEvent: any): Event => ({
  id: dbEvent.id,
  name: dbEvent.name,
  date: formatEventDate(dbEvent.start_date),
  time: formatEventTime(dbEvent.start_date),
  venue: dbEvent.venue,
  image: dbEvent.thumbnail_url,
  status: dbEvent.status === 'active' ? 'upcoming' : 'past',
  description: dbEvent.description,
  artistInfo: dbEvent.artists,
  duration: formatDuration(dbEvent.duration),
  ticketType: 'Multiple',
  ticketPrice: 0,
  promoPhotos: [],
  merchandise: [],
});

// Fetch all events, optionally filtered by status
export const useEvents = (status?: 'active' | 'inactive') => {
  return useQuery({
    queryKey: ['events', status],
    queryFn: async () => {
      let query = supabase
        .from('events')
        .select('*')
        .order('start_date', { ascending: false });

      if (status) {
        query = query.eq('status', status);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data.map(transformEvent);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Fetch single event by ID
export const useEvent = (eventId: string | undefined) => {
  return useQuery({
    queryKey: ['events', eventId],
    queryFn: async () => {
      if (!eventId) throw new Error('Event ID is required');

      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', eventId)
        .single();

      if (error) throw error;
      return transformEvent(data);
    },
    enabled: !!eventId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Fetch all active tickets for a specific event
export const useEventTickets = (eventId: string | undefined) => {
  return useQuery({
    queryKey: ['events', eventId, 'tickets'],
    queryFn: async () => {
      if (!eventId) throw new Error('Event ID is required');

      const { data, error } = await supabase
        .from('tickets')
        .select('*')
        .eq('event_id', eventId)
        .eq('status', 'active')
        .order('price', { ascending: true });

      if (error) throw error;

      return data.map((ticket): Ticket => ({
        id: ticket.id,
        name: ticket.name,
        description: ticket.description,
        price: Number(ticket.price),
        quantity: ticket.quantity,
        sold: ticket.sold,
        available: ticket.quantity - ticket.sold,
      }));
    },
    enabled: !!eventId,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};
