
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AlertTriangle, RotateCcw } from 'lucide-react';
import AuthLayout from '@/components/auth/AuthLayout';
import CyberpunkButton from '@/components/auth/CyberpunkButton';

const FaceDuplicateDetected = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get user data from navigation state
  const userData = location.state || {};

  const handleRescan = () => {
    navigate('/face-scanning', { 
      state: { 
        ...userData,
        isRescan: true // Flag to indicate this is a re-scan attempt
      }
    });
  };

  return (
    <AuthLayout 
      title="DUPLICATE DETECTED" 
      subtitle="Similar face data found in our system"
    >
      <div className="space-y-6 text-center">
        {/* Warning Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center animate-pulse">
              <AlertTriangle className="text-white" size={48} />
            </div>
            <div className="absolute -inset-2 bg-gradient-to-r from-orange-400/30 to-red-400/30 rounded-full blur-md animate-pulse"></div>
          </div>
        </div>

        {/* Warning Message */}
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-orange-400">
            Duplicate Face Data Detected
          </h3>
          <p className="text-gray-300 text-sm">
            Our system has detected similar biometric data already exists in our database.
          </p>
          <p className="text-gray-400 text-xs">
            This could be due to lighting conditions or positioning. Please try scanning again.
          </p>
        </div>

        {/* Security Notice */}
        <div className="bg-gray-700/50 rounded-lg p-4 space-y-2">
          <div className="flex items-center justify-center gap-2 text-orange-400 text-sm">
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
            <span>Security verification required</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-yellow-400 text-sm">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            <span>Re-scan recommended for accuracy</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4">
          <CyberpunkButton 
            onClick={handleRescan}
            variant="primary"
            size="lg"
            className="w-full flex items-center justify-center gap-2"
          >
            <RotateCcw size={20} />
            Re-scan Face
          </CyberpunkButton>
        </div>

        {/* Help Text */}
        <p className="text-gray-500 text-xs mt-6">
          For best results, ensure good lighting and look directly at the camera
        </p>
      </div>
    </AuthLayout>
  );
};

export default FaceDuplicateDetected;
