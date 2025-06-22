
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AuthLayout from '@/components/auth/AuthLayout';
import CyberpunkInput from '@/components/auth/CyberpunkInput';
import CyberpunkButton from '@/components/auth/CyberpunkButton';
import TextLanguageSwitcher from '@/components/navigation/TextLanguageSwitcher';
import { Separator } from '@/components/ui/separator';
import { Fingerprint, Eye, EyeOff } from 'lucide-react';

const SignIn = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    
    if (!formData.password) newErrors.password = 'Password is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Sign in data:', formData);
      // TODO: Implement actual sign in logic
      // Navigate to OTP page with user data
      navigate('/otp', { 
        state: { 
          email: formData.email,
          fromSignUp: false
        } 
      });
    }
  };

  const handleBiometricLogin = () => {
    console.log('Starting biometric login flow');
    navigate('/face-scanning', {
      state: {
        isBiometricLogin: true,
        email: 'biometric-user@example.com' // In real app, this would come from stored biometric data
      }
    });
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
                FanVerse
              </h1>
              <div className="w-16 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto"></div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">{t('auth.signIn.title')}</h2>
            <p className="text-gray-400 text-sm">{t('auth.signIn.subtitle')}</p>
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
              <form onSubmit={handleSubmit} className="space-y-6">
                <CyberpunkInput
                  label={t('auth.signIn.email')}
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  error={errors.email}
                />

                <CyberpunkInput
                  label={t('auth.signIn.password')}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange('password')}
                  error={errors.password}
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-cyan-400 transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  }
                />

                <div className="flex justify-end">
                  <Link 
                    to="/forgot-password" 
                    className="text-sm text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    {t('auth.signIn.forgotPassword')}
                  </Link>
                </div>

                <CyberpunkButton type="submit" variant="primary">
                  {t('auth.signIn.signInButton')}
                </CyberpunkButton>

                <div className="relative">
                  <Separator className="bg-gray-600" />
                  <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 px-3 text-gray-400 text-sm">
                    OR
                  </span>
                </div>

                <CyberpunkButton variant="secondary" onClick={handleBiometricLogin}>
                  <Fingerprint className="mr-2" size={20} />
                  {t('auth.signIn.biometricLogin')}
                </CyberpunkButton>

                <div className="text-center pt-4">
                  <p className="text-gray-400 text-sm">
                    {t('auth.signIn.noAccount')}{' '}
                    <Link 
                      to="/signup" 
                      className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
                    >
                      {t('auth.signIn.createAccount')}
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
