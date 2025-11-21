<script setup lang="ts">
const { isShortcutsHelpOpen } = useDashboard();

const { hasPermission } = useUserStore()

const items = computed(() => [
  {
    kbds: ["g", "d"],
    label: "Go to dashboard",
  },
  {
    kbds: ["g", "i"],
    label: "Go to inbox",
  },
  {
    kbds: ["g", "h"],
    label: "go to harmonogram",
  },
  hasPermission('users.view_user') && {
    kbds: ["g", "e"],
    label: "Go to employees",
  },
  {
    kbds: ["g", "i"],
    label: "Go to inbox",
  },
  hasPermission('university.view_faculty') && {
    kbds: ["g", "f"],
    label: "Go to faculties",
  },
  hasPermission('teaching.view_course') && {
    kbds: ["g", "c"],
    label: "Go to courses",
  },
  {
    kbds: ["g", "s"],
    label: "Go to settings",
  },
  {
    kbds: ["g", "p"],
    label: "Go to profile",
  },
  {
    kbds: ["?"],
    label: "Show this dialog - shortcuts help",
  },
  {
    kbds: ["c"],
    label: "Quick create (scoped)",
  },
  {
    kbds: ["n"],
    label: "toggle notifications sidebar",
  },
  {
    kbds: ["s"],
    label: "toggle dashboard sidebar",
  },
  {
    kbds: ["/"],
    label: "Focus search (scoped) TODO: implement",
  },
  hasPermission('users.add_user') && {
    kbds: ["c", "e"],
    label: "Create employee",
  },
].filter(truthy))
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
