import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import type { MaybeRef } from 'vue'
import { userApi } from '@/api/modules/user'
import type { UpdateUserDto } from '@/features/users/schemas'

export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (params?: unknown) => [...userKeys.lists(), params] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: number) => [...userKeys.details(), id] as const,
  me: () => [...userKeys.all, 'me'] as const,
}

export function useMe() {
  return useQuery({
    queryKey: userKeys.me(),
    queryFn: userApi.me,
    staleTime: 5 * 60 * 1000,
  })
}

export function useUsers(params?: MaybeRef<{ page?: number; limit?: number }>) {
  return useQuery({
    queryKey: userKeys.list(unref(params)),
    queryFn: () => userApi.getAll(unref(params)),
  })
}

export function useUser(id: MaybeRef<number>) {
  return useQuery({
    queryKey: computed(() => userKeys.detail(unref(id))),
    queryFn: () => userApi.getById(unref(id)),
    enabled: computed(() => !!unref(id)),
  })
}

export function useCreateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: userApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() })
    },
  })
}

export function useUpdateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateUserDto }) => userApi.update(id, data),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(userKeys.detail(variables.id), data)
      queryClient.invalidateQueries({ queryKey: userKeys.lists() })
      queryClient.invalidateQueries({ queryKey: userKeys.me() })
    },
  })
}

export function useDeleteUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: userApi.delete,
    onSuccess: (_, id) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: userKeys.detail(id) })
      queryClient.invalidateQueries({ queryKey: userKeys.lists() })
    },
  })
}

export function useInviteUser() {
  return useMutation({
    mutationFn: userApi.invite,
  })
}
