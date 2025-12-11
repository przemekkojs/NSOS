import { apiClient } from "../client";
import type { InstitutionCreate, Institution } from "~/lib/api/schemas";

export const institutionApi = {
  getAll: (params?: { page?: number; limit?: number }) =>
    apiClient.get<Institution[]>("/institutions", {
      headers: params ? { "X-Query": JSON.stringify(params) } : {},
    }),

  getById: (id: number) => apiClient.get<Institution>(`/institutions/${id}`),

  create: (data: InstitutionCreate) =>
    apiClient.post<Institution>("/institutions", data),

  update: (id: number, data: InstitutionCreate) =>
    apiClient.patch<Institution>(`/institutions/${id}`, data),

  delete: (id: number) => apiClient.delete(`/institutions/${id}`),
};
