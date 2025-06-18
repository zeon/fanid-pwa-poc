
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Progress } from '@/components/ui/progress';
import { Check, RefreshCw } from 'lucide-react';

interface ScanStep {
  id: string;
  label: string;
  completed: boolean;
}

interface ScanProgressProps {
  isScanning: boolean;
  scanProgress: number;
  currentStep: number;
  steps: ScanStep[];
}

const ScanProgress = ({ isScanning, scanProgress, currentStep, steps }: ScanProgressProps) => {
  const { t } = useTranslation();

  if (!isScanning) return null;

  // Translate step labels
  const translatedSteps = steps.map(step => ({
    ...step,
    label: t(`auth.faceScanning.progress.steps.${step.id}`)
  }));

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">{t('auth.faceScanning.progress.scanningProgress')}</span>
          <span className="text-cyan-400">{Math.round(scanProgress)}%</span>
        </div>
        <Progress 
          value={scanProgress} 
          className="h-2 bg-gray-700"
        />
      </div>
      
      {/* Current Step */}
      <div className="space-y-2">
        {translatedSteps.map((step, index) => (
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
  );
};

export default ScanProgress;
