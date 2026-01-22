import { apiClient } from "../client";
import type { User, UserUpdate } from "~/lib/api/schemas";

const basePath = "/api/users/users";

export const userApi = {
  me: () => apiClient.get<User>("/users/me"),

  getAll: (params?: { page?: number; limit?: number }) =>
    apiClient.get<User[]>(basePath, {
      headers: params ? { "X-Query": JSON.stringify(params) } : {},
    }),

  getById: (id: number) => apiClient.get<User>(`${basePath}/${id}/`),

  create: (data: UserUpdate) => apiClient.post<User>(basePath, data),

  update: (id: number, data: UserUpdate) =>
    apiClient.patch<User>(`${basePath}/${id}/`, data),

  delete: (id: number) => apiClient.delete(`${basePath}/${id}/`),

  invite: (email: string | string[]) =>
    apiClient.post("/users/invite", { email }),
};
