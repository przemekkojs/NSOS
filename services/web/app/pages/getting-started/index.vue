<script setup lang="ts">
import type { StepperItem } from "@nuxt/ui";

// Getting started page with progress
// requirements: user registered and first time navigation, some flag should be stored on server side
// steps:
//

const { t } = useI18n();
// multistep form
const items = computed<StepperItem[]>(() => [
  {
    // username, fullname, timezone
    title: t("user info"),
    description: t("user info"),
    icon: "i-lucide-user",
  },
  {
    // connect your calendar e.g. google calendar
    title: t("abc"),
    icon: "i-lucide-calendar",
  },
  {
    // set availability
    title: t("abc"),
    icon: "i-lucide-calendar-check",
  },
  {
    // add profile photo, + other? things
    title: t("other stuff"),
    icon: "i-lucide-circle-user",
  },
]);

definePageMeta({
  layout: "auth",
});
</script>
<template>
  <UForm class="max-w-2xl m-auto border rounded-sm border-slate-700 p-16">
    <UStepper :items color="neutral" />
  </UForm>
</template>
