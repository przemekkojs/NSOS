import { useQuery, useMutation, useQueryClient } from "@tanstack/vue-query";
import { positionApi } from "~/lib/api/modules/positions";
import type { PositionCreate } from "~/lib/api/schemas";

export const positionKeys = {
  all: ["positions"] as const,
  lists: () => [...positionKeys.all, "list"] as const,
  list: (params?: unknown) => [...positionKeys.lists(), params] as const,
  details: () => [...positionKeys.all, "detail"] as const,
  detail: (id: number) => [...positionKeys.details(), id] as const,
};

export function usePositions(
  params?: MaybeRef<{ page?: number; limit?: number }>,
) {
  return useQuery({
    queryKey: positionKeys.list(unref(params)),
    queryFn: () => positionApi.getAll(unref(params)),
  });
}

export function usePosition(id: MaybeRef<number>) {
  return useQuery({
    queryKey: computed(() => positionKeys.detail(unref(id))),
    queryFn: () => positionApi.getById(unref(id)),
    enabled: computed(() => !!unref(id)),
  });
}

export function useCreatePosition() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: positionApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: positionKeys.lists() });
    },
  });
}

export function useUpdatePosition() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: PositionCreate }) =>
      positionApi.update(id, data),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(positionKeys.detail(variables.id), data);
      queryClient.invalidateQueries({ queryKey: positionKeys.lists() });
    },
  });
}

export function useDeletePosition() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: positionApi.delete,
    onSuccess: (_, id) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: positionKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: positionKeys.lists() });
    },
  });
}
