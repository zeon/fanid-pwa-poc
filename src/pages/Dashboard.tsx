
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardStats from '@/components/dashboard/DashboardStats';
import DashboardEvents from '@/components/dashboard/DashboardEvents';
import MembershipSection from '@/components/dashboard/MembershipSection';
import TicketPurchaseSuccessDialog from '@/components/dashboard/TicketPurchaseSuccessDialog';

const Dashboard = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [purchaseData, setPurchaseData] = useState<any>(null);
  
  // Mock user data - in a real app this would come from auth context
  const user = {
    name: 'Alex Chen',
    email: 'alex.chen@example.com',
    initials: 'AC'
  };

  useEffect(() => {
    // Check if we're coming from a successful purchase
    if (location.state?.fromPurchase && location.state?.transactionData) {
      setPurchaseData(location.state.transactionData);
      setShowSuccessDialog(true);
      
      // Clear the location state to prevent showing dialog on refresh
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  const handleCloseSuccessDialog = () => {
    setShowSuccessDialog(false);
    setPurchaseData(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* Enhanced Background Effects with reduced grid opacity */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(147, 51, 234, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(147, 51, 234, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '120px 120px'
        }}></div>
      </div>
      
      <div className="absolute top-10 left-20 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-60 h-60 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

      {/* Header */}
      <DashboardHeader user={user} />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6 relative z-10">
        
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">{t('dashboard.title')}</h2>
          <p className="text-gray-400">{t('dashboard.subtitle')}</p>
        </div>

        <DashboardStats />

        <div className="mt-8">
          <MembershipSection />
        </div>

        <div className="mt-8">
          <DashboardEvents />
        </div>
      </div>

      {/* Success Dialog */}
      {showSuccessDialog && purchaseData && (
        <TicketPurchaseSuccessDialog
          isOpen={showSuccessDialog}
          onClose={handleCloseSuccessDialog}
          eventName={purchaseData.eventName}
          transactionId={purchaseData.transactionId}
        />
      )}
    </div>
  );
};

export default Dashboard;
