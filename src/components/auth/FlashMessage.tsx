import React, { useEffect, useState } from 'react';
import { X, CheckCircle, Info, AlertCircle } from 'lucide-react';

interface FlashMessageProps {
  message: string;
  type?: 'success' | 'info' | 'warning' | 'error';
  onDismiss: () => void;
  duration?: number;
}

const FlashMessage = ({ message, type = 'success', onDismiss, duration = 7000 }: FlashMessageProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Slide in animation
    setTimeout(() => setIsVisible(true), 10);

    // Auto dismiss
    const timer = setTimeout(() => {
      handleDismiss();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => onDismiss(), 300); // Wait for slide-out animation
  };

  const icons = {
    success: <CheckCircle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />,
    warning: <AlertCircle className="w-5 h-5" />,
    error: <AlertCircle className="w-5 h-5" />
  };

  const styles = {
    success: 'from-cyan-500/20 to-purple-500/20 border-cyan-400/50 text-cyan-400',
    info: 'from-blue-500/20 to-cyan-500/20 border-blue-400/50 text-blue-400',
    warning: 'from-yellow-500/20 to-orange-500/20 border-yellow-400/50 text-yellow-400',
    error: 'from-red-500/20 to-pink-500/20 border-red-400/50 text-red-400'
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
      role="alert"
      aria-live="polite"
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className={`relative bg-gradient-to-r ${styles[type]} backdrop-blur-sm border rounded-lg shadow-lg`}>
          <div className="flex items-center gap-3 p-4">
            <div className={styles[type].split(' ').pop()}>
              {icons[type]}
            </div>
            <p className="flex-1 text-sm text-white font-medium">
              {message}
            </p>
            <button
              onClick={handleDismiss}
              className="text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded"
              aria-label="Dismiss message"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800/50 rounded-b-lg overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r ${styles[type].split(' ')[0]} ${styles[type].split(' ')[1]}`}
              style={{
                animation: `shrink ${duration}ms linear forwards`
              }}
            />
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
};

export default FlashMessage;
