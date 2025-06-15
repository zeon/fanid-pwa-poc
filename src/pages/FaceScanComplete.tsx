
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import AuthLayout from '@/components/auth/AuthLayout';
import CyberpunkButton from '@/components/auth/CyberpunkButton';

const FaceScanComplete = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get user data from navigation state
  const userData = location.state || {};

  const handleContinueToDashboard = () => {
    navigate('/dashboard', { 
      state: { 
        ...userData,
        faceScanned: true,
        message: 'Account created successfully! Face scan completed.'
      }
    });
  };

  return (
    <AuthLayout 
      title="SCAN COMPLETE" 
      subtitle="Your biometric profile has been successfully created"
    >
      <div className="space-y-6 text-center">
        {/* Success Animation */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center animate-pulse">
              <Check className="text-white" size={48} />
            </div>
            <div className="absolute -inset-2 bg-gradient-to-r from-green-400/30 to-emerald-400/30 rounded-full blur-md animate-pulse"></div>
          </div>
        </div>

        {/* Success Message */}
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-green-400">
            Biometric Setup Complete!
          </h3>
          <p className="text-gray-300 text-sm">
            Your face has been successfully scanned and your biometric profile is now active.
          </p>
          <p className="text-gray-400 text-xs">
            You can now use face recognition to securely access your account.
          </p>
        </div>

        {/* Security Features */}
        <div className="bg-gray-700/50 rounded-lg p-4 space-y-2">
          <div className="flex items-center justify-center gap-2 text-cyan-400 text-sm">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <span>Biometric authentication enabled</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-green-400 text-sm">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Account security enhanced</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-purple-400 text-sm">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            <span>Fast login experience activated</span>
          </div>
        </div>

        {/* Continue Button */}
        <div className="pt-4">
          <CyberpunkButton 
            onClick={handleContinueToDashboard}
            variant="primary"
            size="lg"
            className="w-full flex items-center justify-center gap-2"
          >
            Continue to Dashboard
            <ArrowRight size={20} />
          </CyberpunkButton>
        </div>
      </div>
    </AuthLayout>
  );
};

export default FaceScanComplete;
