<script setup lang="ts">
import type * as z from "zod";
import { CourseCreateSchema } from "~/lib/api/schemas";
import type { FieldOverrides } from "./Form.vue";

defineEmits<{
  (e: "submit", data: z.infer<typeof CourseCreateSchema>): void;
}>();

const fieldOverrides: FieldOverrides<typeof CourseCreateSchema> = {
  weeks_count: {
    type: "number",
  },
  faculty: {
    type: "number",
  },
  course_group: {
    required: false,
  },
};
</script>
<template>
  <Form
    :schema="CourseCreateSchema"
    :field-overrides
    :button-label="$t('button.create')"
    @submit="$emit('submit', $event)"
  />
</template>
