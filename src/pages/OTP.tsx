import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthLayout from '@/components/auth/AuthLayout';
import CyberpunkButton from '@/components/auth/CyberpunkButton';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { ArrowLeft, RefreshCw } from 'lucide-react';

const OTP = () => {
  const [otpValue, setOtpValue] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get email from navigation state or default
  const email = location.state?.email || 'your email';
  const fromSignUp = location.state?.fromSignUp || false;

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otpValue.length !== 6) return;
    
    setIsVerifying(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('OTP verification:', { otpValue, email, fromSignUp });
      setIsVerifying(false);
      
      // Navigate based on whether this is from sign up or sign in
      if (fromSignUp) {
        // New users go to face scanning
        navigate('/face-scanning', { 
          state: { 
            email,
            fromSignUp: true
          } 
        });
      } else {
        // Existing users go directly to dashboard
        navigate('/dashboard');
      }
    }, 2000);
  };

  const handleResendOTP = () => {
    console.log('Resending OTP to:', email);
    // TODO: Implement resend OTP logic
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <AuthLayout 
      title="VERIFY CODE" 
      subtitle={`Enter the 6-digit code sent to ${email}`}
    >
      <form onSubmit={handleVerifyOTP} className="space-y-6">
        {/* Back Button */}
        <button
          type="button"
          onClick={handleGoBack}
          className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors text-sm"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        {/* OTP Input */}
        <div className="space-y-4">
          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              value={otpValue}
              onChange={setOtpValue}
              className="gap-3"
            >
              <InputOTPGroup>
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <InputOTPSlot
                    key={index}
                    index={index}
                    className="w-12 h-12 text-lg border-gray-600 bg-gray-800/50 text-white focus:border-cyan-400 focus:ring-cyan-400/20"
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>
          
          {/* Instructions */}
          <p className="text-center text-gray-400 text-sm">
            Please enter the verification code sent to your {fromSignUp ? 'registered' : ''} email address
          </p>
        </div>

        {/* Verify Button */}
        <CyberpunkButton 
          type="submit" 
          variant="primary"
          disabled={otpValue.length !== 6 || isVerifying}
        >
          {isVerifying ? (
            <>
              <RefreshCw className="mr-2 animate-spin" size={16} />
              Verifying...
            </>
          ) : (
            'Verify Code'
          )}
        </CyberpunkButton>

        {/* Resend Code */}
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-2">
            Didn't receive the code?
          </p>
          <button
            type="button"
            onClick={handleResendOTP}
            className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-medium"
          >
            Resend Code
          </button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default OTP;
