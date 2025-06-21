
import { useNavigate } from 'react-router-dom';

interface NavigationData {
  isRescan: boolean;
  isBiometricLogin: boolean;
  isPurchaseVerification: boolean;
  purchaseData: any;
  userData: any;
}

export const useFaceScanningNavigation = () => {
  const navigate = useNavigate();

  const handleGoBack = (isPurchaseVerification: boolean, purchaseData: any) => {
    if (isPurchaseVerification && purchaseData) {
      navigate(`/tixcraft/${purchaseData.eventId}`);
    } else {
      navigate(-1);
    }
  };

  const handleScanComplete = ({ 
    isBiometricLogin, 
    isPurchaseVerification, 
    purchaseData, 
    userData 
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
