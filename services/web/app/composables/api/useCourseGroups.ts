import { courseGroupApi } from "~/lib/api/modules/course-groups";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import type { CourseGroupCreate } from "~/lib/api/schemas";

export const courseGroupsKeys = {
  all: ["course-groups"] as const,
  lists: () => [...courseGroupsKeys.all, "list"] as const,
  list: (params?: unknown) => [...courseGroupsKeys.lists(), params] as const,
  details: () => [...courseGroupsKeys.all, "detail"] as const,
  detail: (id: number) => [...courseGroupsKeys.details(), id] as const,
};

export function useCourseGroups() {
  return useQuery({
    queryKey: courseGroupsKeys.list(),
    queryFn: courseGroupApi.getAll,
  });
}

export function useCourseGroup(id: MaybeRef<number>) {
  return useQuery({
    queryKey: coursesKeys.detail(unref(id)),
    queryFn: () => courseGroupApi.getById(unref(id)),
  });
}

export function useCreateCourseGroup() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: courseGroupApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: coursesKeys.lists() });
    },
  });
}

export function useUpdateCourseGroup() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: CourseGroupCreate }) =>
      courseGroupApi.update(id, data),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(coursesKeys.detail(variables.id), data);
      queryClient.invalidateQueries({ queryKey: coursesKeys.lists() });
    },
  });
}

export function useDeleteCourseGroup() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: courseGroupApi.delete,
    onSuccess: (_, id) => {
      queryClient.removeQueries({ queryKey: coursesKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: coursesKeys.lists() });
    },
  });
}
