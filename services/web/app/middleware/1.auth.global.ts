import { useUserStore } from "~/stores/user";

/**
 * Enabled by default, disable with meta.auth = false
 */
export default defineNuxtRouteMiddleware(async (to) => {
  const userStore = useUserStore();
  const navigateTo = useNavigateTo();

  const isAuthDisabled: boolean = to.meta.auth === false;

  if (isAuthDisabled) {
    return;
  }

  if (!userStore.isLoaded) {
    await userStore.fetchUser();
  }

  if (!userStore.isAuthenticated) {
    return navigateTo({ name: "login" });
  }
});
