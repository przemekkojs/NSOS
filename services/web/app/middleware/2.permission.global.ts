/**
 * Allows navigation when user has specified permission
 */
export default defineNuxtRouteMiddleware((to) => {
  const permission = to.meta.permission;

  const userStore = useUserStore();
  const { $i18n } = useNuxtApp();
  const t = $i18n.t;

  if (!permission) return;

  if (!userStore.hasPermission(permission)) {
    return abortNavigation({
      message: t("page.error.permission", { permission }),
    });
  }
});
