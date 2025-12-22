import { apiClient } from "../client-v2";
import type { User } from "~/lib/api/schemas";

export interface Credentials {
  email: string;
  password: string;
}

const baseUrl = `/_allauth/browser/v1`;

export const authApi = {
  login: (data: Credentials) =>
    apiClient.post<{ data: { user: User } }>(`${baseUrl}/auth/login`, data),

  register: (data: Credentials) =>
    apiClient.post<User>(`${baseUrl}/auth/signup`, data),
  logout: () => apiClient.delete(`${baseUrl}/auth/session`),
  session: () =>
    apiClient.get<{
      status: number;
      data: {
        user: User;
        flows?: unknown;
      };
    }>(`${baseUrl}/auth/session`),
};
