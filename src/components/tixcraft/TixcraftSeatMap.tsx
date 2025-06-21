
import React from 'react';
import { useTranslation } from 'react-i18next';

interface TixcraftSeatMapProps {
  selectedSeats: string[];
  onSeatSelect: (seats: string[]) => void;
  maxSeats: number;
}

const TixcraftSeatMap = ({ selectedSeats, onSeatSelect, maxSeats }: TixcraftSeatMapProps) => {
  const { t } = useTranslation();

  // Generate mock seat data
  const generateSeats = () => {
    const sections = ['A', 'B', 'C', 'D'];
    const rows = Array.from({ length: 8 }, (_, i) => i + 1);
    const seatsPerRow = 12;
    
    const seats: { id: string; section: string; row: number; seat: number; available: boolean }[] = [];
    
    sections.forEach(section => {
      rows.forEach(row => {
        for (let seat = 1; seat <= seatsPerRow; seat++) {
          const seatId = `${section}${row}-${seat}`;
          // Randomly make some seats unavailable for demo purposes
          const available = Math.random() > 0.15;
          seats.push({ id: seatId, section, row, seat, available });
        }
      });
    });
    
    return seats;
  };

  const seats = generateSeats();

  const handleSeatClick = (seatId: string) => {
    const isSelected = selectedSeats.includes(seatId);
    
    if (isSelected) {
      // Remove seat from selection
      onSeatSelect(selectedSeats.filter(id => id !== seatId));
    } else if (selectedSeats.length < maxSeats) {
      // Add seat to selection
      onSeatSelect([...selectedSeats, seatId]);
    }
  };

  const getSeatClassName = (seat: { id: string; available: boolean }) => {
    if (!seat.available) {
      return 'w-6 h-6 m-0.5 bg-gray-300 cursor-not-allowed rounded-sm';
    }
    
    if (selectedSeats.includes(seat.id)) {
      return 'w-6 h-6 m-0.5 bg-blue-600 hover:bg-blue-700 cursor-pointer rounded-sm';
    }
    
    return 'w-6 h-6 m-0.5 bg-green-400 hover:bg-green-500 cursor-pointer rounded-sm';
  };

  return (
    <div className="space-y-4">
      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-400 rounded-sm"></div>
          <span>{t('tixcraft.seatLegend.available')}</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-600 rounded-sm"></div>
          <span>{t('tixcraft.seatLegend.selected')}</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gray-300 rounded-sm"></div>
          <span>{t('tixcraft.seatLegend.unavailable')}</span>
        </div>
      </div>

      {/* Stage */}
      <div className="text-center mb-6">
        <div className="bg-gray-800 text-white py-2 px-8 rounded-lg inline-block">
          {t('tixcraft.stage')}
        </div>
      </div>

      {/* Seat Map */}
      <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
        <div className="grid grid-cols-4 gap-8 min-w-max">
          {['A', 'B', 'C', 'D'].map(section => (
            <div key={section} className="text-center">
              <h3 className="font-bold mb-2 text-gray-700">{t('tixcraft.section')} {section}</h3>
              <div className="space-y-1">
                {Array.from({ length: 8 }, (_, row) => (
                  <div key={row} className="flex justify-center items-center space-x-1">
                    <span className="text-xs w-4 text-gray-500">{row + 1}</span>
                    {Array.from({ length: 12 }, (_, seatNum) => {
                      const seatId = `${section}${row + 1}-${seatNum + 1}`;
                      const seat = seats.find(s => s.id === seatId);
                      
                      return (
                        <button
                          key={seatId}
                          onClick={() => seat?.available && handleSeatClick(seatId)}
                          className={getSeatClassName(seat!)}
                          disabled={!seat?.available}
                          title={seat?.available ? seatId : t('tixcraft.seatUnavailable')}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selection Info */}
      <div className="text-sm text-gray-600">
        {t('tixcraft.seatsSelected', { selected: selectedSeats.length, max: maxSeats })}
      </div>
    </div>
  );
};

export default TixcraftSeatMap;
