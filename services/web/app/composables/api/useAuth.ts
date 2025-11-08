import { authApi } from "~/lib/api/modules/auth";
import { useMutation } from "@tanstack/vue-query";
import { useUserStore } from "~/stores/user";

export function useLogin() {
  const navigateTo = useNavigateTo();

  return useMutation({
    mutationFn: authApi.login,
    async onSuccess({ data }) {
      const store = useUserStore();

      store.setUser(data.user);
      await navigateTo({ name: "index" });
    },
  });
}

export function useRegister() {
  const navigateTo = useNavigateTo();
  return useMutation({
    mutationFn: authApi.register,
    async onSuccess() {
      await navigateTo({ name: "index" });
    },
  });
}

export function useLogout() {
  const userStore = useUserStore();
  const navigateTo = useNavigateTo();
  const toast = useToast();
  return useMutation({
    mutationFn: authApi.logout,
    // TODO: move that to global error handler
    async onError(error) {
      // @ts-expect-error data does not exist on error
      const status = error?.data?.status;

      if (!status) {
        toast.add({
          color: "error",
          title: "Logout Failed",
          description: "An error occurred while logging out. Please try again.",
        });
      }

      // REVIEW: it seems like the user is properly logged out with 401 status which is unusual
      // https://docs.allauth.org/en/dev/headless/openapi-specification/#tag/Authentication:-Current-Session/paths/~1_allauth~1%7Bclient%7D~1v1~1auth~1session/delete
      if (status === 401) {
        userStore.logout();
        await navigateTo({ name: "login" });
      }
    },
  });
}

export function useAuth() {
  const userStore = useUserStore();
  function isAuthenticated(): boolean {
    return userStore.isAuthenticated;
  }

  return {
    userStore,
    isAuthenticated,
  };
}
