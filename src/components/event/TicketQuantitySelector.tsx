import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Minus, Plus } from 'lucide-react';

interface TicketQuantitySelectorProps {
  quantity: number;
  onChange: (qty: number) => void;
  maxQuantity: number;
  availableTickets: number;
}

const TicketQuantitySelector = ({ 
  quantity, 
  onChange, 
  maxQuantity,
  availableTickets 
}: TicketQuantitySelectorProps) => {
  const effectiveMax = Math.min(maxQuantity, availableTickets);
  
  const handleIncrement = () => {
    if (quantity < effectiveMax) {
      onChange(quantity + 1);
    }
  };
  
  const handleDecrement = () => {
    if (quantity > 1) {
      onChange(quantity - 1);
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= effectiveMax) {
      onChange(value);
    }
  };
  
  return (
    <div className="flex items-center gap-3">
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={handleDecrement}
        disabled={quantity <= 1}
        className="h-10 w-10"
      >
        <Minus className="h-4 w-4" />
      </Button>
      
      <Input
        type="number"
        value={quantity}
        onChange={handleInputChange}
        min={1}
        max={effectiveMax}
        className="w-20 text-center"
      />
      
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={handleIncrement}
        disabled={quantity >= effectiveMax}
        className="h-10 w-10"
      >
        <Plus className="h-4 w-4" />
      </Button>
      
      <span className="text-sm text-muted-foreground">
        Max: {effectiveMax}
      </span>
    </div>
  );
};

export default TicketQuantitySelector;
