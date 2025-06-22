
import { useState, useRef } from 'react';

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
  const scanCountRef = useRef(0);

  // Demo ticket data for simulation
  const demoTickets = [
    {
      eventName: "aMEI ASMR 世界巡演",
      holderName: "Alex Chen",
      ticketType: "VIP Front Row",
      venue: "台北大巨蛋",
      date: "2024-07-15",
      time: "19:30",
      entriesAllowed: 4
    },
    {
      eventName: "Ed Sheeran Live",
      holderName: "Alex Chen",
      ticketType: "General Admission",
      venue: "Wembley Stadium",
      date: "2024-08-20",
      time: "20:00",
      entriesAllowed: 2
    },
    {
      eventName: "Coldplay World Tour",
      holderName: "Alex Chen",
      ticketType: "Premium Seating",
      venue: "O2 Arena",
      date: "2024-09-10",
      time: "19:00",
      entriesAllowed: 1
    },
    {
      eventName: "BLACKPINK WORLD TOUR",
      holderName: "Alex Chen",
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
      // Alternating success/failure: odd counts succeed, even counts fail
      scanCountRef.current += 1;
      const isSuccess = scanCountRef.current % 2 === 1;
      
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
