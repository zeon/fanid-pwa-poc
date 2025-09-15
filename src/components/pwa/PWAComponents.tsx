import React, { useState, useEffect } from 'react';
import { InstallPrompt } from './InstallPrompt';
import { OfflineIndicator } from './OfflineIndicator';
import { UpdateNotification } from './UpdateNotification';
import { usePWA } from '@/hooks/usePWA';

export const PWAComponents: React.FC = () => {
  const { isInstallable, updateAvailable, isInstalled } = usePWA();
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [showUpdateNotification, setShowUpdateNotification] = useState(false);
  const [installPromptDismissed, setInstallPromptDismissed] = useState(false);

  // Show install prompt after a delay if app is installable and not installed
  useEffect(() => {
    if (isInstallable && !isInstalled && !installPromptDismissed) {
      const timer = setTimeout(() => {
        setShowInstallPrompt(true);
      }, 3000); // Show after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [isInstallable, isInstalled, installPromptDismissed]);

  // Show update notification when update is available
  useEffect(() => {
    if (updateAvailable) {
      setShowUpdateNotification(true);
    }
  }, [updateAvailable]);

  const handleInstallDismiss = () => {
    setShowInstallPrompt(false);
    setInstallPromptDismissed(true);
    // Remember dismissal for this session
    sessionStorage.setItem('installPromptDismissed', 'true');
  };

  const handleUpdateDismiss = () => {
    setShowUpdateNotification(false);
  };

  // Check if install prompt was already dismissed this session
  useEffect(() => {
    const dismissed = sessionStorage.getItem('installPromptDismissed');
    if (dismissed) {
      setInstallPromptDismissed(true);
    }
  }, []);

  return (
    <>
      <OfflineIndicator />
      
      {showInstallPrompt && (
        <InstallPrompt onDismiss={handleInstallDismiss} />
      )}
      
      {showUpdateNotification && (
        <UpdateNotification onDismiss={handleUpdateDismiss} />
      )}
    </>
  );
};