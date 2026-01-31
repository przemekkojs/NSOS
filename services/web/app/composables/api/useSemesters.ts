import { semesterApi } from "~/lib/api/modules/semesters";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import type { SemesterCreate } from "~/lib/api/schemas";

export const semestersKeys = {
  all: ["semesters"] as const,
  lists: () => [...semestersKeys.all, "list"] as const,
  list: (params?: unknown) => [...semestersKeys.lists(), params] as const,
  details: () => [...semestersKeys.all, "detail"] as const,
  detail: (id: number) => [...semestersKeys.details(), id] as const,
};

export function useSemesters() {
  return useQuery({
    queryKey: semestersKeys.list(),
    queryFn: semesterApi.getAll,
  });
}

export function useSemester(id: MaybeRef<number>) {
  return useQuery({
    queryKey: semestersKeys.detail(unref(id)),
    queryFn: () => semesterApi.getById(unref(id)),
  });
}

export function useCreateSemester() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: semesterApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: semestersKeys.lists() });
    },
  });
}

export function useUpdateSemester() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: SemesterCreate }) =>
      semesterApi.update(id, data),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(semestersKeys.detail(variables.id), data);
      queryClient.invalidateQueries({ queryKey: semestersKeys.lists() });
    },
  });
}

export function useDeleteSemester() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: semesterApi.delete,
    onSuccess: (_, id) => {
      queryClient.removeQueries({ queryKey: semestersKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: semestersKeys.lists() });
    },
  });
}
