import { apiClient } from "../client";
import type { CourseGroup, CourseGroupCreate } from "~/lib/api/schemas";
import type { Paginated } from "../client-v2";

const basePath = "/api/teaching/course-groups";

export const courseGroupApi = {
  getAll: () => apiClient.get<Paginated<CourseGroup>>(basePath),

  getById: (id: number) => apiClient.get<CourseGroup>(`${basePath}/${id}`),

  create: (data: CourseGroupCreate) =>
    apiClient.post<CourseGroup>(basePath + "/", data),

  update: (id: number, data: CourseGroupCreate) =>
    apiClient.patch<CourseGroup>(`${basePath}/${id}/`, data),

  delete: (id: number) => apiClient.delete(`${basePath}/${id}/`),
};
