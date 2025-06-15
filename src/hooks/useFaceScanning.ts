import { useState, useRef, useEffect } from 'react';

interface ScanStep {
  id: string;
  label: string;
  completed: boolean;
}

export const useFaceScanning = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string>('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [scanComplete, setScanComplete] = useState(false);

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

  const startFaceScan = (onComplete: () => void, onDuplicateDetected: () => void, isRescan = false) => {
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
        
        // Deterministic behavior: first scan always fails, re-scan always succeeds
        setTimeout(() => {
          if (isRescan) {
            console.log('Re-scan completed successfully');
            onComplete();
          } else {
            console.log('First scan always detects duplicate, redirecting to duplicate detection page');
            onDuplicateDetected();
          }
        }, 1000);
      }
    }, 100);
  };

  const handleRetry = () => {
    setCameraError('');
    startCamera();
  };

  return {
    videoRef,
    stream,
    cameraError,
    isScanning,
    scanProgress,
    currentStep,
    scanComplete,
    steps,
    startFaceScan,
    handleRetry
  };
};
