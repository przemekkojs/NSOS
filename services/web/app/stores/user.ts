import { defineStore } from "pinia";
import type { User, Lecturer, Student, Permission } from "~/lib/api/schemas";
import { authApi } from "~/lib/api/modules/auth";
import { userApi } from "~/lib/api/modules/user";
import { computed, ref } from "vue";

export function isUser(obj: unknown): obj is User {
  if (typeof obj !== "object" || obj === null) {
    return false;
  }
  return "id" in (obj as User);
}

export function isLecturer(obj: unknown): obj is Lecturer {
  return (obj as Lecturer).position !== undefined;
}

export function isStudent(obj: unknown): obj is Student {
  return (obj as Student).index_number !== undefined;
}

export const useUserStore = defineStore("user", () => {
  const user = ref<User | null>(null);
  const isLoaded = ref<boolean>(false);
  const isAuthenticating = ref(false);

  const isAuthenticated = computed((): boolean => {
    return isUser(user.value);
  });

  function hasPermission(permission: Permission, resourceId?: number): boolean {
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

  /**
   * Fetch current user from django-allauth
   * This verifies authentication with the backend
   */
  async function fetchUser(): Promise<User | null> {
    if (isAuthenticating.value) {
      // Prevent multiple simultaneous requests
      return user.value;
    }

    try {
      isAuthenticating.value = true;

      const response = await authApi.session();

      const _user = await userApi.getById(response.data.user.id);

      if (response.data.user) {
        user.value = _user;
        isLoaded.value = true;
        return _user;
      } else {
        user.value = null;
        isLoaded.value = true;
        return null;
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
      user.value = null;
      isLoaded.value = true;
      return null;
    } finally {
      isAuthenticating.value = false;
    }
  }

  function logout() {
    user.value = null;
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
    isLoaded,
    isAuthenticated,
    hasPermission,
    fetchUser,
    logout,
    setUser,
    fullName,
  };
});
