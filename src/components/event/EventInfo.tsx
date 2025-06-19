
import React from 'react';
import { Calendar, Clock, MapPin, User } from 'lucide-react';
import { Event } from '@/data/eventsData';

interface EventInfoProps {
  event: Event;
}

const EventInfo = ({ event }: EventInfoProps) => {
  return (
    <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Event Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-cyan-400" />
            <div>
              <p className="text-sm text-gray-400">Date</p>
              <p className="text-white font-medium">{event.date}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Clock className="w-5 h-5 text-purple-400" />
            <div>
              <p className="text-sm text-gray-400">Time & Duration</p>
              <p className="text-white font-medium">{event.time} • {event.duration}</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <MapPin className="w-5 h-5 text-green-400" />
            <div>
              <p className="text-sm text-gray-400">Venue</p>
              <p className="text-white font-medium">{event.venue}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <User className="w-5 h-5 text-yellow-400" />
            <div>
              <p className="text-sm text-gray-400">Artist Info</p>
              <p className="text-white font-medium">{event.ticketType} • ${event.ticketPrice}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-3">About the Event</h3>
        <p className="text-gray-300 leading-relaxed">{event.description}</p>
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-3">Artist Information</h3>
        <p className="text-gray-300">{event.artistInfo}</p>
      </div>
    </div>
  );
};

export default EventInfo;
