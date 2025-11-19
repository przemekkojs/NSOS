import { apiClient } from "../client";
import type { Course, CourseCreate } from "~/lib/api/schemas";

const basePath = "/api/teaching/courses";

export const courseApi = {
  getAll: () => apiClient.get<Course[]>(basePath),

  getById: (id: number) => apiClient.get<Course>(`${basePath}/${id}`),

  create: (data: CourseCreate) =>
    apiClient.post<Course | Course[]>(basePath, data),

  update: (id: number, data: CourseCreate) =>
    apiClient.patch<Course>(`${basePath}/${id}`, data),

  delete: (id: number) => apiClient.delete(`${basePath}/${id}`),
};
