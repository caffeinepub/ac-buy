import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Submission } from '../backend';

export function useGetAllSubmissions() {
  const { actor, isFetching } = useActor();

  return useQuery<Submission[]>({
    queryKey: ['submissions'],
    queryFn: async () => {
      if (!actor) {
        console.warn('[useGetAllSubmissions] Actor not initialized', {
          timestamp: new Date().toISOString()
        });
        return [];
      }
      
      try {
        console.log('[useGetAllSubmissions] Fetching submissions', {
          timestamp: new Date().toISOString(),
          actorAvailable: !!actor
        });
        
        const result = await actor.getAllSubmissions();
        
        console.log('[useGetAllSubmissions] Successfully fetched submissions', {
          timestamp: new Date().toISOString(),
          count: result.length,
          submissions: result
        });
        
        return result;
      } catch (error) {
        console.error('[useGetAllSubmissions] Error fetching submissions:', {
          timestamp: new Date().toISOString(),
          error,
          errorType: typeof error,
          errorConstructor: error?.constructor?.name,
          errorName: error instanceof Error ? error.name : 'Unknown',
          errorMessage: error instanceof Error ? error.message : String(error),
          errorStack: error instanceof Error ? error.stack : undefined,
        });
        
        // Classify and transform errors into user-friendly messages
        if (error instanceof Error) {
          const message = error.message.toLowerCase();
          
          // Authentication errors
          if (message.includes('authenticated') || message.includes('internet identity') || message.includes('anonymous')) {
            throw new Error('Authentication required. Please log in with Internet Identity to view submissions.');
          }
          
          // Network errors
          if (message.includes('network') || message.includes('fetch failed') || message.includes('failed to fetch')) {
            throw new Error('Network error. Please check your internet connection and try again.');
          }
          
          // Timeout errors
          if (message.includes('timeout') || message.includes('timed out') || message.includes('deadline')) {
            throw new Error('Request timed out. The server took too long to respond. Please click retry.');
          }
          
          // Connection errors
          if (message.includes('connection refused') || message.includes('econnrefused')) {
            throw new Error('Unable to connect to backend. Please check your internet connection.');
          }
          
          // Canister errors
          if (message.includes('canister') || message.includes('replica')) {
            throw new Error('Backend service unavailable. Please verify deployment status or try again later.');
          }
          
          // Generic error with message
          throw new Error(`Failed to load submissions: ${error.message}`);
        }
        
        throw new Error('Failed to load submissions. Please check your connection and try again.');
      }
    },
    enabled: !!actor && !isFetching,
    refetchOnWindowFocus: true,
    retry: 2,
    retryDelay: (attemptIndex) => {
      const delay = Math.min(1000 * 2 ** attemptIndex, 5000);
      console.log('[useGetAllSubmissions] Retry attempt', {
        timestamp: new Date().toISOString(),
        attemptIndex,
        delay
      });
      return delay;
    },
  });
}

export function useGetSubmission(id: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Submission | null>({
    queryKey: ['submission', id],
    queryFn: async () => {
      if (!actor) {
        console.warn('[useGetSubmission] Actor not initialized', {
          timestamp: new Date().toISOString(),
          id
        });
        return null;
      }
      
      try {
        console.log('[useGetSubmission] Fetching submission', {
          timestamp: new Date().toISOString(),
          id
        });
        
        const result = await actor.getSubmission(id);
        
        console.log('[useGetSubmission] Successfully fetched submission', {
          timestamp: new Date().toISOString(),
          id,
          found: !!result
        });
        
        return result;
      } catch (error) {
        console.error('[useGetSubmission] Error fetching submission:', {
          timestamp: new Date().toISOString(),
          id,
          error,
          errorType: typeof error,
          errorConstructor: error?.constructor?.name,
          errorName: error instanceof Error ? error.name : 'Unknown',
          errorMessage: error instanceof Error ? error.message : String(error),
          errorStack: error instanceof Error ? error.stack : undefined,
        });
        
        if (error instanceof Error) {
          const message = error.message.toLowerCase();
          
          if (message.includes('authenticated') || message.includes('internet identity') || message.includes('anonymous')) {
            throw new Error('Authentication required. Please log in with Internet Identity to view this submission.');
          }
          
          if (message.includes('network') || message.includes('fetch failed') || message.includes('failed to fetch')) {
            throw new Error('Network error. Please check your internet connection and try again.');
          }
          
          if (message.includes('timeout') || message.includes('timed out') || message.includes('deadline')) {
            throw new Error('Request timed out. Please try again.');
          }
          
          throw new Error(`Failed to load submission: ${error.message}`);
        }
        
        throw new Error('Failed to load submission. Please check your connection and try again.');
      }
    },
    enabled: !!actor && !isFetching && !!id,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 5000),
  });
}
