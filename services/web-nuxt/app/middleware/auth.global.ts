import { useUserStore } from "~~/features/auth/stores/user-store";
import { navigateTo } from "@typed-router";

const authRoutes = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
];

export default defineNuxtRouteMiddleware((to) => {
  const userStore = useUserStore();

  if (!userStore.isAuthenticated && !authRoutes.includes(to.path)) {
    return navigateTo("/login");
  } else if (userStore.isAuthenticated && authRoutes.includes(to.path)) {
    return navigateTo("/");
  }
});
