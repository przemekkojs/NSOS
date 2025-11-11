import { apiClient } from '../client'
import type { User } from '@/core/types'

export interface Credentials {
  email: string
  password: string
}

export const authApi = {
  login: (data: Credentials) =>
    apiClient.post<User>('/auth/login', data, {
      credentials: 'include',
    }),

  register: (data: Credentials) =>
    apiClient.post<User>('/auth/register', data, {
      credentials: 'include',
    }),
  logout: () => apiClient.post('/auth/logout'),
}
