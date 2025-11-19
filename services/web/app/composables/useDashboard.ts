import { ref, watch } from "vue";
import { useRoute, useRouter } from "@typed-router";
import { createSharedComposable } from "@vueuse/core";

export const shortcuts = [
  "g-d",
  "g-i",
  "g-h",
  "g-e",
  "g-f",
  "g-c",
  "g-s",
  "?",
  "g-p",
  "c",
  "n",
  "s",
  "a",
  "/",
  "c-e",
] as const;
export type Shortcut = (typeof shortcuts)[number];

const _useDashboard = () => {
  const route = useRoute();
  const router = useRouter();
  const { isEnabled } = useFeatureFlags();

  const [isNotificationsSlideoverOpen, toggleNotifications] = useToggle(false);
  const [isDashboardSidebarCollapsed, toggleSidebar] = useToggle(false);
  const [isShortcutsHelpOpen, toggleShortcutsHelp] = useToggle(false);
  const [isAIChatOpen, toggleAIChat] = useToggle(false);

  function openQuickCreate() {}
  function focusSearch() {}

  defineShortcuts({
    "g-d": () => router.push("/"),
    "g-i": () => router.push("/inbox"),
    "g-h": () => router.push("/harmonogram"),
    "g-e": () => router.push("/employees"),
    "g-f": () => router.push("/faculties"),
    "g-c": () => router.push("/courses"),
    "g-s": () => router.push("/settings"),
    // "?": () => router.push("/help"),
    "?": () => toggleShortcutsHelp(),
    "g-p": () => router.push("/profile"),

    c: () => openQuickCreate(), // context aware quick create
    n: () => toggleNotifications(),
    s: () => toggleSidebar(),
    a: () => toggleAIChat(),
    "/": () => focusSearch(),

    "c-e": () => router.push("/employees/create"),
  } satisfies Record<Shortcut, unknown>);

  watch(
    () => route.fullPath,
    () => {
      isNotificationsSlideoverOpen.value = false;
    }
  );

  return {
    isNotificationsSlideoverOpen,
    isDashboardSidebarCollapsed,
    isShortcutsHelpOpen,
    isAIChatOpen,
  };
};

export const useDashboard = createSharedComposable(_useDashboard);
