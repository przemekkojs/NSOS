<script setup lang="ts">
import type { TabsItem } from "@nuxt/ui";
import { useRoute } from "@typed-router";

const { t } = useI18n();
const router = useRoute("employees-id");

const id = Number(router.params.id);
const { data } = useUser(id);

const tabs = computed<TabsItem[]>(() => [
  {
    label: t("tabs.user"),
    description: "",
    icon: "i-lucide-user",
    slot: "user",
  },
  {
    label: t("tabs.permissions"),
    description: "",
    icon: "i-lucide-user-lock",
    slot: "permissions",
  },
]);

definePageMeta({
  // TODO: always allow viewing self
  permission: "users.view_user",
});
</script>
<template>
  <UTabs
    :items="tabs"
    variant="link"
    :ui="{ trigger: 'grow' }"
    class="gap-4 w-full"
  >
    <template #permissions/>
  </UTabs>
  <pre>{{ data }}</pre>
</template>
