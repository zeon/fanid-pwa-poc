
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthLayout from '@/components/auth/AuthLayout';
import CyberpunkButton from '@/components/auth/CyberpunkButton';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Camera, Check, AlertCircle, RefreshCw } from 'lucide-react';

interface ScanStep {
  id: string;
  label: string;
  completed: boolean;
}

const FaceScanning = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string>('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [scanComplete, setScanComplete] = useState(false);
  
  // Get user data from navigation state
  const userData = location.state || {};

  const scanSteps: ScanStep[] = [
    { id: 'face-detection', label: 'Detecting face...', completed: false },
    { id: 'face-alignment', label: 'Analyzing facial features...', completed: false },
    { id: 'biometric-capture', label: 'Capturing biometric data...', completed: false },
    { id: 'verification', label: 'Verifying identity...', completed: false },
    { id: 'complete', label: 'Face scan complete!', completed: false }
  ];

  const [steps, setSteps] = useState(scanSteps);

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user'
        }
      });
      
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setCameraError('');
    } catch (error) {
      console.error('Camera access denied:', error);
      setCameraError('Camera access is required for face scanning. Please allow camera access and try again.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const startFaceScan = () => {
    if (!stream) {
      setCameraError('Camera not available. Please refresh and try again.');
      return;
    }

    setIsScanning(true);
    setScanProgress(0);
    setCurrentStep(0);
    setScanComplete(false);

    // Reset steps
    setSteps(scanSteps.map(step => ({ ...step, completed: false })));

    // Simulate face scanning process
    const totalDuration = 8000; // 8 seconds total
    const stepDuration = totalDuration / steps.length;
    let progress = 0;
    let stepIndex = 0;

    const interval = setInterval(() => {
      progress += 2;
      setScanProgress(progress);

      // Update current step
      const newStepIndex = Math.floor(progress / (100 / steps.length));
      if (newStepIndex !== stepIndex && newStepIndex < steps.length) {
        setSteps(prev => prev.map((step, index) => 
          index === stepIndex ? { ...step, completed: true } : step
        ));
        stepIndex = newStepIndex;
        setCurrentStep(stepIndex);
      }

      if (progress >= 100) {
        clearInterval(interval);
        setSteps(prev => prev.map(step => ({ ...step, completed: true })));
        setScanComplete(true);
        setIsScanning(false);
        
        // Auto-proceed to dashboard after 2 seconds
        setTimeout(() => {
          navigate('/dashboard', { 
            state: { 
              ...userData,
              faceScanned: true,
              message: 'Account created successfully! Face scan completed.'
            }
          });
        }, 2000);
      }
    }, 100);
  };

  const handleSkip = () => {
    navigate('/dashboard', { 
      state: { 
        ...userData,
        faceScanned: false,
        message: 'Account created successfully! You can set up face scanning later in settings.'
      }
    });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleRetry = () => {
    setCameraError('');
    startCamera();
  };

  return (
    <AuthLayout 
      title="BIOMETRIC SETUP" 
      subtitle="Secure your account with face recognition"
    >
      <div className="space-y-6">
        {/* Back Button */}
        <button
          type="button"
          onClick={handleGoBack}
          className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors text-sm"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        {/* Camera Section */}
        <div className="relative">
          <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video">
            {cameraError ? (
              <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                <AlertCircle className="text-red-400 mb-4" size={48} />
                <p className="text-gray-300 mb-4">{cameraError}</p>
                <CyberpunkButton onClick={handleRetry} variant="secondary" size="sm">
                  <RefreshCw size={16} className="mr-2" />
                  Retry
                </CyberpunkButton>
              </div>
            ) : (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                
                {/* Face Detection Overlay */}
                {stream && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`relative w-48 h-48 border-2 rounded-full transition-colors duration-300 ${
                      scanComplete 
                        ? 'border-green-400 shadow-lg shadow-green-400/50' 
                        : isScanning 
                          ? 'border-cyan-400 shadow-lg shadow-cyan-400/50 animate-pulse' 
                          : 'border-gray-400'
                    }`}>
                      {/* Corner indicators */}
                      <div className="absolute -top-2 -left-2 w-4 h-4 border-l-2 border-t-2 border-cyan-400"></div>
                      <div className="absolute -top-2 -right-2 w-4 h-4 border-r-2 border-t-2 border-cyan-400"></div>
                      <div className="absolute -bottom-2 -left-2 w-4 h-4 border-l-2 border-b-2 border-cyan-400"></div>
                      <div className="absolute -bottom-2 -right-2 w-4 h-4 border-r-2 border-b-2 border-cyan-400"></div>
                      
                      {/* Center indicator */}
                      {scanComplete && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Check className="text-green-400" size={32} />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="text-center space-y-2">
          <p className="text-gray-300">
            {scanComplete 
              ? 'Face scan completed successfully!'
              : isScanning 
                ? 'Hold still while we scan your face...'
                : 'Position your face within the circle and click "Start Scan"'
            }
          </p>
          {!scanComplete && !isScanning && (
            <p className="text-gray-400 text-sm">
              This helps secure your account and enables biometric login
            </p>
          )}
        </div>

        {/* Progress Section */}
        {isScanning && (
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Scanning Progress</span>
                <span className="text-cyan-400">{Math.round(scanProgress)}%</span>
              </div>
              <Progress 
                value={scanProgress} 
                className="h-2 bg-gray-700"
              />
            </div>
            
            {/* Current Step */}
            <div className="space-y-2">
              {steps.map((step, index) => (
                <div 
                  key={step.id}
                  className={`flex items-center gap-3 text-sm transition-colors ${
                    index === currentStep 
                      ? 'text-cyan-400' 
                      : step.completed 
                        ? 'text-green-400' 
                        : 'text-gray-500'
                  }`}
                >
                  {step.completed ? (
                    <Check size={16} className="text-green-400" />
                  ) : index === currentStep ? (
                    <RefreshCw size={16} className="animate-spin text-cyan-400" />
                  ) : (
                    <div className="w-4 h-4 border border-gray-500 rounded-full"></div>
                  )}
                  <span>{step.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {!isScanning && !scanComplete && stream && (
          <div className="space-y-3">
            <CyberpunkButton 
              onClick={startFaceScan}
              variant="primary"
              className="w-full flex items-center justify-center gap-2"
            >
              <Camera size={20} />
              Start Face Scan
            </CyberpunkButton>
            
            <CyberpunkButton 
              onClick={handleSkip}
              variant="secondary"
              className="w-full"
            >
              Skip for Now
            </CyberpunkButton>
          </div>
        )}

        {scanComplete && (
          <div className="text-center">
            <p className="text-green-400 text-sm mb-4">
              Redirecting to dashboard...
            </p>
            <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        )}
      </div>
    </AuthLayout>
  );
};

export default FaceScanning;
