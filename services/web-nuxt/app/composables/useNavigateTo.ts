import {
  navigateTo as _navigateTo,
  type RoutesNamesList,
  type TypedRouteLocationRawFromName,
} from "@typed-router";

export function useNavigateTo() {
  const { locale } = useI18n();

  const localeRoute = useLocaleRoute();

  const navigateTo = async <TR extends RoutesNamesList>(
    to: TypedRouteLocationRawFromName<TR, string>
  ) => {
    const route = localeRoute(to, locale.value);
    await _navigateTo(route.fullPath);
  };

  return navigateTo;
}
