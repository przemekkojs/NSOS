<script setup lang="ts">
import type { DropdownMenuItem } from "@nuxt/ui";
import { useColorMode } from "@vueuse/core";
import { useLogout } from "../composables/api/useAuth";

import { useUserStore } from "~/stores/user";
defineProps<{
  collapsed?: boolean;
}>();

const colorMode = useColorMode();
const appConfig = useAppConfig();
const { mutateAsync: logout } = useLogout();
const navigateTo = useNavigateTo();
const { t } = useI18n();

const colors = [
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose",
];
const neutrals = ["slate", "gray", "zinc", "neutral", "stone"];

const { user } = useUserStore();
const route = useLocaleRoute();

const items = computed<DropdownMenuItem[][]>(() => [
  [
    {
      type: "label",
      label: user?.email || "Guest",
      avatar: undefined,
    },
  ],
  [
    {
      label: t("menu.profile"),
      icon: "i-lucide-user",
      to: route({ name: "profile" }).path,
    },
    {
      label: t("menu.settings"),
      icon: "i-lucide-settings",
      to: route({ name: "settings" }).path,
    },
  ],
  [
    {
      label: t("menu.theme"),
      icon: "i-lucide-palette",
      children: [
        {
          label: t("menu.primary"),
          slot: "chip",
          chip: appConfig.ui.colors.primary,
          content: {
            align: "center",
            collisionPadding: 16,
          },
          children: colors.map((color) => ({
            label: color,
            chip: color,
            slot: "chip",
            checked: appConfig.ui.colors.primary === color,
            type: "checkbox",
            onSelect: (e) => {
              e.preventDefault();

              appConfig.ui.colors.primary = color;
            },
          })),
        },
        {
          label: t("menu.neutral"),
          slot: "chip",
          chip:
            appConfig.ui.colors.neutral === "neutral"
              ? "old-neutral"
              : appConfig.ui.colors.neutral,
          content: {
            align: "end",
            collisionPadding: 16,
          },
          children: neutrals.map((color) => ({
            label: color,
            chip: color === "neutral" ? "old-neutral" : color,
            slot: "chip",
            type: "checkbox",
            checked: appConfig.ui.colors.neutral === color,
            onSelect: (e) => {
              e.preventDefault();

              appConfig.ui.colors.neutral = color;
            },
          })),
        },
      ],
    },
    {
      label: t("menu.appearance"),
      icon: "i-lucide-sun-moon",
      children: [
        {
          label: t("menu.light"),
          icon: "i-lucide-sun",
          type: "checkbox",
          checked: colorMode.value === "light",
          onSelect(e: Event) {
            e.preventDefault();

            colorMode.value = "light";
          },
        },
        {
          label: t("menu.dark"),
          icon: "i-lucide-moon",
          type: "checkbox",
          checked: colorMode.value === "dark",
          onSelect(e: Event) {
            e.preventDefault();

            colorMode.value = "dark";
          },
        },
      ],
    },
  ],
  [
    {
      label: t("menu.documentation"),
      icon: "i-lucide-book-open",
      to: route({
        name: "help-slug",
        params: {
          slug: [""],
        },
      }),
    },
    {
      label: t("menu.githubRepository"),
      icon: "i-lucide-github",
      to: "https://github.com/przemekkojs/NSOS",
      target: "_blank",
    },
  ],
  [
    {
      label: t("menu.logout"),
      icon: "i-lucide-log-out",
      async onSelect() {
        await logout();
        await navigateTo({
          name: "login",
        });
      },
    },
  ],
]);
</script>
<!-- TODO: add avatar -->

<template>
  <UDropdownMenu
    :items="items"
    :content="{ align: 'center', collisionPadding: 12 }"
    :ui="{
      content: collapsed ? 'w-48' : 'w-(--reka-dropdown-menu-trigger-width)',
    }"
  >
    <UButton
      data-testid="user-menu"
      v-bind="{
        label: collapsed ? undefined : user?.email,
        trailingIcon: collapsed ? undefined : 'i-lucide-chevrons-up-down',
      }"
      :avatar="{
        alt: $t('user.avatar'),
        text: (user?.first_name ?? '') + (user?.last_name ?? ''),
      }"
      color="neutral"
      variant="ghost"
      block
      :square="collapsed"
      class="data-[state=open]:bg-elevated"
      :ui="{
        trailingIcon: 'text-dimmed',
      }"
    />

    <template #chip-leading="{ item }">
      <div class="inline-flex items-center justify-center shrink-0 size-5">
        <span
          class="rounded-full ring ring-bg bg-(--chip-light) dark:bg-(--chip-dark) size-2"
          :style="{
            '--chip-light': `var(--color-${(item as any).chip}-500)`,
            '--chip-dark': `var(--color-${(item as any).chip}-400)`,
          }"
        />
      </div>
    </template>
  </UDropdownMenu>
</template>
