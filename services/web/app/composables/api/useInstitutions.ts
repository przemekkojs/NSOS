import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { institutionApi } from "~/lib/api/modules/intitution";
import type { InstitutionCreate } from "~/lib/api/schemas";

export const institutionKeys = {
  all: ["institutions"] as const,
  lists: () => [...institutionKeys.all, "list"] as const,
  list: (params?: unknown) => [...institutionKeys.lists(), params] as const,
  details: () => [...institutionKeys.all, "detail"] as const,
  detail: (id: number) => [...institutionKeys.details(), id] as const,
};

export function useInstitutions(
  params?: MaybeRef<{ page?: number; limit?: number }>
) {
  return useQuery({
    queryKey: computed(() => institutionKeys.list(unref(params))),
    queryFn: () => institutionApi.getAll(unref(params)),
  });
}

export function useInstitution(id: MaybeRef<number>) {
  return useQuery({
    queryKey: computed(() => institutionKeys.detail(unref(id))),
    queryFn: () => institutionApi.getById(unref(id)),
    enabled: computed(() => !!unref(id)),
  });
}

export function useCreateInstitution() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: institutionApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: institutionKeys.lists() });
    },
  });
}

export function useUpdateInstitution() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: InstitutionCreate }) =>
      institutionApi.update(id, data),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(institutionKeys.detail(variables.id), data);
      queryClient.invalidateQueries({ queryKey: institutionKeys.lists() });
    },
  });
}

export function useDeleteInstitution() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: institutionApi.delete,
    onSuccess: (_, id) => {
      queryClient.removeQueries({ queryKey: institutionKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: institutionKeys.lists() });
    },
  });
}
