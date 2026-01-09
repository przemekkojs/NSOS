<script setup lang="ts">
import { FacultyCreateSchema, type FacultyCreate } from "~/lib/api/schemas";

defineEmits<{
  (e: "submit", data: FacultyCreate): void;
}>();
</script>
<template>
  <UForm
    :schema="FacultyCreateSchema"
    :button-label="$t('button.create')"
    @submit="$emit('submit', $event)"
  />
</template>
