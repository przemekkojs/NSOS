import { apiClient } from "../client";
import type { Course, CourseCreate } from "~/lib/api/schemas";
import type { Paginated } from "../client-v2";

const basePath = "/api/teaching/courses";

export const courseApi = {
  getAll: () => apiClient.get<Paginated<Course>>(basePath),

  getById: (id: number) => apiClient.get<Course>(`${basePath}/${id}`),

  create: (data: CourseCreate) => apiClient.post<Course>(basePath + "/", data),

  update: (id: number, data: CourseCreate) =>
    apiClient.patch<Course>(`${basePath}/${id}/`, data),

  delete: (id: number) => apiClient.delete(`${basePath}/${id}/`),
};
