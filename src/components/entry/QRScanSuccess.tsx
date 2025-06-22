
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, User, Calendar, MapPin } from 'lucide-react';

interface ScanResult {
  success: boolean;
  ticketData: {
    eventName: string;
    holderName: string;
    ticketType: string;
    venue: string;
    date: string;
    time: string;
  };
}

interface QRScanSuccessProps {
  scanResult: ScanResult;
  onConfirm: () => void;
  onReset: () => void;
}

const QRScanSuccess = ({ scanResult, onConfirm, onReset }: QRScanSuccessProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-white mb-2">Scan Successful!</h2>
        <p className="text-gray-400">Ticket verified and ready for entry</p>
      </div>

      <Card className="bg-gray-800/80 backdrop-blur-sm border-gray-700 max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-white">Ticket Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <User className="w-5 h-5 text-cyan-400" />
              <div>
                <p className="text-sm text-gray-400">Ticket Holder</p>
                <p className="text-white font-medium">{scanResult.ticketData.holderName}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-purple-400" />
              <div>
                <p className="text-sm text-gray-400">Event</p>
                <p className="text-white font-medium">{scanResult.ticketData.eventName}</p>
                <p className="text-sm text-gray-300">{scanResult.ticketData.date} • {scanResult.ticketData.time}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-pink-400" />
              <div>
                <p className="text-sm text-gray-400">Venue & Ticket Type</p>
                <p className="text-white font-medium">{scanResult.ticketData.venue}</p>
                <p className="text-sm text-gray-300">{scanResult.ticketData.ticketType}</p>
              </div>
            </div>
          </div>

          <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-3 text-center">
            <p className="text-green-400 font-medium">✓ ENTRY AUTHORIZED</p>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <Button 
          onClick={onConfirm}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold"
        >
          Confirm Entry
        </Button>
        <Button 
          onClick={onReset}
          variant="outline"
          className="flex-1 border-gray-600 text-gray-400 hover:bg-gray-700"
        >
          Scan Next
        </Button>
      </div>
    </div>
  );
};

export default QRScanSuccess;
