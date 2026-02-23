import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Submission } from '../backend';

export function useGetAllSubmissions() {
  const { actor, isFetching } = useActor();

  return useQuery<Submission[]>({
    queryKey: ['submissions'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllSubmissions();
    },
    enabled: !!actor && !isFetching,
    refetchOnWindowFocus: true,
  });
}

export function useGetSubmission(id: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Submission | null>({
    queryKey: ['submission', id],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getSubmission(id);
    },
    enabled: !!actor && !isFetching && !!id,
  });
}
