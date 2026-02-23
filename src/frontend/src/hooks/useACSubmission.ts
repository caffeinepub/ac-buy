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
    console.log('[useACSubmission] Starting submission', {
      timestamp: new Date().toISOString(),
      hasActor: !!actor,
      data: {
        brand: data.brand,
        model: data.model,
        age: data.age.toString(),
        condition: data.condition,
        customerName: data.customerName,
        phone: data.phone,
        email: data.email
      }
    });

    if (!actor) {
      const errorMsg = 'Backend connection not available. Please refresh the page and try again.';
      console.error('[useACSubmission] No actor available');
      setError(errorMsg);
      return false;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      console.log('[useACSubmission] Calling backend submitAC method...');
      
      const result = await actor.submitAC(
        data.brand,
        data.model,
        data.age,
        data.condition,
        data.customerName,
        data.phone,
        data.email
      );

      console.log('[useACSubmission] Backend response received', {
        timestamp: new Date().toISOString(),
        resultKind: result.__kind__,
        result
      });

      if (result.__kind__ === 'success') {
        console.log('[useACSubmission] Submission successful:', result.success);
        return true;
      } else if (result.__kind__ === 'error') {
        const errorMsg = result.error || 'Submission failed. Please check your inputs and try again.';
        console.error('[useACSubmission] Backend returned error:', errorMsg);
        setError(errorMsg);
        return false;
      } else {
        const errorMsg = 'Unexpected response from backend. Please try again.';
        console.error('[useACSubmission] Unexpected result format:', result);
        setError(errorMsg);
        return false;
      }
    } catch (err) {
      console.error('[useACSubmission] Exception during submission:', {
        timestamp: new Date().toISOString(),
        error: err,
        errorType: typeof err,
        errorMessage: err instanceof Error ? err.message : String(err),
        errorStack: err instanceof Error ? err.stack : undefined
      });

      let errorMsg = 'An unexpected error occurred while submitting your request.';
      
      if (err instanceof Error) {
        if (err.message.includes('network') || err.message.includes('fetch')) {
          errorMsg = 'Network error. Please check your connection and try again.';
        } else if (err.message.includes('timeout')) {
          errorMsg = 'Request timed out. Please try again.';
        } else if (err.message) {
          errorMsg = `Error: ${err.message}`;
        }
      }

      setError(errorMsg);
      return false;
    } finally {
      setIsSubmitting(false);
      console.log('[useACSubmission] Submission process completed', {
        timestamp: new Date().toISOString()
      });
    }
  };

  return {
    submitAC,
    isSubmitting,
    error,
  };
}
