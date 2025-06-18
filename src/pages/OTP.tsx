import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AuthLayout from '@/components/auth/AuthLayout';
import CyberpunkButton from '@/components/auth/CyberpunkButton';
import TextLanguageSwitcher from '@/components/navigation/TextLanguageSwitcher';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { ArrowLeft, RefreshCw } from 'lucide-react';

const OTP = () => {
  const [otpValue, setOtpValue] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  
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
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Language switcher positioned at top right */}
      <div className="absolute top-6 right-6 z-20">
        <TextLanguageSwitcher />
      </div>

      {/* Cyberpunk grid background with reduced opacity */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      {/* Neon glow effects */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mb-4">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
                Fan Verse
              </h1>
              <div className="w-16 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto"></div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">{t('auth.otp.title')}</h2>
            <p className="text-gray-400 text-sm">{t('auth.otp.subtitle', { email })}</p>
          </div>

          {/* Auth Form Container with Glowing Shadow */}
          <div className="relative">
            {/* Outer glow effect with slower animation */}
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl blur-xl animate-pulse" style={{ animationDuration: '3s' }}></div>
            
            {/* Inner glow rings */}
            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400/30 to-purple-400/30 rounded-lg blur-md"></div>
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-300/20 to-purple-300/20 rounded-lg blur-sm"></div>
            
            {/* Form container */}
            <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 shadow-2xl shadow-cyan-500/25">
              <form onSubmit={handleVerifyOTP} className="space-y-6">
                {/* Back Button */}
                <button
                  type="button"
                  onClick={handleGoBack}
                  className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                >
                  <ArrowLeft size={16} />
                  {t('auth.otp.back')}
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
                    {t('auth.otp.instructions', { type: fromSignUp ? t('auth.signUp.title').toLowerCase() : '' })}
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
                      {t('auth.otp.verifying')}
                    </>
                  ) : (
                    t('auth.otp.verifyButton')
                  )}
                </CyberpunkButton>

                {/* Resend Code */}
                <div className="text-center">
                  <p className="text-gray-400 text-sm mb-2">
                    {t('auth.otp.didntReceive')}
                  </p>
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-medium"
                  >
                    {t('auth.otp.resendCode')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTP;
