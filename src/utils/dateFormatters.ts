import { format } from 'date-fns';

// Format timestamp to "December 15, 2024"
export const formatEventDate = (timestamp: string): string => {
  if (!timestamp) return '-';
  const date = new Date(timestamp);
  if (isNaN(date.getTime())) return '-';
  return format(date, 'MMMM dd, yyyy');
};

// Format timestamp to "8:00 PM"
export const formatEventTime = (timestamp: string): string => {
  if (!timestamp) return '-';
  const date = new Date(timestamp);
  if (isNaN(date.getTime())) return '-';
  return format(date, 'h:mm a');
};

// Convert minutes to "2 hours" or "90 minutes"
export const formatDuration = (minutes: number): string => {
  if (minutes < 60) return `${minutes} minutes`;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (remainingMinutes === 0) return `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
  return `${hours}h ${remainingMinutes}m`;
};
