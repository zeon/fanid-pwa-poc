
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

interface CyberpunkCheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label: string;
  error?: string;
  className?: string;
}

const CyberpunkCheckbox = ({
  checked,
  onCheckedChange,
  label,
  error,
  className
}: CyberpunkCheckboxProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-start space-x-3">
        <div className="relative mt-1">
          <Checkbox
            checked={checked}
            onCheckedChange={onCheckedChange}
            className={cn(
              "border-gray-600 data-[state=checked]:bg-cyan-400 data-[state=checked]:border-cyan-400",
              "focus:ring-cyan-400/20 focus:ring-2",
              "transition-all duration-300",
              "hover:border-gray-500",
              error && "border-red-500",
              className
            )}
          />
          {/* Cyberpunk corner accents */}
          <div className="absolute -top-1 -left-1 w-2 h-2 border-l border-t border-cyan-400 opacity-30"></div>
          <div className="absolute -top-1 -right-1 w-2 h-2 border-r border-t border-cyan-400 opacity-30"></div>
          <div className="absolute -bottom-1 -left-1 w-2 h-2 border-l border-b border-cyan-400 opacity-30"></div>
          <div className="absolute -bottom-1 -right-1 w-2 h-2 border-r border-b border-cyan-400 opacity-30"></div>
        </div>
        <label className="text-gray-300 text-sm cursor-pointer leading-5">
          {label}
        </label>
      </div>
      {error && (
        <p className="text-red-400 text-xs mt-1 font-medium ml-7">{error}</p>
      )}
    </div>
  );
};

export default CyberpunkCheckbox;
