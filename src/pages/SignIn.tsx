import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '@/components/auth/AuthLayout';
import CyberpunkInput from '@/components/auth/CyberpunkInput';
import CyberpunkButton from '@/components/auth/CyberpunkButton';
import { Separator } from '@/components/ui/separator';
import { Fingerprint, Eye, EyeOff } from 'lucide-react';

const SignIn = () => {
  const navigate = useNavigate();
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

  return (
    <AuthLayout 
      title="WELCOME BACK" 
      subtitle="Access your concert universe"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <CyberpunkInput
          label="Email"
          type="email"
          placeholder="john@example.com"
          value={formData.email}
          onChange={handleInputChange('email')}
          error={errors.email}
        />

        <CyberpunkInput
          label="Password"
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
            Forgot password?
          </Link>
        </div>

        <CyberpunkButton type="submit" variant="primary">
          Sign In
        </CyberpunkButton>

        <div className="relative">
          <Separator className="bg-gray-600" />
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 px-3 text-gray-400 text-sm">
            OR
          </span>
        </div>

        <CyberpunkButton variant="secondary">
          <Fingerprint className="mr-2" size={20} />
          Biometric Login
        </CyberpunkButton>

        <div className="text-center pt-4">
          <p className="text-gray-400 text-sm">
            Don't have an account?{' '}
            <Link 
              to="/signup" 
              className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
            >
              Create Account
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default SignIn;
