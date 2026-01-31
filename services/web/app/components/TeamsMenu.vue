<script setup lang="ts">
import type { DropdownMenuItem } from "@nuxt/ui";

defineProps<{
  collapsed?: boolean;
}>();

const { data: universities } = useUniversities();

const selectedUni = ref(universities.value?.results[0]);
const { t } = useI18n();
const route = useLocaleRoute();
const { hasPermission } = useUserStore();

const items = computed<DropdownMenuItem[][]>(() => {
  const additionalItems = [
    hasPermission("university.add_university") && {
      label: t("page.university.create.title"),
      icon: "i-lucide-circle-plus",
      to: route({ name: "universities-create" }).path,
    },
  ];

  if (!universities.value) {
    return [additionalItems];
  }

  return [
    universities.value.results.map((uni) => ({
      label: uni.name,
      ...uni,
      onSelect() {
        selectedUni.value = uni;
      },
    })),
    additionalItems.filter(truthy),
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
        ...selectedUni,
        label: collapsed ? undefined : selectedUni?.name,
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
