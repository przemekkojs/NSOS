import { apiClient } from '../client'

export interface User {
  id: number
  name: string
  email: string
  role: string
}

export interface CreateUserDto {
  name: string
  email: string
  password: string
}

export interface UpdateUserDto {
  name?: string
  email?: string
}

export const userApi = {
  me: () => apiClient.get<User>('/users/me'),

  getAll: (params?: { page?: number; limit?: number }) =>
    apiClient.get<User[]>('/users', {
      headers: params ? { 'X-Query': JSON.stringify(params) } : {},
    }),

  getById: (id: number) => apiClient.get<User>(`/users/${id}`),

  create: (data: CreateUserDto) => apiClient.post<User>('/users', data),

  update: (id: number, data: UpdateUserDto) => apiClient.patch<User>(`/users/${id}`, data),

  delete: (id: number) => apiClient.delete<void>(`/users/${id}`),
}
