
import React from 'react';

interface ScanInstructionsProps {
  scanComplete: boolean;
  isScanning: boolean;
}

const ScanInstructions = ({ scanComplete, isScanning }: ScanInstructionsProps) => {
  return (
    <div className="text-center space-y-2">
      <p className="text-gray-300">
        {scanComplete 
          ? 'Face scan completed successfully!'
          : isScanning 
            ? 'Hold still while we scan your face...'
            : 'Position your face within the circle and click "Start Scan"'
        }
      </p>
      {!scanComplete && !isScanning && (
        <p className="text-gray-400 text-sm">
          This helps secure your account and enables biometric login
        </p>
      )}
    </div>
  );
};

export default ScanInstructions;
