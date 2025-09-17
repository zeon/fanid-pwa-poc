import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Smooth scroll to top with acceleration
  const scrollToTop = () => {
    const startPosition = window.pageYOffset;
    const distance = startPosition;
    const duration = Math.min(1200, Math.abs(distance) * 0.8); // Max 1.2s, adaptive based on distance
    
    let start: number | null = null;
    
    function smoothScroll(timestamp: number) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const percentage = Math.min(progress / duration, 1);
      
      // Easing function with acceleration - more aggressive than navbar
      const easeInOutQuart = percentage < 0.5 
        ? 8 * percentage * percentage * percentage * percentage
        : 1 - Math.pow(-2 * percentage + 2, 4) / 2;
      
      window.scrollTo({
        top: startPosition - distance * easeInOutQuart,
        behavior: 'auto'
      });
      
      if (progress < duration) {
        requestAnimationFrame(smoothScroll);
      }
    }
    
    requestAnimationFrame(smoothScroll);
  };

  return (
    <>
      {isVisible && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 animate-fade-in"
          size="sm"
        >
          <ChevronUp className="h-6 w-6" />
        </Button>
      )}
    </>
  );
};

export default ScrollToTopButton;