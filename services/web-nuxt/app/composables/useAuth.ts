import { authApi } from "~/api/modules/auth";
import { useMutation } from "@tanstack/vue-query";
import { useUserStore } from "~/stores/user-store";

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
  return useMutation({
    mutationFn: authApi.logout,
    onSuccess() {
      userStore.logout();
    },
  });
}
