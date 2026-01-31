import { apiClient } from "./client";
import type { Paginated } from "./client-v2";

type ApiOptions = {
  basePath: string;
};

export function apiFactory<
  Resource,
  ResourceCreate,
  ResourceUpdate = ResourceCreate,
>(options: ApiOptions) {
  const basePath = options.basePath;

  return {
    getAll: (params?: { page?: number; limit?: number }) =>
      apiClient.get<Paginated<Resource>>(basePath + "/", {
        headers: params ? { "X-Query": JSON.stringify(params) } : {},
      }),

    getById: (id: number) => apiClient.get<Resource>(`${basePath}/${id}/`),

    create: (data: ResourceCreate) =>
      apiClient.post<Resource>(basePath + "/", data),

    update: (id: number, data: ResourceUpdate) =>
      apiClient.patch<Resource>(`${basePath}/${id}/`, data),

    delete: (id: number) => apiClient.delete(`${basePath}/${id}/`),
  };
}
