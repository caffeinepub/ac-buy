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
      console.error('[useACSubmission] No actor available', {
        timestamp: new Date().toISOString(),
        errorType: 'NO_ACTOR'
      });
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
        console.error('[useACSubmission] Backend returned error:', {
          timestamp: new Date().toISOString(),
          errorType: 'BACKEND_ERROR',
          errorMessage: errorMsg,
          fullResult: result
        });
        setError(errorMsg);
        return false;
      } else {
        const errorMsg = 'Unexpected response from backend. Please try again.';
        console.error('[useACSubmission] Unexpected result format:', {
          timestamp: new Date().toISOString(),
          errorType: 'UNEXPECTED_RESULT',
          result
        });
        setError(errorMsg);
        return false;
      }
    } catch (err) {
      console.error('[useACSubmission] Exception during submission:', {
        timestamp: new Date().toISOString(),
        error: err,
        errorType: typeof err,
        errorConstructor: err?.constructor?.name,
        errorName: err instanceof Error ? err.name : 'Unknown',
        errorMessage: err instanceof Error ? err.message : String(err),
        errorStack: err instanceof Error ? err.stack : undefined
      });

      let errorMsg = 'An unexpected error occurred while submitting your request.';
      let errorType = 'UNKNOWN_ERROR';
      
      if (err instanceof Error) {
        const message = err.message.toLowerCase();
        
        // Network and connection errors
        if (message.includes('network') || message.includes('fetch failed') || message.includes('failed to fetch')) {
          errorMsg = 'Network error. Please check your internet connection and try again.';
          errorType = 'NETWORK_ERROR';
        } 
        // Timeout errors
        else if (message.includes('timeout') || message.includes('timed out') || message.includes('deadline')) {
          errorMsg = 'Request timed out. The server took too long to respond. Please try again.';
          errorType = 'TIMEOUT_ERROR';
        }
        // Connection refused
        else if (message.includes('connection refused') || message.includes('econnrefused')) {
          errorMsg = 'Unable to connect to the backend. Please check your internet connection or try again later.';
          errorType = 'CONNECTION_REFUSED';
        }
        // Canister errors
        else if (message.includes('canister') || message.includes('replica')) {
          errorMsg = 'Backend service unavailable. Please verify the deployment status or try again later.';
          errorType = 'CANISTER_ERROR';
        }
        // Authentication errors
        else if (message.includes('authentication') || message.includes('unauthorized')) {
          errorMsg = 'Authentication error. Please refresh the page and try again.';
          errorType = 'AUTH_ERROR';
        }
        // Generic error with message
        else if (err.message) {
          errorMsg = `Error: ${err.message}`;
          errorType = 'ERROR_WITH_MESSAGE';
        }
      }

      console.error('[useACSubmission] Classified error:', {
        timestamp: new Date().toISOString(),
        errorType,
        errorMessage: errorMsg
      });

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
