import { useUserStore } from "~/stores/user";
import { navigateTo } from "@typed-router";

export default defineNuxtRouteMiddleware(() => {
  const userStore = useUserStore();
  const localeRoute = useLocaleRoute();
  const nuxtApp = useNuxtApp();
  const locale = nuxtApp.$i18n.locale.value;

  const loginRoute = localeRoute({ name: "login" }, locale);

  if (!userStore.isAuthenticated) {
    return navigateTo(loginRoute.fullPath);
  }
});
