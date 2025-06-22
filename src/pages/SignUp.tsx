
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AuthLayout from '@/components/auth/AuthLayout';
import CyberpunkInput from '@/components/auth/CyberpunkInput';
import CyberpunkButton from '@/components/auth/CyberpunkButton';
import CyberpunkCheckbox from '@/components/auth/CyberpunkCheckbox';
import TextLanguageSwitcher from '@/components/navigation/TextLanguageSwitcher';
import { Eye, EyeOff, User, Mail, Phone, Shield, Key } from 'lucide-react';

const SignUp = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    mobilePhone: '',
    idLastFiveDigits: '',
    password: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.username) newErrors.username = 'Username is required';
    else if (formData.username.length < 3) newErrors.username = 'Username must be at least 3 characters';
    
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    
    if (!formData.mobilePhone) newErrors.mobilePhone = 'Mobile phone is required';
    else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(formData.mobilePhone)) newErrors.mobilePhone = 'Invalid phone number format';
    
    if (!formData.idLastFiveDigits) newErrors.idLastFiveDigits = 'ID last 5 digits is required';
    else if (!/^\d{5}$/.test(formData.idLastFiveDigits)) newErrors.idLastFiveDigits = 'Must be exactly 5 digits';
    
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';

    if (!privacyAccepted) newErrors.privacy = 'You must accept the privacy policy';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Sign up data:', formData);
      // TODO: Implement actual sign up logic
      // Navigate to OTP page with user data
      navigate('/otp', { 
        state: { 
          email: formData.email,
          fromSignUp: true
        } 
      });
    }
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
            <h2 className="text-2xl font-bold text-white mb-2">{t('auth.signUp.title')}</h2>
            <p className="text-gray-400 text-sm">{t('auth.signUp.subtitle')}</p>
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
                  label={t('auth.signUp.username')}
                  placeholder="johndoe"
                  value={formData.username}
                  onChange={handleInputChange('username')}
                  error={errors.username}
                  icon={<User size={16} />}
                />

                <CyberpunkInput
                  label={t('auth.signUp.email')}
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  error={errors.email}
                  icon={<Mail size={16} />}
                />

                <CyberpunkInput
                  label={t('auth.signUp.mobilePhone')}
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={formData.mobilePhone}
                  onChange={handleInputChange('mobilePhone')}
                  error={errors.mobilePhone}
                  icon={<Phone size={16} />}
                />

                <CyberpunkInput
                  label={t('auth.signUp.idLastFiveDigits')}
                  placeholder="12345"
                  maxLength={5}
                  value={formData.idLastFiveDigits}
                  onChange={handleInputChange('idLastFiveDigits')}
                  error={errors.idLastFiveDigits}
                  icon={<Shield size={16} />}
                />

                <CyberpunkInput
                  label={t('auth.signUp.password')}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange('password')}
                  error={errors.password}
                  icon={<Key size={16} />}
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

                <CyberpunkCheckbox
                  checked={privacyAccepted}
                  onCheckedChange={setPrivacyAccepted}
                  error={errors.privacy}
                  label={t('auth.signUp.privacyPolicy')}
                />

                <CyberpunkButton type="submit" variant="primary">
                  {t('auth.signUp.createAccountButton')}
                </CyberpunkButton>

                <div className="text-center pt-4">
                  <p className="text-gray-400 text-sm">
                    {t('auth.signUp.haveAccount')}{' '}
                    <Link 
                      to="/signin" 
                      className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
                    >
                      {t('auth.signUp.signIn')}
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

export default SignUp;
