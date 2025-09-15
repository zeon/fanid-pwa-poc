import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RefreshCw, X } from 'lucide-react';
import { usePWA } from '@/hooks/usePWA';

interface UpdateNotificationProps {
  onDismiss: () => void;
}

export const UpdateNotification: React.FC<UpdateNotificationProps> = ({ onDismiss }) => {
  const { updateApp } = usePWA();

  const handleUpdate = () => {
    updateApp();
  };

  return (
    <Card className="fixed top-4 left-4 right-4 z-50 mx-auto max-w-sm bg-background/95 backdrop-blur-sm border-border shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <RefreshCw className="h-5 w-5 text-primary" />
            <CardTitle className="text-sm">Update Available</CardTitle>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDismiss}
            className="h-6 w-6 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription className="text-xs">
          A new version of FanVerse is available with improvements and bug fixes.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex space-x-2">
          <Button
            onClick={handleUpdate}
            size="sm"
            className="flex-1"
          >
            Update Now
          </Button>
          <Button
            onClick={onDismiss}
            variant="outline"
            size="sm"
            className="flex-1"
          >
            Later
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};