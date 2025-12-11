/**
 * Allows navigation when user has specified permission
 */
export default defineNuxtRouteMiddleware((to) => {
  const permission = to.meta.permission;

  const userStore = useUserStore();
  const { $i18n } = useNuxtApp();
  const t = $i18n.t;
  const toast = useToast();

  if (!permission) return;

  if (!userStore.hasPermission(permission)) {
    toast.add({
      title: t("page.error.permission"),
      color: "error",
      icon: "i-lucide-error",
    });
    return abortNavigation({
      message: t("page.error.permission", { permission }),
    });
  }
});
