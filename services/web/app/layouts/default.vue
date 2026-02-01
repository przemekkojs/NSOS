<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";
import ChatSlideover from "~/components/ChatSlideover.vue";
import TeamsMenu from "~/components/TeamsMenu.vue";
import UserMenu from "~/components/UserMenu.vue";
import LocaleSelect from "~/components/ui/LocaleSelect.vue";
import NotificationsSlideover from "~/components/NotificationsSlideover.vue";
import { useStorage } from "@vueuse/core";

const toast = useToast();
const { t } = useI18n();
const { unreadCount } = useNotifications();

const {
  isDashboardSidebarCollapsed,
  isNotificationsSlideoverOpen,
  isShortcutsHelpOpen,
} = useDashboard();
const { hasPermission } = useUserStore();
const { isEnabled } = useFeatureFlagsStore();
const route = useLocaleRoute();

const links = computed<NavigationMenuItem[][]>(() => [
  [
    hasPermission("teaching.view_schedule") && {
      label: t("navigation.dashboard"),
      icon: "i-lucide-layout-dashboard",
      to: route({ name: "index" }).path,
      kbds: ["g", "d"],
    },
    hasPermission("teaching.view_schedule") && {
      label: t("navigation.schedule"),
      icon: "i-lucide-calendar",
      to: route({ name: "harmonogram" }).path,
      kbds: ["g", "h"],
    },
    hasPermission("users.view_user") && {
      label: t("navigation.users"),
      icon: "i-lucide-users",
      to: route({ name: "employees" }).path,
      kbds: ["g", "e"],
      "data-tour-step": "invite-employee-1",
      children: [
        hasPermission("university.view_position") &&
          ({
            label: t("navigation.positions"),
            to: route({ name: "positions" }),
          } satisfies NavigationMenuItem),
      ].filter(truthy),
    },
    hasPermission("university.view_university") &&
      ({
        label: t("navigation.universities"),
        icon: "i-lucide-building-2",
        to: route({ name: "universities" }).path,
        kbds: ["g", "i"],
        children: [
          hasPermission("university.view_semester") && {
            label: t("navigation.semesters"),
            to: route({ name: "semesters" }),
          },
        ].filter(truthy),
      } satisfies NavigationMenuItem),
    hasPermission("university.view_faculty") && {
      label: t("navigation.faculties"),
      icon: "i-lucide-building",
      to: route({ name: "faculties" }).path,
      kbds: ["g", "f"],
    },
    hasPermission("teaching.view_course") && {
      label: t("navigation.courses"),
      icon: "i-lucide-book-open",
      to: route({ name: "courses" }).path,
      kbds: ["g", "c"],
      children: [
        hasPermission("teaching.view_coursegroup") && {
          label: t("navigation.courseGroups"),
          to: route({ name: "course-groups" }).path,
        },
      ].filter(truthy),
    },
    isEnabled("notifications") &&
      // @ts-expect-error the permission doesn't exist yet but it's fine
      hasPermission("inbox.view_notifications") && {
        label: t("navigation.inbox"),
        icon: "i-lucide-inbox",
        to: route({ name: "inbox" }).path,
        kbds: ["g", "n"],
        // badge: unreadCount.value > 0 ? unreadCount.value.toString() : undefined,
      },
    {
      label: t("navigation.settings"),
      to: route({ name: "settings" }).path,
      icon: "i-lucide-settings",
      kbds: ["g", "s"],
    },
  ].filter(truthy),
  [
    {
      label: t("navigation.help"),
      icon: "i-lucide-info",
      to: route({
        name: "help-slug",
        params: {
          slug: [""],
        },
      }).path,
      target: "_blank",
    },
    {
      label: t("navigation.shortcuts"),
      icon: "i-lucide-command",
      type: "trigger" as const,
      class: "cursor-pointer",
      onSelect: () => {
        isShortcutsHelpOpen.value = !isShortcutsHelpOpen.value;
      },
    },
  ],
]);

const groups = computed(() => [
  {
    id: "links",
    label: t("navigation.goTo"),
    items: links.value.flat(),
  },
  {
    id: "code",
    label: t("navigation.code"),
    items: [
      {
        id: "source",
        label: t("navigation.sourceCode"),
        icon: "i-lucide-github",
        to: `https://github.com/przemekkojs/NSOS`,
        target: "_blank",
      },
    ],
  },
]);

const cookie = useStorage("cookie-consent", "pending");
onMounted(() => {
  if (cookie.value === "accepted") return;

  toast.add({
    title: t("feature.cookieConsent.message"),
    duration: 0,
    close: false,
    actions: [
      {
        label: t("feature.cookieConsent.accept"),
        color: "neutral",
        variant: "outline",
        onClick: () => {
          cookie.value = "accepted";
        },
      },
      {
        label: t("feature.cookieConsent.optOut"),
        color: "neutral",
        variant: "ghost",
      },
    ],
  });
});
</script>
<template>
  <ClientOnly>
    <UDashboardGroup unit="rem" storage="local">
      <UDashboardSidebar
        id="default"
        v-model:collapsed="isDashboardSidebarCollapsed"
        collapsible
        resizable
        class="bg-elevated/25"
        :ui="{ footer: 'lg:border-t lg:border-default' }"
      >
        <template #header="{ collapsed }">
          <TeamsMenu :collapsed="collapsed" />
        </template>

        <template #default="{ collapsed }">
          <UDashboardSearchButton
            :collapsed="collapsed"
            class="bg-transparent ring-default"
          />

          <UNavigationMenu
            :collapsed="collapsed"
            :items="links[0]"
            orientation="vertical"
            tooltip
            popover
          />

          <UNavigationMenu
            :collapsed="collapsed"
            :items="links[1]"
            orientation="vertical"
            tooltip
            class="mt-auto"
          />

          <ShortcutsHelp />
        </template>

        <template #footer="{ collapsed }">
          <UserMenu :collapsed="collapsed" />
        </template>
      </UDashboardSidebar>

      <UDashboardSearch :groups="groups" />

      <UDashboardPanel>
        <template #header>
          <UDashboardNavbar :ui="{ right: 'gap-3' }">
            <template #leading>
              <UDashboardSidebarCollapse />
            </template>

            <template #right>
              <ChatSlideover />
              <UTooltip
                v-if="isEnabled('notifications')"
                :text="$t('feature.notifications.tooltip')"
                :shortcuts="['N']"
              >
                <UButton
                  color="neutral"
                  variant="ghost"
                  square
                  @click="
                    isNotificationsSlideoverOpen = !isNotificationsSlideoverOpen
                  "
                >
                  <UChip :show="unreadCount > 0" color="error" inset>
                    <UIcon name="i-lucide-bell" class="size-5 shrink-0" />
                  </UChip>
                </UButton>
              </UTooltip>
              <UColorModeButton />
              <LocaleSelect />
            </template>
          </UDashboardNavbar>
        </template>

        <template #body>
          <RouterView />
        </template>
      </UDashboardPanel>
      <NotificationsSlideover />
    </UDashboardGroup>
  </ClientOnly>
</template>
