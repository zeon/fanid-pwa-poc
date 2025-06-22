
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ExternalLink } from 'lucide-react';

interface TixcraftPermissionGrantedProps {
  eventId: string;
}

const TixcraftPermissionGranted = ({ eventId }: TixcraftPermissionGrantedProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate(`/tixcraft/${eventId}`);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [eventId, navigate]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="max-w-md mx-auto p-6 text-center space-y-6">
        <div className="w-16 h-16 mx-auto bg-green-500/20 rounded-full flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-green-400" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-green-400">
            {t('tixcraft.permissionGranted.title')}
          </h1>
          <p className="text-gray-300">
            {t('tixcraft.permissionGranted.description')}
          </p>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-center space-x-2 text-cyan-400 mb-2">
            <ExternalLink className="w-4 h-4" />
            <span className="font-semibold">TIXCRAFT</span>
          </div>
          <p className="text-sm text-gray-400">
            {t('tixcraft.permissionGranted.redirecting', { seconds: countdown })}
          </p>
        </div>

        <div className="w-full bg-gray-800 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
            style={{ width: `${((3 - countdown) / 3) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default TixcraftPermissionGranted;
