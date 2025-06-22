
import { useNavigate } from 'react-router-dom';

interface NavigationData {
  isRescan: boolean;
  isBiometricLogin: boolean;
  isPurchaseVerification: boolean;
  isEntryVerification: boolean;
  purchaseData: any;
  userData: any;
  eventName?: string;
}

export const useFaceScanningNavigation = () => {
  const navigate = useNavigate();

  const handleGoBack = (isPurchaseVerification: boolean, isEntryVerification: boolean, purchaseData: any) => {
    if (isPurchaseVerification && purchaseData) {
      navigate(`/tixcraft/${purchaseData.eventId}`);
    } else if (isEntryVerification) {
      navigate('/active-tickets');
    } else {
      navigate(-1);
    }
  };

  const handleScanComplete = ({ 
    isBiometricLogin, 
    isPurchaseVerification, 
    isEntryVerification,
    purchaseData, 
    userData,
    eventName
  }: NavigationData) => {
    if (isBiometricLogin) {
      console.log('Biometric login successful, navigating to dashboard');
      navigate('/dashboard');
    } else if (isPurchaseVerification) {
      console.log('Purchase verification successful, navigating to payment page');
      navigate(`/tixcraft/${purchaseData.eventId}/payment`, {
        state: {
          verifiedPurchaseData: purchaseData
        }
      });
    } else if (isEntryVerification) {
      console.log('Entry verification successful, navigating to completion page');
      navigate('/entry-verification-complete', {
        state: {
          eventName: eventName
        }
      });
    } else {
      navigate('/face-scan-complete', { 
        state: userData
      });
    }
  };

  const handleDuplicateDetected = (userData: any) => {
    navigate('/face-duplicate-detected', { 
      state: userData
    });
  };

  return {
    handleGoBack,
    handleScanComplete,
    handleDuplicateDetected
  };
};
