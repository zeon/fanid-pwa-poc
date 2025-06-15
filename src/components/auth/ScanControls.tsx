
import React from 'react';
import { Camera } from 'lucide-react';
import CyberpunkButton from './CyberpunkButton';

interface ScanControlsProps {
  isScanning: boolean;
  scanComplete: boolean;
  stream: MediaStream | null;
  onStartScan: () => void;
  onSkip: () => void;
}

const ScanControls = ({ 
  isScanning, 
  scanComplete, 
  stream, 
  onStartScan
}: ScanControlsProps) => {
  if (isScanning || scanComplete || !stream) return null;

  return (
    <div>
      <CyberpunkButton 
        onClick={onStartScan}
        variant="primary"
        className="w-full flex items-center justify-center gap-2"
      >
        <Camera size={20} />
        Start Face Scan
      </CyberpunkButton>
    </div>
  );
};

export default ScanControls;
