<script setup lang="ts">
const { isShortcutsHelpOpen } = useDashboard();

const { hasPermission } = useUserStore();
const { isEnabled } = useFeatureFlagsStore();
const { t } = useI18n();

const items = computed(() =>
  [
    {
      kbds: ["g", "d"],
      label: t("feature.shortcuts.goToDashboard"),
    },
    {
      kbds: ["g", "h"],
      label: t("feature.shortcuts.goToHarmonogram"),
    },
    hasPermission("users.view_user") && {
      kbds: ["g", "e"],
      label: t("feature.shortcuts.goToUsers"),
    },
    isEnabled("notifications") && {
      kbds: ["g", "i"],
      label: t("feature.shortcuts.goToInbox"),
    },
    hasPermission("university.view_faculty") && {
      kbds: ["g", "f"],
      label: t("feature.shortcuts.goToFaculties"),
    },
    hasPermission("teaching.view_course") && {
      kbds: ["g", "c"],
      label: t("feature.shortcuts.goToCourses"),
    },
    {
      kbds: ["g", "s"],
      label: t("feature.shortcuts.goToSettings"),
    },
    {
      kbds: ["g", "p"],
      label: t("feature.shortcuts.goToProfile"),
    },
    {
      kbds: ["?"],
      label: t("feature.shortcuts.showThisDialog"),
    },
    {
      kbds: ["c"],
      label: t("feature.shortcuts.quickCreate"),
    },
    isEnabled("notifications") && {
      kbds: ["n"],
      label: t("feature.shortcuts.toggleNotificationsSlideover"),
    },
    {
      kbds: ["s"],
      label: t("feature.shortcuts.toggleDashboardSidebar"),
    },
    isEnabled("aiChat") && {
      kbds: ["a"],
      label: t("feature.shortcuts.toggleAIChat"),
    },
    {
      kbds: ["/"],
      label: t("feature.shortcuts.focusSearch"),
    },
    hasPermission("users.add_user") && {
      kbds: ["c", "e"],
      label: t("feature.shortcuts.createEmployee"),
    },
  ].filter(truthy)
);
</script>
<template>
  <UModal v-model:open="isShortcutsHelpOpen">
    <template #content>
      <ul class="p-6 gap-4 flex flex-col">
        <li v-for="item in items" :key="item.label" class="inline-flex gap-4">
          <!-- TODO: nuxt link each so its clickable i18n + permissions -->
          <div class="inline-flex gap-1">
            <UKbd v-for="(kbd, i) in item.kbds" :key="i">{{ kbd }}</UKbd>
          </div>

          <p>{{ item.label }}</p>
        </li>
      </ul>
    </template>
  </UModal>
</template>
