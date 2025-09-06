import { useState, useCallback } from 'react';
import { TOTAL_STEPS } from '@/constants/formConfig';

export const useFormNavigation = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const goToNextStep = useCallback(() => {
    setCurrentStep(prev => Math.min(prev + 1, TOTAL_STEPS));
  }, []);

  const goToPreviousStep = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  }, []);

  const goToStep = useCallback((step: number) => {
    if (step >= 1 && step <= TOTAL_STEPS) {
      setCurrentStep(step);
    }
  }, []);

  const progress = (currentStep / TOTAL_STEPS) * 100;

  return {
    currentStep,
    progress,
    goToNextStep,
    goToPreviousStep,
    goToStep,
    isFirstStep: currentStep === 1,
    isLastStep: currentStep === TOTAL_STEPS,
  };
};
