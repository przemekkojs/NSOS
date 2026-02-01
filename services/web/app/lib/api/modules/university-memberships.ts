import { apiClient } from "../client";
import type {
  UniversityCreate,
  University,
  UniversityMembership,
} from "~/lib/api/schemas";
import type { Paginated } from "../client-v2";

const basePath = "/api/university/memberships";

export const universityApi = {
  getAll: (params?: { page?: number; limit?: number }) =>
    apiClient.get<Paginated<UniversityMembership>>(basePath, {
      headers: params ? { "X-Query": JSON.stringify(params) } : {},
    }),

  getById: (id: number) => apiClient.get<University>(`${basePath}/${id}`),

  create: (data: UniversityCreate) =>
    apiClient.post<University>(basePath + "/", data),

  update: (id: number, data: UniversityCreate) =>
    apiClient.patch<University>(`/${basePath}/${id}/`, data),

  delete: (id: number) => apiClient.delete(`/${basePath}/${id}/`),
};
