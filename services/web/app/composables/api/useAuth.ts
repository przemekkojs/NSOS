import { authApi } from "~/lib/api/modules/auth";
import { useMutation } from "@tanstack/vue-query";
import { useUserStore } from "~/stores/user";

export function useLogin() {
  const userStore = useUserStore();
  const navigateTo = useNavigateTo();

  return useMutation({
    mutationFn: authApi.login,
    async onSuccess(data) {
      userStore.setUser(data);
      await navigateTo({ path: "/" });
    },
  });
}

export function useRegister() {
  const userStore = useUserStore();
  const navigateTo = useNavigateTo();
  return useMutation({
    mutationFn: authApi.register,
    async onSuccess(data) {
      userStore.setUser(data);
      await navigateTo({ path: "/" });
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
    async onError() {
      toast.add({
        color: "error",
        title: "Logout Failed",
        description: "An error occurred while logging out. Please try again.",
      });
    },
    async onSuccess() {
      userStore.logout();
      await navigateTo({ path: "/login" });
    },
  });
}
