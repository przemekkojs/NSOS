import { useUserStore } from "~/stores/user";
import { navigateTo } from "@typed-router";

export default defineNuxtRouteMiddleware(() => {
  const userStore = useUserStore();

  if (!userStore.isAuthenticated) {
    return navigateTo("/");
  }
});
