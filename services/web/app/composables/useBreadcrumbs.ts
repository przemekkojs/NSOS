import type { BreadcrumbItem } from "@nuxt/ui";

export const useBreadcrumbs = () => {
  const route = useRouter().currentRoute;
  const { t } = useI18n();

  // Example: Generate breadcrumbs based on route
  const breadcrumbs = computed<BreadcrumbItem[]>(() => {
    const pathArray = route.value.path.split("/").filter(Boolean);
    return pathArray.map((segment, index) => {
      const routeSegment = `/${pathArray.slice(0, index + 1).join("/")}`;
      return {
        label: isNaN(parseFloat(segment))
          ? t(`breadcrumb.${segment}`)
          : segment,
        to: routeSegment,
      };
    });
  });

  return {
    breadcrumbs,
  };
};
