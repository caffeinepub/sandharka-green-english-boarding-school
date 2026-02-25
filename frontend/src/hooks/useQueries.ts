import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Notice } from '../backend';

export function useGetAllNotices() {
  const { actor, isFetching } = useActor();

  return useQuery<Notice[]>({
    queryKey: ['notices'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllNotices();
    },
    enabled: !!actor && !isFetching,
  });
}
