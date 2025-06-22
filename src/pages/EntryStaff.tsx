
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import QRScannerView from '@/components/entry/QRScannerView';
import QRScanSuccess from '@/components/entry/QRScanSuccess';
import { useQRScanning } from '@/hooks/useQRScanning';

const EntryStaff = () => {
  const { isScanning, scanResult, startScanning, confirmEntry, resetScanner } = useQRScanning();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="p-6 border-b border-gray-700">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="outline" size="sm" className="border-gray-600 text-gray-400 hover:bg-gray-700">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Entry Staff Portal
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          {scanResult ? (
            <QRScanSuccess 
              scanResult={scanResult}
              onConfirm={confirmEntry}
              onReset={resetScanner}
            />
          ) : (
            <QRScannerView 
              isScanning={isScanning}
              onStartScanning={startScanning}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default EntryStaff;
