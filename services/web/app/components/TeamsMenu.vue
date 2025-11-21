<script setup lang="ts">
import type { DropdownMenuItem } from "@nuxt/ui";

defineProps<{
  collapsed?: boolean;
}>();

const teams = ref([
  {
    label: "Vue",
    avatar: {
      src: "https://github.com/vuejs.png",
      alt: "Vue",
    },
  },
  {
    label: "Vite",
    avatar: {
      src: "https://github.com/vitejs.png",
      alt: "Vite",
    },
  },
  {
    label: "Vitest",
    avatar: {
      src: "https://github.com/vitest-dev.png",
      alt: "Vitest",
    },
  },
]);
const selectedTeam = ref(teams.value[0]);
const { t } = useI18n();

const items = computed<DropdownMenuItem[][]>(() => {
  return [
    teams.value.map((team) => ({
      ...team,
      onSelect() {
        selectedTeam.value = team;
      },
    })),
    [
      {
        label: t("page.institution.create.title"),
        icon: "i-lucide-circle-plus",
        to: "/institutions/create",
      },
    ],
  ];
});
</script>
<template>
  <UDropdownMenu
    :items="items"
    :content="{ align: 'center', collisionPadding: 12 }"
    :ui="{
      content: collapsed ? 'w-40' : 'w-(--reka-dropdown-menu-trigger-width)',
    }"
  >
    <UButton
      v-bind="{
        ...selectedTeam,
        label: collapsed ? undefined : selectedTeam?.label,
        trailingIcon: collapsed ? undefined : 'i-lucide-chevrons-up-down',
      }"
      color="neutral"
      variant="ghost"
      block
      :square="collapsed"
      class="data-[state=open]:bg-elevated"
      :class="[!collapsed && 'py-2']"
      :ui="{
        trailingIcon: 'text-dimmed',
      }"
    />
  </UDropdownMenu>
</template>
