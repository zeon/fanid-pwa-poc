
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '@/components/auth/AuthLayout';
import CyberpunkInput from '@/components/auth/CyberpunkInput';
import CyberpunkButton from '@/components/auth/CyberpunkButton';
import { Separator } from '@/components/ui/separator';
import { Fingerprint, Eye, EyeOff } from 'lucide-react';

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    
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
        <div className="grid grid-cols-2 gap-4">
          <CyberpunkInput
            label="First Name"
            placeholder="John"
            value={formData.firstName}
            onChange={handleInputChange('firstName')}
            error={errors.firstName}
          />
          <CyberpunkInput
            label="Last Name"
            placeholder="Doe"
            value={formData.lastName}
            onChange={handleInputChange('lastName')}
            error={errors.lastName}
          />
        </div>

        <CyberpunkInput
          label="Email"
          type="email"
          placeholder="john@example.com"
          value={formData.email}
          onChange={handleInputChange('email')}
          error={errors.email}
        />

        <div className="relative">
          <CyberpunkInput
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={formData.password}
            onChange={handleInputChange('password')}
            error={errors.password}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition-colors"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <div className="relative">
          <CyberpunkInput
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleInputChange('confirmPassword')}
            error={errors.confirmPassword}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition-colors"
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

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
