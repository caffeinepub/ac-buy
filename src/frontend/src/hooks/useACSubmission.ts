import { useState } from 'react';
import { useActor } from './useActor';
import type { Condition } from '../backend';

interface SubmissionData {
  brand: string;
  model: string;
  age: bigint;
  condition: Condition;
  customerName: string;
  phone: string;
  email: string;
}

export function useACSubmission() {
  const { actor } = useActor();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitAC = async (data: SubmissionData): Promise<boolean> => {
    if (!actor) {
      setError('Backend connection not available. Please try again.');
      return false;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const result = await actor.submitAirConditioner(
        data.brand,
        data.model,
        data.age,
        data.condition,
        data.customerName,
        data.phone,
        data.email
      );

      if (result) {
        return true;
      } else {
        setError('Submission failed. Please try again.');
        return false;
      }
    } catch (err) {
      console.error('Submission error:', err);
      setError('An error occurred while submitting. Please try again.');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submitAC,
    isSubmitting,
    error,
  };
}
