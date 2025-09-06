import { useState, useCallback } from 'react';
import { FormData } from '@/types/form';

export const useFormData = () => {
  const [formData, setFormData] = useState<FormData>({});
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const updateFormData = useCallback((stepKey: keyof FormData, data: any) => {
    setFormData(prev => ({
      ...prev,
      [stepKey]: data,
    }));
    setHasUnsavedChanges(false);
  }, []);

  const markAsChanged = useCallback(() => {
    setHasUnsavedChanges(true);
  }, []);

  const calculateAge = useCallback((dateOfBirth?: string): number => {
    if (!dateOfBirth) return 0;

    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }, []);

  const isWeekend = useCallback((dateString: string): boolean => {
    const date = new Date(dateString);
    const dayOfWeek = date.getDay();
    return dayOfWeek === 5 || dayOfWeek === 6; // Friday or Saturday
  }, []);

  return {
    formData,
    hasUnsavedChanges,
    updateFormData,
    markAsChanged,
    calculateAge,
    isWeekend,
    setHasUnsavedChanges,
  };
};
