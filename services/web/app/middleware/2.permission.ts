/**
 * Allows navigation when user has specified permission
 */
export default defineNuxtRouteMiddleware((to) => {
  const permission = to.meta.permission;

  const userStore = useUserStore();

  if (!permission) return;

  if (!userStore.hasPermission(permission)) {
    const { t } = useI18n();
    return abortNavigation({
      message: t("page.error.permission", { permission }),
    });
  }
});
