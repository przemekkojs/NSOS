import { apiClient } from "../client";
import type { User, UserUpdate } from "~/lib/api/schemas";
import { apiFactory } from "../utils";

export const userApi = {
  ...apiFactory<User, UserUpdate>({
    basePath: "/api/users/users",
  }),

  me: () => apiClient.get<User>("/users/me"),
  invite: (email: string | string[]) =>
    apiClient.post("/users/invite", { email }),
};
