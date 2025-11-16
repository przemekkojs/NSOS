import { useUserStore } from "~/stores/user-store";
import { navigateTo } from "@typed-router";

const _authRoutes = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
];

function getLocalizedPaths(paths: string[]) {
  const nuxtApp = useNuxtApp();
  const locale = nuxtApp.$i18n.locale.value;
  const defaultLocale = nuxtApp.$i18n.defaultLocale;

  if (locale === defaultLocale) {
    return paths;
  }

  return paths.map((path) => `/${locale}${path}`);
}

const bypassAuth = ["/support"];

export default defineNuxtRouteMiddleware(async (to, from) => {
  const userStore = useUserStore();
  const localeRoute = useLocaleRoute();
  const nuxtApp = useNuxtApp();
  const locale = nuxtApp.$i18n.locale.value;
  const loginRoute = localeRoute({ name: "login" }, locale);
  const defaultRoute = localeRoute({ name: "index" }, locale);
  const authRoutes = getLocalizedPaths(_authRoutes);
  // if (bypassAuth.some((path) => to.path.startsWith(path))) {
  //   return;
  // }
  if (to.path === from.path) {
    return;
  } else if (!userStore.isAuthenticated && !authRoutes.includes(to.path)) {
    return navigateTo(loginRoute.fullPath);
  } else if (userStore.isAuthenticated && authRoutes.includes(to.path)) {
    return navigateTo(defaultRoute.fullPath);
  }
});
