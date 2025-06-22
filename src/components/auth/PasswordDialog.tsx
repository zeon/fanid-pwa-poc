
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Lock, Shield } from 'lucide-react';
import CyberpunkInput from '@/components/auth/CyberpunkInput';
import CyberpunkButton from '@/components/auth/CyberpunkButton';
import { validateSitePassword, grantSiteAccess } from '@/utils/siteAuth';

interface PasswordDialogProps {
  isOpen: boolean;
  onAccessGranted: () => void;
}

const PasswordDialog = ({ isOpen, onAccessGranted }: PasswordDialogProps) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));

    if (validateSitePassword(password)) {
      grantSiteAccess();
      onAccessGranted();
    } else {
      setError('Incorrect password. Please try again.');
    }

    setIsSubmitting(false);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (error) setError(''); // Clear error when user starts typing
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}} modal>
      <DialogContent 
        className="bg-gray-900 border-gray-700 text-white max-w-md"
        hideCloseButton
      >
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-cyan-400 text-center justify-center">
            <Shield className="w-6 h-6" />
            <span>Site Access Required</span>
          </DialogTitle>
          <DialogDescription className="text-gray-300 text-center">
            This site is password protected. Please enter the access code to continue.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-center space-x-2 text-purple-400 mb-3">
              <Lock className="w-5 h-5" />
              <span className="font-semibold">Secured Access</span>
            </div>
            <p className="text-sm text-gray-400 text-center">
              Enter the password to unlock full site access for 24 hours.
            </p>
          </div>

          <CyberpunkInput
            label="Access Password"
            type="password"
            placeholder="Enter password..."
            value={password}
            onChange={handlePasswordChange}
            error={error}
            icon={<Lock className="w-4 h-4" />}
          />

          <CyberpunkButton
            type="submit"
            variant="primary"
            disabled={!password.trim() || isSubmitting}
            className="w-full"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Verifying...
              </>
            ) : (
              <>
                <Shield className="w-4 h-4" />
                Grant Access
              </>
            )}
          </CyberpunkButton>
        </form>

        <div className="text-xs text-gray-500 text-center">
          Access will be remembered for 24 hours on this device.
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PasswordDialog;
