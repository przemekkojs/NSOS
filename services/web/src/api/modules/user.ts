import { apiClient } from '../client'
import type { CreateUserDto, UpdateUserDto } from '@/features/users/schemas'
import type { User } from '@/core/types'

export const userApi = {
  me: () => apiClient.get<User>('/users/me'),

  getAll: (params?: { page?: number; limit?: number }) =>
    apiClient.get<User[]>('/users', {
      headers: params ? { 'X-Query': JSON.stringify(params) } : {},
    }),

  getById: (id: number) => apiClient.get<User>(`/users/${id}`),

  create: (data: CreateUserDto | CreateUserDto[]) => apiClient.post<User>('/users', data),

  update: (id: number, data: UpdateUserDto) => apiClient.patch<User>(`/users/${id}`, data),

  delete: (id: number) => apiClient.delete<void>(`/users/${id}`),

  invite: (email: string | string[]) => apiClient.post<void>('/users/invite', { email }),
}
