
import { useState } from 'react';

interface ScanResult {
  success: boolean;
  ticketData?: {
    eventName: string;
    holderName: string;
    ticketType: string;
    venue: string;
    date: string;
    time: string;
    entriesAllowed: number;
  };
  error?: string;
}

export const useQRScanning = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);

  // Demo ticket data for simulation
  const demoTickets = [
    {
      eventName: "Taylor Swift | The Eras Tour",
      holderName: "Alex Johnson",
      ticketType: "VIP Front Row",
      venue: "Madison Square Garden",
      date: "2024-07-15",
      time: "19:30",
      entriesAllowed: 1
    },
    {
      eventName: "Ed Sheeran Live",
      holderName: "Sarah Chen",
      ticketType: "General Admission",
      venue: "Wembley Stadium",
      date: "2024-08-20",
      time: "20:00",
      entriesAllowed: 2
    },
    {
      eventName: "Coldplay World Tour",
      holderName: "Mike Rodriguez",
      ticketType: "Premium Seating",
      venue: "O2 Arena",
      date: "2024-09-10",
      time: "19:00",
      entriesAllowed: 1
    },
    {
      eventName: "BLACKPINK WORLD TOUR",
      holderName: "Emma Wilson",
      ticketType: "VIP Package",
      venue: "Kaohsiung National Stadium",
      date: "2024-12-22",
      time: "21:00",
      entriesAllowed: 3
    }
  ];

  const startScanning = () => {
    setIsScanning(true);
    
    // Simulate scanning delay (3 seconds)
    setTimeout(() => {
      // 50% chance of success vs failure
      const isSuccess = Math.random() > 0.5;
      
      if (isSuccess) {
        const randomTicket = demoTickets[Math.floor(Math.random() * demoTickets.length)];
        
        setScanResult({
          success: true,
          ticketData: randomTicket
        });
      } else {
        setScanResult({
          success: false,
          error: "Invalid QR code detected"
        });
      }
      
      setIsScanning(false);
    }, 3000);
  };

  const confirmEntry = () => {
    console.log('Entry confirmed for:', scanResult?.ticketData?.holderName);
    // Reset to scanner view for next person
    setScanResult(null);
  };

  const resetScanner = () => {
    setScanResult(null);
    setIsScanning(false);
  };

  return {
    isScanning,
    scanResult,
    startScanning,
    confirmEntry,
    resetScanner
  };
};
