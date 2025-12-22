<script setup lang="ts">
import type { StepperItem } from "@nuxt/ui";

defineEmits<{
  (e: "submit"): void;
}>();

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
    slot: "user-info" as const,
  },
  {
    // connect your calendar e.g. google calendar
    title: t("abc"),
    icon: "i-lucide-calendar",
    slot: "calendar" as const,
  },
  {
    // set availability
    title: t("abc"),
    icon: "i-lucide-calendar-check",
    slot: "availability" as const,
  },
  {
    // add profile photo, + other? things
    title: t("other stuff"),
    icon: "i-lucide-circle-user",
    slot: "other" as const,
  },
]);

const stepper = useTemplateRef("stepper");
</script>
<template>
  <UForm
    class="max-w-2xl m-auto border rounded-sm border-slate-700 p-8"
    @submit="$emit('submit')"
  >
    <UStepper ref="stepper" :items color="neutral">
      <template #user-info>
        <UForm nested name="parent.child">
          <UFormField name="first-name" :label="$t('form.label.firstName')">
            <UInput />
          </UFormField>
          <UFormField name="last-name" :label="$t('form.label.lastName')">
            <UInput />
          </UFormField>
        </UForm>
      </template>
      <template #calendar>
        <p>CALENDAR</p>
        <UForm nested name="parent.child">
          <UFormField name="">
            <UInput />
          </UFormField>
        </UForm>
      </template>
      <template #availability>
        <p>Availability</p>
      </template>
      <template #other>
        <p>Other stuff</p>
      </template>
    </UStepper>

    <div class="flex gap-2 justify-between mt-4">
      <UButton
        leading-icon="i-lucide-arrow-left"
        :disabled="!stepper?.hasPrev"
        @click="stepper?.prev()"
      >
        Prev
      </UButton>

      <UButton
        trailing-icon="i-lucide-arrow-right"
        :disabled="!stepper?.hasNext"
        @click="stepper?.next()"
      >
        Next
      </UButton>
    </div>
  </UForm>
</template>

<style>
form {
  margin-top: var(--ui-header-height);
}
</style>
