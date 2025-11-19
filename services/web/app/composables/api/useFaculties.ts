import { useQuery, useMutation, useQueryClient } from "@tanstack/vue-query";
import { facultyApi } from "~/lib/api/modules/faculty";
import type { FacultyCreate } from "~/lib/api/schemas";

export const facultyKeys = {
  all: ["faculties"] as const,
  lists: () => [...facultyKeys.all, "list"] as const,
  list: (params?: unknown) => [...facultyKeys.lists(), params] as const,
  details: () => [...facultyKeys.all, "detail"] as const,
  detail: (id: number) => [...facultyKeys.details(), id] as const,
};

export function useFaculties(
  params?: MaybeRef<{ page?: number; limit?: number }>
) {
  return useQuery({
    queryKey: facultyKeys.list(unref(params)),
    queryFn: () => facultyApi.getAll(unref(params)),
  });
}

export function useFaculty(id: MaybeRef<number>) {
  return useQuery({
    queryKey: computed(() => facultyKeys.detail(unref(id))),
    queryFn: () => facultyApi.getById(unref(id)),
    enabled: computed(() => !!unref(id)),
  });
}

export function useCreateFaculty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: facultyApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: facultyKeys.lists() });
    },
  });
}

export function useUpdateFaculty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: FacultyCreate }) =>
      facultyApi.update(id, data),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(facultyKeys.detail(variables.id), data);
      queryClient.invalidateQueries({ queryKey: facultyKeys.lists() });
    },
  });
}

export function useDeleteFaculty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: facultyApi.delete,
    onSuccess: (_, id) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: facultyKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: facultyKeys.lists() });
    },
  });
}
