
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface CyberpunkInputProps {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  className?: string;
  maxLength?: number;
  rightIcon?: React.ReactNode;
  icon?: React.ReactNode;
}

const CyberpunkInput = ({ 
  label, 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  error,
  className,
  maxLength,
  rightIcon,
  icon
}: CyberpunkInputProps) => {
  return (
    <div className="space-y-2">
      <Label className="text-cyan-400 text-sm font-medium uppercase tracking-wide flex items-center gap-2">
        {icon && <span className="text-cyan-400">{icon}</span>}
        {label}
      </Label>
      <div className="relative">
        <Input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          className={cn(
            "bg-gray-900/50 border-gray-600 text-white placeholder-gray-500",
            "focus:border-cyan-400 focus:ring-cyan-400/20 focus:ring-2",
            "transition-all duration-300",
            "hover:border-gray-500",
            rightIcon && "pr-12",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
            className
          )}
        />
        {rightIcon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {rightIcon}
          </div>
        )}
        {/* Cyberpunk corner accents */}
        <div className="absolute top-0 left-0 w-2 h-2 border-l-2 border-t-2 border-cyan-400 opacity-50"></div>
        <div className="absolute top-0 right-0 w-2 h-2 border-r-2 border-t-2 border-cyan-400 opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-2 h-2 border-l-2 border-b-2 border-cyan-400 opacity-50"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 border-r-2 border-b-2 border-cyan-400 opacity-50"></div>
      </div>
      {error && (
        <p className="text-red-400 text-xs mt-1 font-medium">{error}</p>
      )}
    </div>
  );
};

export default CyberpunkInput;
