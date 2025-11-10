import type { Institution } from '@/mocks/fixtures'
import { apiClient } from '../client'
import type { CreateInstitutionDto, UpdateInstitutionDto } from '@/features/institutions/schemas'

export const institutionApi = {
  getAll: (params?: { page?: number; limit?: number }) =>
    apiClient.get<Institution[]>('/institutions', {
      headers: params ? { 'X-Query': JSON.stringify(params) } : {},
    }),

  getById: (id: number) => apiClient.get<Institution>(`/institutions/${id}`),

  create: (data: CreateInstitutionDto) => apiClient.post<Institution>('/institutions', data),

  update: (id: number, data: UpdateInstitutionDto) =>
    apiClient.patch<Institution>(`/institutions/${id}`, data),

  delete: (id: number) => apiClient.delete<void>(`/institutions/${id}`),
}
