import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CyberpunkInput from '@/components/auth/CyberpunkInput';
import CyberpunkButton from '@/components/auth/CyberpunkButton';
import CyberpunkCheckbox from '@/components/auth/CyberpunkCheckbox';
import TextLanguageSwitcher from '@/components/navigation/TextLanguageSwitcher';
import EmailVerificationBanner from '@/components/auth/EmailVerificationBanner';
import { Eye, EyeOff, User, Mail, Phone, Shield, Key } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { signUpSchema } from '@/utils/validation';
import { toast } from 'sonner';
import { ZodError } from 'zod';

const SignUp = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { signUp } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showVerificationBanner, setShowVerificationBanner] = useState(false);
  const [signupEmail, setSignupEmail] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    id_last_five: '',
    password: '',
    agreeToPrivacy: false,
  });

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate form data
      signUpSchema.parse(formData);

      // Sign up with Supabase
      const { error } = await signUp(formData.email, formData.password, {
        username: formData.username,
        phone: formData.phone,
        id_last_five: formData.id_last_five
      });

      if (error) {
        if (error.message === 'user_repeated_signup' || error.message.includes('already registered')) {
          toast.error(t('auth.signUp.errors.emailExists'));
          return;
        } else if (error.message.includes('weak password') || error.message.includes('Password')) {
          toast.error(t('auth.signUp.errors.weakPassword'));
          return;
        } else if (error.message.includes('network') || error.message.includes('fetch')) {
          toast.error(t('auth.signUp.errors.networkError'));
          return;
        } else {
          toast.error(t('auth.signUp.errors.genericError'));
          return;
        }
      }

      // Show verification banner instead of navigating away
      setSignupEmail(formData.email);
      setShowVerificationBanner(true);
      toast.success(t('auth.emailVerification.sent', { email: formData.email }));
    } catch (error) {
      if (error instanceof ZodError) {
        error.errors.forEach(err => {
          toast.error(err.message);
        });
      } else {
        toast.error('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Language switcher */}
      <div className="absolute top-6 right-6 z-20">
        <TextLanguageSwitcher />
      </div>

      {/* Cyberpunk grid background */}
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

          {/* Form Container */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl blur-xl animate-pulse" style={{ animationDuration: '3s' }}></div>
            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400/30 to-purple-400/30 rounded-lg blur-md"></div>
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-300/20 to-purple-300/20 rounded-lg blur-sm"></div>
            
            <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 shadow-2xl shadow-cyan-500/25">
              {showVerificationBanner && (
                <EmailVerificationBanner 
                  email={signupEmail} 
                  onClose={() => setShowVerificationBanner(false)}
                />
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <CyberpunkInput
                  label={t('auth.signUp.username')}
                  placeholder="johndoe"
                  value={formData.username}
                  onChange={handleInputChange('username')}
                  icon={<User size={16} />}
                />

                <CyberpunkInput
                  label={t('auth.signUp.email')}
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  icon={<Mail size={16} />}
                />

                <CyberpunkInput
                  label={t('auth.signUp.mobilePhone')}
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={handleInputChange('phone')}
                  icon={<Phone size={16} />}
                />

                <CyberpunkInput
                  label={t('auth.signUp.idLastFiveDigits')}
                  placeholder="12345"
                  maxLength={5}
                  value={formData.id_last_five}
                  onChange={handleInputChange('id_last_five')}
                  icon={<Shield size={16} />}
                />

                <CyberpunkInput
                  label={t('auth.signUp.password')}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange('password')}
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
                  checked={formData.agreeToPrivacy}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, agreeToPrivacy: checked as boolean }))}
                  label={t('auth.signUp.privacyPolicy')}
                />

                <CyberpunkButton type="submit" variant="primary" disabled={loading}>
                  {loading ? 'Creating Account...' : t('auth.signUp.createAccountButton')}
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
