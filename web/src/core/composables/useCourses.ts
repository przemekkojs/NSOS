import { courseApi, type UpdateCourseDto } from '@/api/modules/courses'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'

export const coursesKeys = {
  all: ['courses'] as const,
  lists: () => [...coursesKeys.all, 'list'] as const,
  list: (params?: unknown) => [...coursesKeys.lists(), params] as const,
  details: () => [...coursesKeys.all, 'detail'] as const,
  detail: (id: number) => [...coursesKeys.details(), id] as const,
}

export function useCourses() {
  return useQuery({
    queryKey: coursesKeys.list(),
    queryFn: courseApi.getAll,
  })
}

export function useCourse(id: MaybeRef<number>) {
  return useQuery({
    queryKey: coursesKeys.detail(unref(id)),
    queryFn: () => courseApi.getById(unref(id)),
  })
}

export function useCreateCourse() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: courseApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: coursesKeys.lists() })
    },
  })
}

export function useUpdateCourse() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateCourseDto }) => courseApi.update(id, data),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(coursesKeys.detail(variables.id), data)
      queryClient.invalidateQueries({ queryKey: coursesKeys.lists() })
    },
  })
}

export function useDeleteCourse() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: courseApi.delete,
    onSuccess: (_, id) => {
      queryClient.removeQueries({ queryKey: coursesKeys.detail(id) })
      queryClient.invalidateQueries({ queryKey: coursesKeys.lists() })
    },
  })
}
