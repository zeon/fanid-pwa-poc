
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '@/components/auth/AuthLayout';
import CyberpunkInput from '@/components/auth/CyberpunkInput';
import CyberpunkButton from '@/components/auth/CyberpunkButton';
import { Separator } from '@/components/ui/separator';
import { Fingerprint, Eye, EyeOff } from 'lucide-react';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    mobilePhone: '',
    idLastFiveDigits: '',
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
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Sign up data:', formData);
      // TODO: Implement actual sign up logic
    }
  };

  return (
    <AuthLayout 
      title="CREATE ACCOUNT" 
      subtitle="Join the future of concert experiences"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <CyberpunkInput
          label="Username"
          placeholder="johndoe"
          value={formData.username}
          onChange={handleInputChange('username')}
          error={errors.username}
        />

        <CyberpunkInput
          label="Email"
          type="email"
          placeholder="john@example.com"
          value={formData.email}
          onChange={handleInputChange('email')}
          error={errors.email}
        />

        <CyberpunkInput
          label="Mobile Phone"
          type="tel"
          placeholder="+1 (555) 123-4567"
          value={formData.mobilePhone}
          onChange={handleInputChange('mobilePhone')}
          error={errors.mobilePhone}
        />

        <CyberpunkInput
          label="ID Last 5 Digits"
          placeholder="12345"
          maxLength={5}
          value={formData.idLastFiveDigits}
          onChange={handleInputChange('idLastFiveDigits')}
          error={errors.idLastFiveDigits}
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

        <CyberpunkButton type="submit" variant="primary">
          Create Account
        </CyberpunkButton>

        <div className="relative">
          <Separator className="bg-gray-600" />
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 px-3 text-gray-400 text-sm">
            OR
          </span>
        </div>

        <CyberpunkButton variant="secondary">
          <Fingerprint className="mr-2" size={20} />
          Setup Biometric Login
        </CyberpunkButton>

        <div className="text-center pt-4">
          <p className="text-gray-400 text-sm">
            Already have an account?{' '}
            <Link 
              to="/signin" 
              className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
            >
              Sign In
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default SignUp;
