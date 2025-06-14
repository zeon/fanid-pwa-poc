
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CyberpunkButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  className?: string;
}

const CyberpunkButton = ({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary',
  disabled = false,
  className 
}: CyberpunkButtonProps) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "relative w-full h-12 font-bold uppercase tracking-wide text-sm",
        "transition-all duration-300 transform",
        "hover:scale-105 active:scale-95",
        variant === 'primary' && [
          "bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400",
          "text-white shadow-lg shadow-cyan-500/25",
          "hover:shadow-xl hover:shadow-cyan-500/40"
        ],
        variant === 'secondary' && [
          "bg-gray-700 hover:bg-gray-600 border border-gray-600",
          "text-gray-300 hover:text-white",
          "hover:border-gray-500"
        ],
        disabled && "opacity-50 cursor-not-allowed hover:scale-100",
        className
      )}
    >
      <span className="relative z-10">{children}</span>
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-md blur animate-pulse"></div>
      )}
    </Button>
  );
};

export default CyberpunkButton;
