import { useQuery, useMutation, useQueryClient } from "@tanstack/vue-query";
import { lecturerApi } from "~/lib/api/modules/lecturer";
import type { LecturerCreate } from "~/lib/api/schemas";

export const lecturerKeys = {
  all: ["lecturers"] as const,
  lists: () => [...lecturerKeys.all, "list"] as const,
  list: (params?: unknown) => [...lecturerKeys.lists(), params] as const,
  details: () => [...lecturerKeys.all, "detail"] as const,
  detail: (id: number) => [...lecturerKeys.details(), id] as const,
};

export function useLecturers(
  params?: MaybeRef<{ page?: number; limit?: number }>,
) {
  return useQuery({
    queryKey: lecturerKeys.list(unref(params)),
    queryFn: () => lecturerApi.getAll(unref(params)),
  });
}

export function useLecturer(id: MaybeRef<number>) {
  return useQuery({
    queryKey: computed(() => lecturerKeys.detail(unref(id))),
    queryFn: () => lecturerApi.getById(unref(id)),
    enabled: computed(() => !!unref(id)),
  });
}

export function useCreateLecturer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: lecturerApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: lecturerKeys.lists() });
    },
  });
}

export function useUpdateLecturer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: LecturerCreate }) =>
      lecturerApi.update(id, data),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(lecturerKeys.detail(variables.id), data);
      queryClient.invalidateQueries({ queryKey: lecturerKeys.lists() });
    },
  });
}

export function useDeleteLecturer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: lecturerApi.delete,
    onSuccess: (_, id) => {
      queryClient.removeQueries({ queryKey: lecturerKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: lecturerKeys.lists() });
    },
  });
}
