
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { QrCode, Camera } from 'lucide-react';

interface QRScannerViewProps {
  isScanning: boolean;
  onStartScanning: () => void;
}

const QRScannerView = ({ isScanning, onStartScanning }: QRScannerViewProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <QrCode className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-white mb-2">QR Code Scanner</h2>
        <p className="text-gray-400">Scan visitor tickets for entry verification</p>
      </div>

      <Card className="bg-gray-800/80 backdrop-blur-sm border-gray-700 max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-white">Camera Scanner</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Camera View Simulation */}
          <div className="relative bg-black rounded-lg aspect-square flex items-center justify-center">
            {isScanning ? (
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Scanning Animation */}
                <div className="absolute inset-4 border-2 border-cyan-400 rounded-lg">
                  <div className="absolute inset-0 border border-cyan-400/30 rounded-lg animate-pulse"></div>
                  <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-cyan-400 animate-pulse"></div>
                </div>
                <div className="text-cyan-400 text-center">
                  <Camera className="w-8 h-8 mx-auto mb-2 animate-pulse" />
                  <p className="text-sm">Scanning for QR code...</p>
                </div>
              </div>
            ) : (
              <div className="text-gray-500 text-center">
                <Camera className="w-12 h-12 mx-auto mb-2" />
                <p>Camera Ready</p>
                <p className="text-xs mt-1">Tap to start scanning</p>
              </div>
            )}
          </div>

          <Button 
            onClick={onStartScanning}
            disabled={isScanning}
            className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 disabled:opacity-50"
          >
            {isScanning ? 'Scanning...' : 'Start Scanning'}
          </Button>
        </CardContent>
      </Card>

      <div className="text-center text-sm text-gray-400">
        <p>Position the QR code within the scanning area</p>
        <p>The system will automatically detect and verify the ticket</p>
      </div>
    </div>
  );
};

export default QRScannerView;
