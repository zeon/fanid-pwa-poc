
import React, { useState, useEffect } from 'react';
import { checkSiteAccess } from '@/utils/siteAuth';
import PasswordDialog from '@/components/auth/PasswordDialog';

interface SitePasswordGuardProps {
  children: React.ReactNode;
}

const SitePasswordGuard = ({ children }: SitePasswordGuardProps) => {
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);

  useEffect(() => {
    const access = checkSiteAccess();
    setHasAccess(access);
    
    if (!access) {
      // Small delay to prevent flash of content
      setTimeout(() => {
        setShowPasswordDialog(true);
      }, 100);
    }
  }, []);

  const handleAccessGranted = () => {
    setHasAccess(true);
    setShowPasswordDialog(false);
  };

  // Show loading state while checking access
  if (hasAccess === null) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="flex items-center space-x-3 text-cyan-400">
          <div className="w-6 h-6 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
          <span className="text-lg font-medium">Loading...</span>
        </div>
      </div>
    );
  }

  // Show password dialog if access is not granted
  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-gray-900">
        <PasswordDialog
          isOpen={showPasswordDialog}
          onAccessGranted={handleAccessGranted}
        />
      </div>
    );
  }

  // Render the app if access is granted
  return <>{children}</>;
};

export default SitePasswordGuard;
