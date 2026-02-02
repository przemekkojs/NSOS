import { apiClient } from "../client";
import type { Semester, SemesterCreate } from "~/lib/api/schemas";
import type { Paginated } from "../client-v2";

const basePath = "/api/university/semesters";

export const semesterApi = {
  getAll: () => apiClient.get<Paginated<Semester>>(basePath),

  getById: (id: number) => apiClient.get<Semester>(`${basePath}/${id}/`),

  create: (data: SemesterCreate) =>
    apiClient.post<Semester>(basePath + "/", data),

  update: (id: number, data: SemesterCreate) =>
    apiClient.patch<Semester>(`${basePath}/${id}/`, data),

  delete: (id: number) => apiClient.delete(`${basePath}/${id}/`),
};
