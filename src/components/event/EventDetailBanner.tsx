
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface EventDetailBannerProps {
  image: string;
  title: string;
}

const EventDetailBanner = ({ image, title }: EventDetailBannerProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="relative h-80 overflow-hidden">
      <img 
        src={image} 
        alt={title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
      
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 flex items-center space-x-2 bg-gray-800/80 backdrop-blur-sm border border-gray-600 rounded-lg px-3 py-2 text-white hover:bg-gray-700/80 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">{t('events.eventDetail.banner.back')}</span>
      </button>

      <div className="absolute bottom-8 left-8 right-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          {title}
        </h1>
      </div>
    </div>
  );
};

export default EventDetailBanner;
