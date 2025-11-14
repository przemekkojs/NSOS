<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";
import ChatSlideover from "~/components/ChatSlideover.vue";
import TeamsMenu from "~/components/TeamsMenu.vue";
import UserMenu from "~/components/UserMenu.vue";
import LocaleSelect from "~/components/ui/LocaleSelect.vue";
import NotificationsSlideover from "~/components/NotificationsSlideover.vue";
import { useStorage } from "@vueuse/core";
import { useNotifications } from "~/features/notifications/useNotifications";

const toast = useToast();
const { t } = useI18n();
const { unreadCount } = useNotifications();

const links = computed<NavigationMenuItem[][]>(() => [
  [
    { awesome: "something" },
    {
      label: t("navigation.dashboard"),
      icon: "i-lucide-layout-dashboard",
      to: "/",
    },
    {
      label: t("navigation.schedule"),
      icon: "i-lucide-calendar",
      to: "/harmonogram",
    },
    {
      label: t("navigation.employees"),
      icon: "i-lucide-users",
      to: "/employees",
    },
    {
      label: t("navigation.institutions"),
      icon: "i-lucide-building-2",
      to: "/institutions",
    },
    {
      label: t("navigation.courses"),
      icon: "i-lucide-book-open",
      to: "/courses",
    },
    {
      label: t("navigation.inbox"),
      icon: "i-lucide-inbox",
      to: "/inbox",
      badge: unreadCount.value > 0 ? unreadCount.value.toString() : undefined,
    },
    {
      label: t("navigation.settings"),
      to: "/settings",
      icon: "i-lucide-settings",
    },
  ],
  [
    {
      label: t("navigation.feedback"),
      icon: "i-lucide-message-circle",
      to: "/feedback",
      target: "_blank",
    },
    {
      label: t("navigation.help"),
      icon: "i-lucide-info",
      to: "http://localhost:5174/",
      target: "_blank",
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
        icon: "simple-icons:github",
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
        // @ts-expect-error manually add data-testid
        "data-testid": "accept-cookies-button",
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
                :text="$t('feature.notifications.tooltip')"
                :shortcuts="['N']"
              >
                <UButton color="neutral" variant="ghost" square>
                  <UChip color="error" inset>
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
