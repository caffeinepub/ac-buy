import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Submission } from '../backend';

export function useGetAllSubmissions() {
  const { actor, isFetching } = useActor();

  return useQuery<Submission[]>({
    queryKey: ['submissions'],
    queryFn: async () => {
      if (!actor) {
        console.warn('[useGetAllSubmissions] Actor not initialized');
        return [];
      }
      
      try {
        console.log('[useGetAllSubmissions] Fetching submissions at', new Date().toISOString());
        const result = await actor.getAllSubmissions();
        console.log('[useGetAllSubmissions] Successfully fetched', result.length, 'submissions');
        return result;
      } catch (error) {
        console.error('[useGetAllSubmissions] Error fetching submissions:', {
          timestamp: new Date().toISOString(),
          error: error instanceof Error ? error.message : String(error),
          errorDetails: error,
        });
        
        // Transform backend authentication errors into user-friendly messages
        if (error instanceof Error) {
          if (error.message.includes('authenticated') || error.message.includes('Internet Identity')) {
            throw new Error('Authentication required. Please log in to view submissions.');
          }
          throw new Error(`Failed to load submissions: ${error.message}`);
        }
        
        throw new Error('Failed to load submissions. Please check your connection and try again.');
      }
    },
    enabled: !!actor && !isFetching,
    refetchOnWindowFocus: true,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 5000),
  });
}

export function useGetSubmission(id: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Submission | null>({
    queryKey: ['submission', id],
    queryFn: async () => {
      if (!actor) {
        console.warn('[useGetSubmission] Actor not initialized');
        return null;
      }
      
      try {
        console.log('[useGetSubmission] Fetching submission with id:', id);
        const result = await actor.getSubmission(id);
        console.log('[useGetSubmission] Successfully fetched submission');
        return result;
      } catch (error) {
        console.error('[useGetSubmission] Error fetching submission:', {
          timestamp: new Date().toISOString(),
          id,
          error: error instanceof Error ? error.message : String(error),
          errorDetails: error,
        });
        
        if (error instanceof Error) {
          if (error.message.includes('authenticated') || error.message.includes('Internet Identity')) {
            throw new Error('Authentication required. Please log in to view this submission.');
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
