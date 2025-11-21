import { apiClient } from "../client";
import type { User } from "~/lib/api/schemas";

export interface Credentials {
  email: string;
  password: string;
}

export const authApi = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login: (data: Credentials) =>
    // FIXME: Temporary workaround until we have proper auth
    apiClient.get<User>("/api/users/users/1/", {
      credentials: "include",
    }),

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  register: (data: Credentials) =>
    apiClient.get<User>("/api/users/users/1/", {
      credentials: "include",
    }),
  logout: () => apiClient.post("/auth/logout/"),
};
