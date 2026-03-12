import { useQuery } from "@tanstack/react-query";
import type { Notice } from "../backend";
import { useActor } from "./useActor";

export function useGetAllNotices() {
  const { actor, isFetching } = useActor();

  return useQuery<Notice[]>({
    queryKey: ["notices"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllNotices();
    },
    enabled: !!actor && !isFetching,
  });
}
