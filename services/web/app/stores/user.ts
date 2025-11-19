import { defineStore } from "pinia";
import type { User, Lecturer, Student, Permission } from "~/api/schemas";

export function isUser(obj: unknown): obj is User {
  if (typeof obj !== "object" || obj === null) {
    return false;
  }
  return "id" in (obj as User);
}

export function isLecturer(obj: unknown): obj is Lecturer {
  if (!isUser(obj)) return false;

  return (obj as Lecturer).position !== undefined;
}

export function isStudent(obj: unknown): obj is Student {
  if (!isUser(obj)) return false;

  return (obj as Student).index_number !== undefined;
}

export const useUserStore = defineStore(
  "user",
  () => {
    const user = ref<User>();

    const isAuthenticated = computed((): boolean => {
      return isUser(user.value);
    });

    function hasPermission(
      permission: Permission,
      resourceId?: number
    ): boolean {
      if (!isUser(user.value)) {
        return false;
      }

      if (!user.value.permissions) {
        return false;
      }

      // additional check for viewing self
      if (permission === "users.view_user" && resourceId) {
        return user.value.id === resourceId;
      }

      return user.value.permissions.includes(permission);
    }

    function logout() {
      user.value = undefined;
    }

    function setUser(newUser: User) {
      user.value = newUser;
    }

    const fullName = computed<string | undefined>(() => {
      if (!isUser(user.value)) return;

      const { first_name, last_name } = user.value;

      if (first_name || last_name) {
        return (first_name ?? "") + " " + (last_name ?? "");
      }
    });

    return {
      user,
      isAuthenticated,
      hasPermission,
      logout,
      setUser,
      fullName,
    };
  },
  {
    storage: "localStorage",
  }
);
