import { useQuery, useMutation, useQueryClient } from "@tanstack/vue-query";
import { classApi } from "~/lib/api/modules/classes";
import type { ClassCreate } from "~/lib/api/schemas";

export const classKeys = {
  all: ["classes"] as const,
  lists: () => [...classKeys.all, "list"] as const,
  list: (params?: unknown) => [...classKeys.lists(), params] as const,
  details: () => [...classKeys.all, "detail"] as const,
  detail: (id: number) => [...classKeys.details(), id] as const,
};

export function useClasses(
  params?: MaybeRef<{ page?: number; limit?: number }>,
) {
  return useQuery({
    queryKey: classKeys.list(unref(params)),
    queryFn: () => classApi.getAll(unref(params)),
  });
}

export function useClass(id: MaybeRef<number>) {
  return useQuery({
    queryKey: computed(() => classKeys.detail(unref(id))),
    queryFn: () => classApi.getById(unref(id)),
    enabled: computed(() => !!unref(id)),
  });
}

export function useCreateClass() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: classApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: classKeys.lists() });
    },
  });
}

export function useUpdateClass() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: ClassCreate }) =>
      classApi.update(id, data),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(classKeys.detail(variables.id), data);
      queryClient.invalidateQueries({ queryKey: classKeys.lists() });
    },
  });
}

export function useDeleteClass() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: classApi.delete,
    onSuccess: (_, id) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: classKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: classKeys.lists() });
    },
  });
}
