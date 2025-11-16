import { defineStore } from "pinia";
import type { User, Permission } from "~/api/schemas";

function isUser(obj: unknown): obj is User {
  return "id" in (obj as User);
}

export const useUserStore = defineStore("user", {
  state: (): Partial<User> => ({}),
  getters: {
    isAuthenticated(state): state is User {
      return isUser(state);
    },
    hasPermission: (state) => {
      return (permission: Permission): boolean => {
        if (!isUser(state)) {
          return false;
        }

        if (!state.permissions) {
          return false;
        }

        return state.permissions.includes(permission);
      };
    },
    // NOTE: placeholder for future avatar support
    avatar(): { src?: string } | undefined {
      return;
    },
  },
  actions: {
    logout() {
      this.$reset();
    },
    setUser(user: User) {
      this.$patch(user);
    },
  },
});
