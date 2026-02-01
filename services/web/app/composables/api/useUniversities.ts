import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { universityApi } from "~/lib/api/modules/university";
import type { UniversityCreate } from "~/lib/api/schemas";

export const universityKeys = {
  all: ["universities"] as const,
  lists: () => [...universityKeys.all, "list"] as const,
  list: (params?: unknown) => [...universityKeys.lists(), params] as const,
  details: () => [...universityKeys.all, "detail"] as const,
  detail: (id: number) => [...universityKeys.details(), id] as const,
};

export function useUniversities(
  params?: MaybeRef<{ page?: number; limit?: number }>,
) {
  return useQuery({
    queryKey: computed(() => universityKeys.list(unref(params))),
    queryFn: () => universityApi.getAll(unref(params)),
  });
}

export function useUniversity(id: MaybeRef<number>) {
  return useQuery({
    queryKey: computed(() => universityKeys.detail(unref(id))),
    queryFn: () => universityApi.getById(unref(id)),
    enabled: computed(() => !!unref(id)),
  });
}

export function useCreateUniversity() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: universityApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: universityKeys.lists() });
    },
  });
}

export function useUpdateUniversity() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UniversityCreate }) =>
      universityApi.update(id, data),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(universityKeys.detail(variables.id), data);
      queryClient.invalidateQueries({ queryKey: universityKeys.lists() });
    },
  });
}

export function useDeleteUniversity() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: universityApi.delete,
    onSuccess: (_, id) => {
      queryClient.removeQueries({ queryKey: universityKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: universityKeys.lists() });
    },
  });
}
