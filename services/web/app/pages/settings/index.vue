<script setup lang="ts">
import type { TabsItem } from "@nuxt/ui";
import A11yForm from "~/components/forms/A11yForm.vue";

const { t } = useI18n();

const items = computed<TabsItem[]>(() => [
  {
    label: t("tabs.account"),
    description: "",
    icon: "i-lucide-user",
    slot: "account" as const,
  },
  {
    label: t("tabs.accessibility"),
    description: "...",
    icon: "i-lucide-person-standing",
    slot: "accessibility" as const,
  },
]);
</script>
<template>
  <UTabs :items variant="link" :ui="{ trigger: 'grow' }" class="gap-4 w-full">
    <template #accessibility>
      <A11yForm />
    </template>
  </UTabs>
</template>
