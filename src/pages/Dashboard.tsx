
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardStats from '@/components/dashboard/DashboardStats';
import DashboardEvents from '@/components/dashboard/DashboardEvents';
import MembershipSection from '@/components/dashboard/MembershipSection';
import RefundSuccessDialog from '@/components/dashboard/RefundSuccessDialog';
import { Event } from '@/data/eventsData';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const [showRefundSuccess, setShowRefundSuccess] = useState(false);
  const [refundedEvent, setRefundedEvent] = useState<Event | null>(null);

  useEffect(() => {
    if (location.state?.showRefundSuccess && location.state?.refundedEvent) {
      setShowRefundSuccess(true);
      setRefundedEvent(location.state.refundedEvent);
      
      // Clear the state to prevent showing the dialog again on refresh
      navigate('/dashboard', { replace: true });
    }
  }, [location.state, navigate]);

  const handleCloseRefundSuccess = () => {
    setShowRefundSuccess(false);
    setRefundedEvent(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* Enhanced Background Effects */}
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

      {/* Main Content */}
      <div className="relative z-10">
        <DashboardHeader />
        <div className="max-w-7xl mx-auto p-6 space-y-8">
          <DashboardStats />
          <MembershipSection />
          <DashboardEvents />
        </div>
      </div>

      {/* Refund Success Dialog */}
      {showRefundSuccess && refundedEvent && (
        <RefundSuccessDialog
          isOpen={showRefundSuccess}
          onClose={handleCloseRefundSuccess}
          event={refundedEvent}
        />
      )}
    </div>
  );
};

export default Dashboard;
