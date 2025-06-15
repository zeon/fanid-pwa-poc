
import React from 'react';

interface ScanCompletionProps {
  scanComplete: boolean;
}

const ScanCompletion = ({ scanComplete }: ScanCompletionProps) => {
  if (!scanComplete) return null;

  return (
    <div className="text-center">
      <p className="text-green-400 text-sm mb-4">
        Redirecting to dashboard...
      </p>
      <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
    </div>
  );
};

export default ScanCompletion;
