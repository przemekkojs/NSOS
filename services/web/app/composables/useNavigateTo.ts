import {
  navigateTo as _navigateTo,
  type RoutesNamesList,
  type TypedRouteLocationRawFromName,
} from "@typed-router";

export function useNavigateTo() {
  const locale = useNuxtApp().$i18n.locale;

  const localeRoute = useLocaleRoute();

  const navigateTo = <TR extends RoutesNamesList>(
    to: TypedRouteLocationRawFromName<TR, string>
  ) => {
    const route = localeRoute(to, locale.value);
    return _navigateTo(route.path);
  };

  return navigateTo;
}
