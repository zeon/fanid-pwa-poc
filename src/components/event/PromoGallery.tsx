
import React from 'react';
import { useTranslation } from 'react-i18next';

interface PromoGalleryProps {
  photos: string[];
  eventName: string;
}

const PromoGallery = ({ photos, eventName }: PromoGalleryProps) => {
  const { t } = useTranslation();

  if (!photos || photos.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
      <h2 className="text-2xl font-bold text-white mb-6">{t('events.eventDetail.gallery.title')}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {photos.map((photo, index) => (
          <div 
            key={index}
            className="group relative overflow-hidden rounded-lg aspect-video bg-gray-700"
          >
            <img 
              src={photo} 
              alt={`${eventName} ${t('events.eventDetail.gallery.photoAlt')} ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromoGallery;
