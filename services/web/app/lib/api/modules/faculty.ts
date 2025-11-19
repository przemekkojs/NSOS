import { apiClient } from "../client";
import type { Faculty, FacultyCreate } from "~/lib/api/schemas";

const basePath = "/api/university/faculties";

export const facultyApi = {
  getAll: (params?: { page?: number; limit?: number }) =>
    apiClient.get<Faculty[]>(basePath, {
      headers: params ? { "X-Query": JSON.stringify(params) } : {},
    }),

  getById: (id: number) => apiClient.get<Faculty>(`${basePath}/${id}`),

  create: (data: FacultyCreate) => apiClient.post<Faculty>(basePath, data),

  update: (id: number, data: FacultyCreate) =>
    apiClient.patch<Faculty>(`${basePath}/${id}`, data),

  delete: (id: number) => apiClient.delete(`${basePath}/${id}`),
};
