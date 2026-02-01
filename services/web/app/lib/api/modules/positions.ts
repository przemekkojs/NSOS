import { apiClient } from "../client";
import type { Position, PositionCreate } from "~/lib/api/schemas";
import type { Paginated } from "../client-v2";

const basePath = "/api/university/positions";

export const positionApi = {
  getAll: (params?: { page?: number; limit?: number }) =>
    apiClient.get<Paginated<Position>>(basePath, {
      headers: params ? { "X-Query": JSON.stringify(params) } : {},
    }),

  getById: (id: number) => apiClient.get<Position>(`${basePath}/${id}`),

  create: (data: PositionCreate) =>
    apiClient.post<Position>(basePath + "/", data),

  update: (id: number, data: PositionCreate) =>
    apiClient.patch<Position>(`${basePath}/${id}/`, data),

  delete: (id: number) => apiClient.delete(`${basePath}/${id}/`),
};
